import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Goal } from '../../../extension/modal/extension.goal.modal';
import * as fromApp from '../../../store/index';
import { GoalExtensionService } from '../goalextension.service';

@Component({
  selector: 'app-selected-goal',
  templateUrl: './selected-goal.component.html',
  styleUrls: ['./selected-goal.component.css']
})
export class SelectedGoalComponent implements OnInit {

  public selectedGoal : Goal;
  public selectedUser : User;
  public loggedInUser : User;
  public comment : string = "";

  constructor(
            @Inject(MAT_DIALOG_DATA) public data: {selectedGoal: Goal},  
            private goalExtensionService : GoalExtensionService,
            private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.selectedGoal =  this.data['selectedGoal'];
    this.selectedUser =  this.data['selectedUser']
    this.store.select('auth').subscribe((state => {
      if(state.user) {
        this.loggedInUser = state.user
        }
    }))
  }

  public onAddComment(comment: string) {
    this.comment = '';
    this.goalExtensionService.addComment(this.selectedGoal.id, this.selectedUser, comment, this.loggedInUser.uid);
  }

  public onCancelInput() {
  }

}
