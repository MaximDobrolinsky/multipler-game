import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '../../../@core/base/base.service';
import { UserRole } from './user.enum';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async getBots(): Promise<UserDocument[]> {
    const GAME_LIMIT_BOTS = 4;

    return this.userModel
      .find({
        role: UserRole.BOT,
      })
      .limit(GAME_LIMIT_BOTS)
      .exec();
  }

  async findByUsername(name: string): Promise<UserDocument> {
    return this.userModel.findOne({ name });
  }

  async clearCollection(): Promise<any> {
    return this.userModel.deleteMany().exec();
  }
}
