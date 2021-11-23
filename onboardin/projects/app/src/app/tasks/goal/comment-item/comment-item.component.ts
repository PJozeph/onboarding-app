import { Component, Input, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Goal } from '../../../extension/modal/extension.goal.modal';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() selectedGoal : Goal;
  @Input() user : User;
  commenter : User;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public getUserImage(userId: string) {
    const user = this.userService.getUserById(userId);
    return user.imagePath;
  }

  public getCommenterName(userId : string) {
    const user = this.userService.getUserById(userId);
    return user.name
  }

}