import { Document } from 'mongoose';
import { ChallengeStatus, IChallenge, IMatch } from '@smartranking-challenge/challenge-sdk';
import { IPlayer } from '@smartranking-admin/admin-sdk';

export class Challenge extends Document implements IChallenge {
  readonly _id: string;

  challengeDateTime: Date;

  status: ChallengeStatus;

  requestDateTime: Date;

  responseDateTime: Date;

  requester: IPlayer;

  category: string;

  players: IPlayer[];

  match: IMatch;

  constructor(challenge: Partial<Challenge>) {
    super(challenge);
  }
}
