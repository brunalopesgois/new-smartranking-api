import { ICategory, IPlayer } from '@smartranking-challenge/challenge-sdk';
import { Document } from 'mongoose';

export class Category extends Document implements ICategory {
  readonly _id: string;

  readonly category: string;

  description: string;

  players: IPlayer[];

  constructor(category: Partial<Category>) {
    super(category);
  }
}
