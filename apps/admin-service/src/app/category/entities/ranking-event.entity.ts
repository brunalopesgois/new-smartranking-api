import { IRankEvent } from '@smartranking-admin/admin-sdk';
import { Document } from 'mongoose';

export class RankEvent extends Document implements IRankEvent {
  name: string;

  operation: string;

  value: number;

  constructor(rankEvent: Partial<RankEvent>) {
    super(rankEvent);
  }
}
