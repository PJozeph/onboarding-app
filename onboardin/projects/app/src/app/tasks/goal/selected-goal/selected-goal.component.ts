import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../../../extension/modal/extension.goal.modal';

@Component({
  selector: 'app-selected-goal',
  templateUrl: './selected-goal.component.html',
  styleUrls: ['./selected-goal.component.css']
})
export class SelectedGoalComponent implements OnInit {

  @Input() selectedGoal : Goal;

  constructor() { }

  ngOnInit(): void {
  }

}
