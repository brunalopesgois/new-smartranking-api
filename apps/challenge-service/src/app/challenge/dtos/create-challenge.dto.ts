import { IPlayer } from '@smartranking-admin/admin-sdk';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDateTime: Date;

  @IsNotEmpty()
  requester: IPlayer;

  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: IPlayer[];
}
