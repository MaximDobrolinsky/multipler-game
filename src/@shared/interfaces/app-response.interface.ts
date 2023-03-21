import { ApiProperty } from '@nestjs/swagger';
import { RoundResultStatus } from '../../@core/modules/game';

class User {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  scores: number;
}

class RoundResult {
  @ApiProperty({ type: User })
  player: User;

  @ApiProperty()
  multipler: number;

  @ApiProperty({ enum: RoundResultStatus })
  status: RoundResultStatus;

  @ApiProperty()
  points: number;
}

class Round {
  @ApiProperty()
  multipler: number;

  @ApiProperty()
  roundNumber: number;

  @ApiProperty({ type: RoundResult, isArray: true })
  results: RoundResult[];
}

class Game {
  @ApiProperty()
  _id?: string;

  @ApiProperty({ type: User, isArray: true })
  players: User[];

  @ApiProperty({ type: Round, isArray: true })
  rounds: Round[];
}

export class LoginResponse {
  @ApiProperty({ type: User })
  loggedUser: User;

  @ApiProperty({ type: Game })
  game: Game;
}

export class StartGameRoundResponse extends Game {}

class Message {
  @ApiProperty()
  text: string;

  @ApiProperty({ type: User })
  player: User;

  @ApiProperty()
  game: string;
}

export class GetAllGameMessagesResponse extends Message {}
