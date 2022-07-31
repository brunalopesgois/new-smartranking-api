import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from '../dtos';
import { Player } from '../entities';

@Injectable()
export class PlayerService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {
    this.logger = new Logger(PlayerService.name);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`Create player: ${JSON.stringify(createPlayerDto)}`);

    const { email } = createPlayerDto;

    const playerExists = await this.playerModel.findOne({ email });

    if (playerExists) {
      return;
    }

    const player = new this.playerModel(createPlayerDto);

    try {
      player.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created player: ${JSON.stringify(player)}`);
  }
}
