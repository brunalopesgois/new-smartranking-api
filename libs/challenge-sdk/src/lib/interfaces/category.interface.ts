import { IPlayer } from './player.interface';

export interface ICategory {
  readonly _id: string;

  readonly category: string;

  description: string;

  players: IPlayer[];
}
