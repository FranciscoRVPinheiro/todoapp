import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Email already in use.');
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hash;

    const newUser = await this.usersService.create(createUserDto);

    return newUser;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const compareHash = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (compareHash === false) {
      throw new UnauthorizedException();
    }

    // jwt
    return {
      id: user.id,
      email: user.email,
      message: 'Logged in successfully',
    };
  }
}
