import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from 'src/schemas/todo.schema';
import { Model } from 'mongoose';
@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto, req: any): Promise<Todo> {
    createTodoDto.userId = req.user.sub;
    return await new this.todoModel(createTodoDto).save();
  }

  async findAll(req: any): Promise<Todo[]> {
    return await this.todoModel.find({ userId: req.user.sub }).select('-__v');
  }

  async findOne(id: string, req: any) {
    try {
      const todo = await this.todoModel.findById(id).select('-__v');

      if (!todo) {
        throw new NotFoundException();
      }

      if (todo.userId !== req.user.sub) {
        throw new NotFoundException('This id does not exist.');
      }

      return todo;
    } catch {
      throw new NotFoundException('This id does not exist.');
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, req: any) {
    try {
      const findId = await this.todoModel.findById(id).select('-__v');

      if (findId.userId !== req.user.sub) {
        throw new NotFoundException('This id does not exist.');
      }

      const todo = await this.todoModel
        .findByIdAndUpdate(id, updateTodoDto, {
          new: true,
        })
        .select('-__v');

      if (!todo) {
        throw new NotFoundException('This id does not exist.');
      }

      return todo;
    } catch {
      throw new NotFoundException('This id does not exist.');
    }
  }

  async remove(id: string, req: any) {
    try {
      const findId = await this.todoModel.findById(id).select('-__v');

      if (findId.userId !== req.user.sub) {
        throw new NotFoundException('This id does not exist.');
      }
      const todo = await this.todoModel.deleteOne({ _id: id });

      if (todo.deletedCount === 0) {
        throw new NotFoundException('This id does not exist.');
      }
      return todo;
    } catch (err) {
      throw new NotFoundException('This id does not exist.');
    }
  }
}
