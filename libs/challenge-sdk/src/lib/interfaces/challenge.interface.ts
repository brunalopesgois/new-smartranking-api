import { IPlayer } from '@smartranking-admin/admin-sdk';
import { ChallengeStatus } from '../enums';
import { IMatch } from './match.interface';


export interface IChallenge {
  readonly _id: string;

  challengeDateTime: Date;

  status: ChallengeStatus;

  requestDateTime: Date;

  responseDateTime: Date;

  requester: IPlayer;

  category: string;

  players: IPlayer[];

  match: IMatch;
}
