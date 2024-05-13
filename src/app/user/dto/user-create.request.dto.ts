import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateRequestDto {
  @IsEmail({},{ message: 'Please enter a valid email format.' })
  @IsNotEmpty({ message: 'Please enter your email.' })
  email: string;

  @IsNotEmpty({ message: 'Please enter your name.' })
  name: string;

  @MinLength(8, { message: 'Please make the password at least 8 characters long.' })
  @IsNotEmpty({ message: 'Please enter your password.' })
  password: string;
}