import { IPlayer } from '@smartranking-admin/admin-sdk';
import { IResult } from './result.interface';

export interface IMatch {
  readonly _id: string;

  category: string;

  players: IPlayer[];

  def: IPlayer;

  result: IResult[];
}
