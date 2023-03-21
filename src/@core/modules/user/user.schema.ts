import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './user.enum';

export type UserDocument = User & Document;

const DEFAULT_USER_SCORES = 1000;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ default: DEFAULT_USER_SCORES })
  scores: number;

  @Prop({ enum: UserRole })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
