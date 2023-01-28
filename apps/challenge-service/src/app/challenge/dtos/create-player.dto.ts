import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
