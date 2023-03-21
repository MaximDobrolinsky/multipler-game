import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Game, GameDocument } from '../game';
import { User, UserDocument } from '../user';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, ref: User.name })
  player: UserDocument | Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed, ref: Game.name })
  game: GameDocument | Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
