import { Document } from 'mongoose';
import { IPlayer } from '@smartranking-admin/admin-sdk';

export class Player extends Document implements IPlayer {
  readonly _id: string;

  phone: string;

  email: string;

  name: string;

  ranking: string;

  rankingPosition: number;

  playerPictureUrl: string;

  constructor(player: Partial<Player>) {
    super(player);
  }
}
