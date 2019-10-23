import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { CreateTaskDto } from '../src/tasks/dto/create-task.dto';
import { getConnection } from 'typeorm';

describe('Tasks Controller (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await getConnection().synchronize(true);
  });

  afterEach(async () => {
    await app.close();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect([]);
  });

  it('/task (POST)', () => {
    const newTask: CreateTaskDto = {
      isDone: true,
      title: 'Epic Title',
      description: 'Epic description',
      points: 2,
    };

    return request(app.getHttpServer())
      .post('/tasks')
      .send(newTask)
      .set('Accept', 'application/json')
      .expect(201);
  });
});
