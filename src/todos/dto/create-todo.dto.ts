import { IsString, Length, IsIn, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @Length(1, 50)
  title: string;

  @Length(0, 200)
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsIn(['not started', 'in progress', 'complete'])
  status: 'not started' | 'in progress' | 'complete';
}
