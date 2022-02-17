import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
    @Get()
    getAllTasks(){
        return this.tasksService.getAllTasks()
    }
    //@Query = get query from object in req header
  //'Query' tab in Insomnia: notice the params are in the url
  //blank {} if nothing is passed in
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log('getTasks() @Query filterDto', filterDto)
    let results: Task[]
    //if there are Query vals in request, use this provider
    if (Object.keys(filterDto).length) {
        results = this.tasksService.getTaskByFilter(filterDto)
    } else {
        results = this.tasksService.getAllTasks()
    }
    return results
  }

  @Get('/:id')
  /*@Param('id') = pull the param 'id' (/:id above) from the request, 
  pass it to function as variable names 'id' type of string
  @Param vs @Query: this uses a piece of the url not explicitly defined; here, it's assigning a param 'id' 
  using the value given in @Get(' '), here it takes the value after the / and assigns it var name 'id'
  */
  getTaskById(@Param('id') id: Task['id']): Task {
      return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: Task['id']): Task {
    return this.tasksService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
      @Param('id') id: Task['id'],
      @Body('status') status: TaskStatus
      ): Task {
      return this.tasksService.updateTaskStatus(id, status)
  }

}
