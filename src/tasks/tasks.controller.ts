import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') taskId: number) {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() updatedTask: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(taskId, updatedTask);
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }
}
