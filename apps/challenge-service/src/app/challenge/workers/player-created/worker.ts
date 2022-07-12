import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class WorkerPlayerCreated {
  @EventPattern('player-created')
  async handlePlayerCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
  }
}
