import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Subscription } from 'rxjs';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import * as fromApp from '../../store/index';
import { GoalExtensionService } from './goalextension.service';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  @Input() user : User;
  
  public isInputActive: boolean = false
  public goalExtension : GoalExtension ;
  public selectedGoal : Goal;
  private subscription : Subscription;
  public maxHeight : number;
  private isLoggedIn : boolean = false;

  constructor(private goalExtensionService: GoalExtensionService,
              private store : Store<fromApp.AppState>,
              private dialogService : MatDialog,
              ) { }

  ngOnInit(): void {
    // this.store.select('auth').subscribe((state => {
    //   if(state.user) {
    //       this.isLoggedIn = true;
    //     } 
    // }))
    this.maxHeight = window.innerHeight - 320;
    this.subscription = this.goalExtensionService.getExtension().subscribe(result => {
      this.goalExtension = <GoalExtension>result
    });
    this.goalExtensionService.setProfile(this.user);
    if(this.goalExtension.goals) {
        this.selectedGoal = this.goalExtension.goals[0];
    }
  }
  
  public onSelectGoal(goalId: number) {
    this.selectedGoal = this.goalExtension.goals.find( goal => goal.id === goalId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '40rem';
    dialogConfig.width = '40rem';
    dialogConfig.data =  { 'selectedGoal' : this.selectedGoal, 'selectedUser' : this.user }
    this.dialogService.open(SelectedGoalComponent, dialogConfig)
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

  public markCompleted(profile : User, goalId: number) {
    this.goalExtensionService.markCompleted(profile, goalId);
  }

  public undoCompleted(profile : User, goalId: number){
    this.goalExtensionService.undoCompleted(profile, goalId)
  }

  public onInputCancel() {
    this.isInputActive = false;
  }

  public onInputAdd(goalTitle: string){
    this.goalExtensionService.addGoal(this.user, goalTitle)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
