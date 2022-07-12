import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PlayerController } from '../controllers';
import { PlayerSchema } from '../schemas';
import { PlayerService } from '../services';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'CREATE_PLAYER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'challenge_create_player_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
