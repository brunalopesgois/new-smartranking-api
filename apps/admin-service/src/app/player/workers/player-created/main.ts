 import { Logger } from '@nestjs/common';
 import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WorkerPlayerCreatedModule } from './module';

 async function bootstrap() {
  const app = await NestFactory.createMicroservice(WorkerPlayerCreatedModule, {
    transport: Transport.RMQ,
    options: {
      urls:['amqp://localhost:5672'],
      queue: 'books_queue',
      queueOptions: {
        durable: false
      }
    }
  })
  await app.listen();

  Logger.log(
    `🚀 Worker PlayerCreated is running`
  );
 }

 bootstrap();
