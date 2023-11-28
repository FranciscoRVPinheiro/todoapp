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
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto, req);
  }

  @Get()
  findAll(@Request() req) {
    return this.todosService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.todosService.findOne(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todosService.update(id, updateTodoDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.todosService.remove(id, req);
  }
}
