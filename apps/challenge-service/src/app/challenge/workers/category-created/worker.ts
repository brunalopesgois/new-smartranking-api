import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ICategory } from '@smartranking-challenge/challenge-sdk';
import { CategoryService } from '../../services';

@Controller()
export class WorkerCategoryCreated {
  constructor(private readonly categoryService: CategoryService) {}

  @EventPattern('category-created')
  async handleCategoryCreatedEvent(data: ICategory) {
    try {
      this.categoryService.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
