import { IPlayer } from '@smartranking-challenge/challenge-sdk';
import { Document } from 'mongoose';

export class Player extends Document implements IPlayer {
  readonly _id: string;

  email: string;

  name: string;

  constructor(player: Partial<Player>) {
    super(player);
  }
}
