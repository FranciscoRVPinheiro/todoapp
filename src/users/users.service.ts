import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await new this.userModel(createUserDto).save();
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).select('-__v');
  }

  async findAll() {
    return await this.userModel.find().select('-password -__v');
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).select('-password -__v');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
