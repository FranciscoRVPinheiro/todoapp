import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guards';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiTags('Auth')
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiTags('Auth')
  @Post('/login')
  login(@Body() loginUserDto: CreateUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiTags('Users')
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    return await req.user;
  }

  @ApiTags('Users')
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    return this.usersService.findAll(req);
  }

  @ApiTags('Users')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: Request,
  ) {
    return this.usersService.update(id, updateUserDto, req);
  }

  @ApiTags('Users')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request) {
    return this.usersService.remove(id, req);
  }
}
