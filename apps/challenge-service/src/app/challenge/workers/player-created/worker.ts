import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { IPlayer } from '@smartranking-challenge/challenge-sdk';
import { PlayerService } from '../../services';

@Controller()
export class WorkerPlayerCreated {
  constructor(private readonly playerService: PlayerService) {}

  @EventPattern('player-created')
  async handlePlayerCreatedEvent(data: IPlayer) {
    try {
      this.playerService.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
