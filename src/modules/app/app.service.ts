import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientSession, Connection, Types } from 'mongoose';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { InjectConnection } from '@nestjs/mongoose';

import { generateRandomMultipler } from '../../@shared/helpers';
import {
  CreateGameDto,
  GameDocument,
  GameService,
  Round,
  RoundResult,
  RoundResultStatus,
} from '../../@core/modules/game';
import { UserDocument, UserRole, UserService } from '../../@core/modules/user';
import { MessageDocument, MessageService } from '../../@core/modules/message';
import { Transaction } from '../../@core/decorators';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly gameService: GameService,
    private readonly messageService: MessageService,
  ) {}

  async login(name: string): Promise<UserDocument> {
    const user = await this.userService.findByUsername(name);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.USER) {
      throw new NotFoundException('Bot can`t login');
    }

    return user;
  }

  async startGame(loggedUserId: Types.ObjectId): Promise<GameDocument> {
    const bots = await this.userService.getBots();
    const botsId = bots.map((bot) => bot._id);

    const game = await this.gameService.create<CreateGameDto>({
      players: [loggedUserId, ...botsId],
    });

    return game;
  }

  @Transaction()
  async processGameRound(
    gameId: Types.ObjectId,
    points: number,
    userMultipler: number,
    ...args
  ): Promise<any> {
    const transactionSession = _.last(args);

    const game = await this.gameService.getById(gameId);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const players = game.players;

    await this.checkIfUsersHasScoreForGame(players, points);

    const roundNumber = game.rounds.length + 1;
    const roundMultipler = generateRandomMultipler(0, 10, 2);

    const roundResults: RoundResult[] = await this.calculateRoundResults(
      players,
      userMultipler,
      roundMultipler,
      points,
    );

    const round: Round = {
      roundNumber,
      multipler: roundMultipler,
      results: roundResults,
    };

    await this.gameService.update(
      gameId,
      {
        $push: {
          rounds: round,
        },
      },
      transactionSession,
    );

    await this.updateUsersScore(roundResults, transactionSession);

    return this.gameService.getById(gameId, transactionSession);
  }

  async getAllGameMessages(gameId: Types.ObjectId): Promise<MessageDocument[]> {
    return this.messageService.getAllByGameId(gameId);
  }

  private async calculateRoundResults(
    players: UserDocument[],
    userMultipler: number,
    roundMultipler: number,
    points: number,
  ): Promise<RoundResult[]> {
    return Bluebird.map(players, async (player) => {
      const multipler =
        player.role === UserRole.USER
          ? userMultipler
          : generateRandomMultipler(0, 10, 2);

      const roundStatus =
        multipler <= roundMultipler
          ? RoundResultStatus.WON
          : RoundResultStatus.LOSS;

      const wonPoints =
        roundStatus === RoundResultStatus.WON ? multipler * points : 0;

      return {
        playerId: player._id,
        multipler,
        status: roundStatus,
        points: wonPoints,
      };
    });
  }

  private async updateUsersScore(
    roundResults: RoundResult[],
    transactionSession: ClientSession,
  ): Promise<void> {
    await Bluebird.map(roundResults, (result: RoundResult) => {
      return this.userService.update(
        result.playerId,
        {
          $inc: {
            scores: result.points,
          },
        },
        transactionSession,
      );
    });
  }

  private async checkIfUsersHasScoreForGame(
    players: UserDocument[],
    points: number,
  ): Promise<void> {
    await Bluebird.map(players, (player) => {
      if (player.scores < points) {
        throw new BadRequestException(
          `Player ${player.name} hasn't score for game`,
        );
      }
    });
  }
}
