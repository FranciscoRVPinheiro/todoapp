import { IsString, Length, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @Length(4, 50)
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsString()
  password: string;
}
