import { Types } from 'mongoose';

export class CreateMessageDto {
  text: string;
  player: Types.ObjectId;
  game: Types.ObjectId;
}
