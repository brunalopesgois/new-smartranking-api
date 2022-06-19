import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeController } from '../controllers';
import { CategorySchema, ChallengeSchema, PlayerSchema } from '../schemas';
import { ChallengeService } from '../services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Challenge',
        schema: ChallengeSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
