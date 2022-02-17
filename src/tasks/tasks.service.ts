import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTaskById(id: string) {
        console.log('id: ' + id)
        console.log('tasks: ', this.tasks)
        const result = this.tasks.find(t => t.id === id)
        console.log('result', result)
        return result
    }
    getTaskByFilter(taskFilterDto: GetTasksFilterDto): Task[] {
        console.log('taskFilterDto: ' + taskFilterDto)
        const result = this.tasks.filter(task => task.status === taskFilterDto.status)
        console.log('result', result)
        return result
    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = {
            id: randomUUID(),
            title, 
            description, 
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    deleteTask(id: Task['id']): Task {
        const entity = this.getTaskById(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
        return entity
    }

    updateTaskStatus(id: Task['id'], status: Task['status']): Task {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
}
