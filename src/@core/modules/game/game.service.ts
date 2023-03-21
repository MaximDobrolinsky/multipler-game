import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { BaseService } from '../../../@core/base/base.service';
import { Game, GameDocument } from './game.schema';

@Injectable()
export class GameService extends BaseService<GameDocument> {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    super(gameModel);
  }

  async getById(
    id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<GameDocument> {
    return this.gameModel
      .findById(id, null, { session })
      .populate(['players', 'rounds.results.player'])
      .exec();
  }
}
