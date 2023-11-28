import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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

  async findAll(req: any) {
    const user = await this.userModel
      .findOne({ _id: req.user.sub })
      .select('-__v');

    if (!user) {
      throw new NotFoundException();
    }

    console.log(user);

    if (user.role !== 'admin') {
      throw new UnauthorizedException();
    }

    return await this.userModel.find().select('-password -__v');
  }

  async update(id: string, updateUserDto: UpdateUserDto, req: any) {
    if (id !== req.user.sub) {
      throw new UnauthorizedException();
    }

    if (updateUserDto.password) {
      throw new BadRequestException('You can only update email.');
    }
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .select('-__v');
  }

  async remove(id: string, req: any) {
    if (id !== req.user.sub) {
      throw new UnauthorizedException();
    }
    return await this.userModel.deleteOne({ _id: id });
  }
}
