import { ICategory, IPlayer } from '@smartranking-admin/admin-sdk';
import { Document } from 'mongoose';
import { RankEvent } from './ranking-event.entity';

export class Category extends Document implements ICategory {
  readonly _id: string;

  readonly category: string;

  description: string;

  rankEvents: RankEvent[];

  players: IPlayer[];

  constructor(category: Partial<Category>) {
    super(category);
  }
}
