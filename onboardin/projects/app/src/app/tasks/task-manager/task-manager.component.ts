import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../user/user.service';
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
              private authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( param => {
      const {profileId: uid} = param;
      this.user = this.userService.getProfileById((uid));
      this.tasks = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
      this.selectedTask = this.tasks[0];
    });
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
