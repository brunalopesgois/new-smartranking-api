import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateChallengeDto } from '../dtos';
import { Challenge } from '../entities';
import { ChallengeService } from '../services';

@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  async index(): Promise<Challenge[]> {
    return this.challengeService.findAll();
  }

  @Post()
  async store(@Body() createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengeService.create(createChallengeDto);
  }

  @Get('players/:playerId')
  async challengesByPlayer(
    @Param('playerId') playerId: string,
  ): Promise<Challenge[]> {
    return this.challengeService.findByPlayers(playerId);
  }
}
