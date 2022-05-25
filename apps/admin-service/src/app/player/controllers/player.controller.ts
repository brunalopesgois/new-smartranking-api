import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from '../dtos';
import { Player } from '../entities';
import { PlayerService } from '../services';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async index(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Player> {
    return this.playerService.findById(id);
  }

  @Post()
  async store(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    await this.playerService.create(createPlayerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string): Promise<void> {
    return this.playerService.delete(id);
  }
}
