import { Types } from 'mongoose';

export class CreateGameDto {
  players: Types.ObjectId[];
}
