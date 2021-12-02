import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../../../extension/modal/extension.goal.modal';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit, OnDestroy{

  @Input() selectedGoal : Goal;
  public imagePath : Observable<string>;
  public commenterImage = 'image';
  public commenterName = 'name';


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}