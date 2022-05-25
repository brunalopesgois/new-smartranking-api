import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers';
import { CategoryService } from '../services';
import { CategorySchema } from '../schemas';
import { PlayerModule } from '../../player/modules/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
    PlayerModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
