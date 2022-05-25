import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto, UpdatePlayerDto } from '../dtos';
import { Player } from '../entities';

@Injectable()
export class PlayerService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {
    this.logger = new Logger(PlayerService.name);
  }

  async findAll(): Promise<Player[]> {
    return this.playerModel.find();
  }

  async findById(id: string): Promise<Player> {
    return this.playerModel.findById(id);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`Create player: ${JSON.stringify(createPlayerDto)}`);

    const { email } = createPlayerDto;

    const playerExists = await this.playerModel.findOne({ email });

    if (playerExists) {
      throw new BadRequestException(
        `Player with email ${email} already exists`,
      );
    }

    const player = new this.playerModel(createPlayerDto);

    //TODO: Disparar evento para criar player no challenge-service
    try {
      player.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created player: ${JSON.stringify(player)}`);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    this.logger.log(`Update player: ${JSON.stringify(updatePlayerDto)}`);

    const { email } = updatePlayerDto;

    let player: Player = await this.findById(id);

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    const sameEmailPlayer = await this.playerModel.findOne({ email });

    if (sameEmailPlayer && player != sameEmailPlayer) {
      throw new BadRequestException(
        `Cannot save player with email ${email}. Already exists`,
      );
    }

    //TODO: Disparar evento para criar player no challenge-service
    try {
      player = await this.playerModel.findByIdAndUpdate(
        { _id: id },
        { $set: updatePlayerDto },
        { new: true },
      );

      this.logger.log(`Updated player: ${player}`);

      return player;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove player with id: ${id}`);

    const player: Player = await this.findById(id);

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    try {
      this.playerModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Player removed`);
  }
}
