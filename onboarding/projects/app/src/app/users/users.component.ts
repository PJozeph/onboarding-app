import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private usersSubscription : Subscription;

  constructor(private userService: UserService) { }

  users: User[] = []

  ngOnInit(): void {
    this.usersSubscription = this.userService.getUsers().subscribe(users => {
        this.users = users
      });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
  

}
