import { IPlayer } from './player.interface';
import { IRankEvent } from './rank-event.interface';

export interface ICategory {
  readonly _id: string;

  readonly category: string;

  description: string;

  rankEvents: IRankEvent[];

  players: IPlayer[];
}
