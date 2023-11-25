import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ['not started', 'in progress', 'complete'] })
  status: 'not started' | 'in progress' | 'complete';
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
