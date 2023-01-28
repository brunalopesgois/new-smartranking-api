import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from '../dtos';
import { Category } from '../entities';

@Injectable()
export class CategoryService {
  private readonly logger: Logger;

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {
    this.logger = new Logger(CategoryService.name);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    this.logger.log(`Create category: ${JSON.stringify(createCategoryDto)}`);

    const { category } = createCategoryDto;

    const categoryExists = await this.categoryModel.findOne({ category });

    if (categoryExists) {
      return;
    }

    const categoryEntity = new this.categoryModel(createCategoryDto);

    try {
      categoryEntity.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(`Created category: ${JSON.stringify(category)}`);
  }
}
