import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { BaseService } from '../../../@core/base/base.service';
import { Game, GameDocument } from './game.schema';

@Injectable()
export class GameService extends BaseService<GameDocument> {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    super(gameModel);
  }

  async getById(id: Types.ObjectId): Promise<GameDocument> {
    return this.gameModel
      .findById(id)
      .populate(['players', 'rounds.results.player'])
      .exec();
  }
}
