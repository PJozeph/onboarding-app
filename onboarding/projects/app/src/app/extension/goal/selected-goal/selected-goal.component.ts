import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Goal } from '../../../extension/modal/extension.goal.modal';
import * as fromApp from '../../../store/index';
import { GoalExtensionService } from '../goalextension.service';

@Component({
  selector: 'app-selected-goal',
  templateUrl: './selected-goal.component.html',
  styleUrls: ['./selected-goal.component.css']
})
export class SelectedGoalComponent implements OnInit, AfterViewChecked {

  @ViewChild('commentContainer') commentContainer : ElementRef;

  public selectedGoal : Goal;
  public selectedUser : User;
  public loggedInUser : User;
  public comment : string = "";
  public goalIsLoading : boolean = true;

  constructor(
            @Inject(MAT_DIALOG_DATA) public data: {selectedGoal: Goal},  
            private goalExtensionService : GoalExtensionService,
            private store$ : Store<fromApp.AppState>,
            private userService : UserService) { }


  ngAfterViewChecked(): void {
    this.commentContainer.nativeElement.scrollTop = this.commentContainer.nativeElement.scrollHeight;
  }
  
  ngOnInit(): void {
    this.goalExtensionService.getGoal(this.data['selectedUserId'],this.data['selectedGoalId'])
    .subscribe(selectedGoal => {
      this.selectedGoal = selectedGoal;
      this.goalIsLoading = false
    })

    this.userService.getUserById(this.data['selectedUserId'])
    .subscribe(selectedUser => this.selectedUser = selectedUser);

    this.store$.select('auth').subscribe((state => {
      if(state.user) {
        this.loggedInUser = state.user
        }
    }))
  }

  public onAddComment(comment: string) {
    this.comment = '';
    this.goalExtensionService.addComment(this.selectedGoal.goalId, this.selectedUser.uid, comment, this.loggedInUser.uid);
  }

  public onCancelInput() {
  }

}
