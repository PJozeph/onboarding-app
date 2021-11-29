import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Observable, Subscription } from 'rxjs';
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