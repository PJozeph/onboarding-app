import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Profile } from 'projects/core/src/lib/components/profile-card/profile.modal';
import { ProfileService } from 'projects/core/src/lib/components/profile-card/profile.service';
import { Subscription } from 'rxjs';
import { GoalExtension } from '../../extension/extension.goal.modal';
import { GoalExtensionService } from './goalextension.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  constructor(private profileService: ProfileService,
              private goalExtensionService: GoalExtensionService) { }

  @Input() profile : Profile;
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

  public markCompleted(profile : Profile, goalId: number) {
    this.goalExtensionService.markCompleted(profile, goalId);
  }

  public undoCompleted(profile : Profile, goalId: number){
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
