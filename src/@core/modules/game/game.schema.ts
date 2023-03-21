import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../user';
import { RoundResultStatus } from './game.enum';

export type GameDocument = Game & Document;

export class RoundResult {
  playerId: mongoose.Types.ObjectId;
  multipler: number;
  status: RoundResultStatus;
  points: number;
}

export class Round {
  multipler: number;
  roundNumber: number;
  results: RoundResult[];
}

@Schema({ timestamps: true })
export class Game {
  @Prop({ type: Round, default: [] })
  rounds: Round[];

  @Prop({ type: [{ type: mongoose.Schema.Types.Mixed, ref: User.name }] })
  players: UserDocument[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
