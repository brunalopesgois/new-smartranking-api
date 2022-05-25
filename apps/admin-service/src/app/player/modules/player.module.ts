import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PlayerController } from '../controllers';
import { PlayerSchema } from '../schemas';
import { PlayerService } from '../services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
