import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { RankEventName, RANK_OPERATION } from '@smartranking-admin/admin-sdk';
import { Model } from 'mongoose';
import { PlayerService } from '../../player/services';
import {
  AddCategoryPlayerDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dtos';
import { Category } from '../entities';

@Injectable()
export class CategoryService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playerService: PlayerService,
    @Inject('CREATE_CATEGORY_SERVICE') private createCategoryEvent: ClientProxy
  ) {
    this.logger = new Logger(CategoryService.name);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('players');
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    this.logger.log(`Create category: ${JSON.stringify(createCategoryDto)}`);

    const { category } = createCategoryDto;

    const categoryExists = await this.categoryModel.findOne({ category });

    if (categoryExists) {
      throw new BadRequestException(
        `Category with name ${category} already exists`
      );
    }

    const categoryEntity: Category = new this.categoryModel({
      category: createCategoryDto.category,
      description: createCategoryDto.description,
      rankEvents: [
        {
          name: RankEventName.VICTORY,
          operation: RANK_OPERATION,
          value: createCategoryDto.victoryValue,
        },
        {
          name: RankEventName.VICTORY_OVER_LEADER,
          operation: RANK_OPERATION,
          value: createCategoryDto.victoryOverLeaderValue,
        },
        {
          name: RankEventName.DEFEAT,
          operation: RANK_OPERATION,
          value: createCategoryDto.defeatValue,
        },
      ],
    });

    //TODO: Disparar evento para criar categoria no challenge-service
    try {
      categoryEntity.save();

      this.createCategoryEvent.emit('category-created', categoryEntity);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created category: ${JSON.stringify(categoryEntity)}`);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    this.logger.log(`Update category: ${JSON.stringify(updateCategoryDto)}`);

    const { category } = updateCategoryDto;

    let categoryEntity: Category = await this.findById(id);

    if (!categoryEntity) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const sameNameCategory = await this.categoryModel.findOne({ category });

    if (sameNameCategory && categoryEntity != sameNameCategory) {
      throw new BadRequestException(
        `Cannot save category with name ${category}. Already exists`
      );
    }

    //TODO: Disparar evento para atualizar categoria no challenge-service
    try {
      categoryEntity = await this.categoryModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateCategoryDto },
        { new: true }
      );

      this.logger.log(`Updated category: ${categoryEntity}`);

      return categoryEntity;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Remove category with id: ${id}`);

    const category: Category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    try {
      this.categoryModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Category removed`);
  }

  async includePlayerInCategory(
    id: string,
    addCategoryPlayerDto: AddCategoryPlayerDto
  ): Promise<void> {
    const category = await this.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const { playerId } = addCategoryPlayerDto;

    const player = await this.playerService.findById(playerId);

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    const playerInCategory = await this.categoryModel
      .find({ _id: id })
      .where('players')
      .in(player.id);

    if (playerInCategory.length > 0) {
      throw new NotFoundException(
        `Player with id ${id} already exists in category ${category.category}`
      );
    }

    category.players.push(player.id);

    try {
      await this.categoryModel.findByIdAndUpdate(
        { _id: id },
        { $set: category }
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByPlayers(playerId: string): Promise<Category[]> {
    return this.categoryModel
      .find({ players: { _id: playerId } })
      .populate('players');
  }
}
