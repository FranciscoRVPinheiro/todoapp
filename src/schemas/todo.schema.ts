import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ['not started', 'in progress', 'complete'] })
  status: 'not started' | 'in progress' | 'complete';

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
