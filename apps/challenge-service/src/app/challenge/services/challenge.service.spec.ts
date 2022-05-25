import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';

describe('ChallengeService', () => {
  let service: ChallengeService;

  const mockModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneById: jest.fn(),
    save: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  const mockHttpService = { get: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: getModelToken('Challenge'),
          useValue: mockModel,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
