import { Test, TestingModule } from '@nestjs/testing';
import { CreateLogService } from './create-log.service';
import { LogInterface } from 'src/interfaces/log.interface';

describe('CreateLogService', () => {
  let createLogService: CreateLogService;
  let logServiceMock: Partial<LogInterface>;

  beforeEach(async () => {
    logServiceMock = {
      create: jest.fn(), 
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLogService,
        {
          provide: 'Log', 
          useValue: logServiceMock,
        },
      ],
    }).compile();

    createLogService = module.get<CreateLogService>(CreateLogService);
  });

  it('should be defined', () => {
    expect(createLogService).toBeDefined();
  });

  it('should create a log entry successfully', async () => {
    const logData = {
      priority: 1,
      type: 'INFO',
      ip: '127.0.0.1',
      hostname: 'localhost',
      program: 'Test Program',
      message: 'Test message',
    } as any;

    await createLogService.execute(logData);

    expect(logServiceMock.create).toHaveBeenCalledWith(logData);
  });

  it('should throw an error if log creation fails', async () => {
    const logData = {
      priority: 1,
      type: 'INFO',
      ip: '127.0.0.1',
      program: 'Test Program',
      message: 'Test message',
    } as any;

    logServiceMock.create(logData)

    try {
      await createLogService.execute(logData);
    } catch (error) {
      expect(error.message).toBe('An error occurred while logging.');
    }
  });


  afterEach(() => {
    jest.clearAllMocks();
  });
});
