import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PlayerController } from '../controllers';
import { PlayerSchema } from '../schemas';
import { PlayerService } from '../services';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TesteController } from '../controllers/teste.controller';

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
        name: 'GREETING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'books_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [PlayerController, TesteController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
