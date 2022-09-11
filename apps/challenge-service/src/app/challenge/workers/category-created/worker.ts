import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ICategory } from '@smartranking-challenge/challenge-sdk';

@Controller()
export class WorkerCategoryCreated {
  constructor() {}

  @EventPattern('category-created')
  async handleCategoryCreatedEvent(data: Record<string, ICategory>) {
    try {
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
