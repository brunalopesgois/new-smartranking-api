import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WorkerCategoryCreatedModule } from './module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    WorkerCategoryCreatedModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'challenge_create_category_queue',
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  await app.listen();

  Logger.log(`🚀 Worker CategoryCreated is running`);
}

bootstrap();
