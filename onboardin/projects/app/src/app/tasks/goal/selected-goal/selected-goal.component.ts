import { Component, Input, OnInit } from '@angular/core';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Goal } from '../../../extension/modal/extension.goal.modal';
import { GoalExtensionService } from '../goalextension.service';

@Component({
  selector: 'app-selected-goal',
  templateUrl: './selected-goal.component.html',
  styleUrls: ['./selected-goal.component.css']
})
export class SelectedGoalComponent implements OnInit {

  @Input() selectedGoal : Goal;
  @Input() user : User;

  constructor(private goalExtensionService : GoalExtensionService) { }

  ngOnInit(): void {
  }

  public onAddInput(input: string) {
    this.goalExtensionService.addComment(this.selectedGoal.id, this.user, input);
  }

  public onCancelInput() {
  }

}
