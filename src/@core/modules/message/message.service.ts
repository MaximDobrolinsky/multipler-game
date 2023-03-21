import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { BaseService } from '../../../@core/base/base.service';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService extends BaseService<MessageDocument> {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }

  async getById(id: Types.ObjectId): Promise<MessageDocument> {
    return this.messageModel.findById(id).populate(['player']).exec();
  }

  async getAllByGameId(gameId: Types.ObjectId): Promise<MessageDocument[]> {
    return this.messageModel.find({ game: gameId }).populate(['player']).exec();
  }
}
