import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Todo } from './todo.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: string;

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Todo' }] })
  // todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
