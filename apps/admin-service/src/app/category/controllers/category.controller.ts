import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddCategoryPlayerDto, CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { Category } from '../entities';
import { CategoryService } from '../services';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categorieService: CategoryService) {}

  @Get()
  async index(): Promise<Category[]> {
    return this.categorieService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Category> {
    return this.categorieService.findById(id);
  }

  @Post()
  async store(@Body() createCategoryDto: CreateCategoryDto): Promise<void> {
    return this.categorieService.create(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categorieService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string): Promise<void> {
    return this.categorieService.delete(id);
  }

  @Post(':id/players')
  async storePlayer(
    @Param('id') id: string,
    @Body() addCategoryPlayerDto: AddCategoryPlayerDto,
  ) {
    return this.categorieService.includePlayerInCategory(
      id,
      addCategoryPlayerDto,
    );
  }

  @Get('players/:playerId')
  async categoriesByPlayer(
    @Param('playerId') playerId: string,
  ): Promise<Category[]> {
    return this.categorieService.findByPlayers(playerId);
  }
}
