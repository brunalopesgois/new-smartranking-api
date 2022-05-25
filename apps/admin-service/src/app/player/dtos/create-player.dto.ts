import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly phone: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}
