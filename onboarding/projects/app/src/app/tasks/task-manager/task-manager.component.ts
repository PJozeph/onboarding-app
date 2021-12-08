import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { switchMap } from 'rxjs/operators';
import { Extension, TaskService } from '../task.service';

import * as fromApp from '../../store/index'
import * as userDashAction from "../store/user-dashboard.actions"

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  user : User;
  extensions : Extension [];
  selectedExtension: Extension;
  taskSelected : boolean;

  public startIndex : number = 0;
  public endIndex : number = 4;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private userService: UserService,
              private taskService: TaskService,
              private store$ : Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => this.userService.getUserById(params['userid'])
      ))
      .subscribe(user => this.user = user);
      this.extensions = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
      this.store$.select('userDashboard')
      .subscribe( state => {
        state.selectedExtensionName 
        this.selectedExtension = this.taskService.getTaskByRoute(state.selectedExtensionName);
      })
  }

  public onSelect(extension: Extension) {
    this.store$.dispatch( new userDashAction.SelectExtension(extension.routeName))
    window.localStorage.setItem("selectedExtension", extension.routeName)
    this.selectedExtension = extension;
    this.router.navigate([extension.routeName] ,{relativeTo : this.activatedRoute})
  }

  public onRightSelect() {
    if(this.endIndex < this.taskService.getTasks().length)
    this.startIndex++;
    this.endIndex++;
    this.extensions = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
    this.checkIndexLength()
  }

  public onLeftSelect(){
    if(this.startIndex > 0 ){
      this.startIndex--;
      this.endIndex--;
      this.extensions = this.taskService.getTasks().slice(this.startIndex, this.endIndex);
    }
  }

  private checkIndexLength() {
    if(this.endIndex > this.taskService.getTasks().length) {
       this.endIndex = this.taskService.getTasks().length;
    } 
  }

}
