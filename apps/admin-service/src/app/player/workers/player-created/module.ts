import { Module } from '@nestjs/common';
import { WorkerPlayerCreated } from './worker';

@Module({
  imports: [],
  controllers: [WorkerPlayerCreated],
  providers: [],
})
export class WorkerPlayerCreatedModule {}
