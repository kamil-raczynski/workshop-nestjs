import { TestingModule, Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('App Service', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return hello world on getHello', () => {
    expect(service.getHello()).toEqual('Hello World!');
  });
});
