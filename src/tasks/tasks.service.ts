import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { GetTaskDto } from './dto/get-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ) {}

    async getAllTasks(): Promise<GetTaskDto[]> {
        return await this.taskRepository.find();
    }

    async getTask(taskId: number): Promise<GetTaskDto> {
        return await this.taskRepository.findOneOrFail({id: taskId});
    }

    async createTask(task: CreateTaskDto): Promise<GetTaskDto> {
        const newTask = await this.taskRepository.create(task);
        return this.taskRepository
        .save(newTask)
        .then(task => task)
        .catch( error => {
            throw new HttpException(error, 500)
        })
    }

    async updateTask(taskId: number, updatedTask: UpdateTaskDto): Promise<GetTaskDto> {
        const task = await this.taskRepository.findOneOrFail(taskId).catch(err => {
            throw new HttpException(err, 404);
        })
        await this.taskRepository.merge(task, updatedTask);
        return await this.taskRepository.save(task);
    }

    async deleteTask(taskId: number): Promise<GetTaskDto> {
        const task = await this.taskRepository.findOneOrFail({id: taskId});
        return await this.taskRepository.remove(task);
    }

}
