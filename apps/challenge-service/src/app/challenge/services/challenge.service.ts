import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, Challenge, Player } from '../entities';
import { CreateChallengeDto } from '../dtos';
import { ChallengeStatus } from '@smartranking-challenge/challenge-sdk';

@Injectable()
export class ChallengeService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Player') private readonly playerModel: Model<Player>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {
    this.logger = new Logger(ChallengeService.name);
  }

  async findAll(): Promise<Challenge[]> {
    return this.challengeModel.find().populate('players');
  }

  async create(createChallengeDto: CreateChallengeDto): Promise<void> {
    this.logger.log(`Create challenge: ${JSON.stringify(createChallengeDto)}`);

    const { requester, players } = createChallengeDto;

    if (requester._id != players[0]._id && requester._id != players[1]._id) {
      throw new BadRequestException('One of the players must be the requester');
    }

    await this.validatePlayers(players);

    const categories = await this.categoryModel.find();

    let dbCategory: Category;

    for (const category of categories) {
      for (const player of category.players) {
        if (player.email == requester.email) {
          dbCategory = category;
        }
      }
    }

    //TODO: publish/consume event of players added in category

    if (!dbCategory) {
      throw new BadRequestException('The requester must have a category');
    }

    const challengeEntity = new this.challengeModel({
      ...createChallengeDto,
      category: dbCategory.category,
      requestDateTime: new Date(),
      status: ChallengeStatus.PENDING,
    });

    try {
      challengeEntity.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created challenge: ${JSON.stringify(challengeEntity)}`);
  }

  async findByPlayers(playerId: string): Promise<Challenge[]> {
    return this.challengeModel
      .find({ players: { _id: playerId } })
      .populate('players');
  }

  private async validatePlayers(players): Promise<void> {
    const player1 = await this.playerModel.findById(players[0]._id);

    if (!player1) {
      throw new NotFoundException(
        `The player with id ${players[0]._id} does not exist`
      );
    }

    const player2 = await this.playerModel.findById(players[1]._id);

    if (!player2) {
      throw new NotFoundException(
        `The player with id ${players[1]._id} does not exist`
      );
    }
  }
}
