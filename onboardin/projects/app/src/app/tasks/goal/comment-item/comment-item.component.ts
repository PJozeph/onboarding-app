import { Component, Input, OnInit } from '@angular/core';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Goal } from '../../../extension/modal/extension.goal.modal';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() selectedGoal : Goal;
  @Input() user : User;

  constructor() { }

  ngOnInit(): void {
  }
}