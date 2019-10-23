import { TasksController } from './tasks.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { GetTaskDto } from './dto/get-task.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

describe('Tasks Controller', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;
  const mockRepository = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useClass: mockRepository },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('getAllTasks', () => {
    it('should return array of tasks ', async () => {
      const result: GetTaskDto[] = [
        {
          id: 1,
          title: 'TITLE',
          description: 'Description',
          points: 2,
          isDone: false,
        },
      ];

      jest
        .spyOn(tasksService, 'getAllTasks')
        .mockImplementation(() => Promise.resolve(result));
      expect(await tasksController.getAllTasks()).toBe(result);
    });
  });
});
