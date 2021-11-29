import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { GoalExtensionService } from '../../extension/goal/goalextension.service';
import { Goal } from '../../extension/modal/extension.goal.modal';
import { TaskModel } from '../task.modal';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  user : User;
  tasks : TaskModel [];
  selectedTask: TaskModel;
  taskSelected : boolean;

  public startIndex : number = 0;
  public endIndex : number = 4;

  constructor(private activatedRoute : ActivatedRoute,
              private userService: UserService,
              private taskService: TaskService,
              private authService: AuthService,
              private goalExtensionService : GoalExtensionService) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => this.userService.getUserById(params['userid'])
      ))
      .subscribe(user => this.user = user);
      this.tasks = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
      this.selectedTask = this.tasks[0];
  }

  public onSelect(task: TaskModel) {
    this.selectedTask = task;
  }

  public onRightSelect() {
    if(this.endIndex < this.taskService.getTasks().length)
    this.startIndex++;
    this.endIndex++;
    this.tasks = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
    this.checkIndexLength()
  }

  public onLeftSelect(){
    if(this.startIndex > 0 ){
      this.startIndex--;
      this.endIndex--;
      this.tasks = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
    }
  }

  private checkIndexLength() {
    if(this.endIndex > this.taskService.getTasks().length) {
       this.endIndex = this.taskService.getTasks().length;
    } 
  }

}
