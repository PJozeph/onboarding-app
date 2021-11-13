import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from 'projects/core/src/lib/components/profile-card/user.modal';
import { Subscription } from 'rxjs';
import { GoalExtension } from '../../extension/extension.goal.modal';
import { GoalExtensionService } from './goalextension.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  constructor(private goalExtensionService: GoalExtensionService) { }

  @Input() profile : User;
  isInputActive: boolean = false

  goalExtension : GoalExtension ;
  private subscription : Subscription;

  ngOnInit(): void {
    this.subscription = this.goalExtensionService.getExtension().subscribe(result => {
      this.goalExtension = <GoalExtension>result
    });
    this.goalExtensionService.setProfile(this.profile);
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
    this.goalExtensionService.addGoal(this.profile, goalTitle)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
