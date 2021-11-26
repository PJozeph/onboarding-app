import { Component, OnInit } from '@angular/core';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[] = []

  ngOnInit(): void {
    this.userService.getUsers().subscribe(user => {
        this.users = user
      });
  }

  

}
