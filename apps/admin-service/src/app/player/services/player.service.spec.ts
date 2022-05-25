import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from '../services';

describe('PlayerService', () => {
  let service: PlayerService;

  const mockModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneById: jest.fn(),
    save: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getModelToken('Player'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
