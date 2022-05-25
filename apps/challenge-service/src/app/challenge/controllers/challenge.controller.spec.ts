import { ChallengeController } from './challenge.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from '../services';

describe('ChallengesController', () => {
  let controller: ChallengeController;
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [
        {
          provide: ChallengeService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChallengeController>(ChallengeController);
    service = module.get<ChallengeService>(ChallengeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
