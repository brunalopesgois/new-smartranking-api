import { IsEmail, IsPhoneNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsPhoneNumber('BR')
  readonly phone?: string;

  @IsEmail()
  readonly email?: string;

  readonly name?: string;
}
