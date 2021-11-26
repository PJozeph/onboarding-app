import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/app/src/app/user/user.service';
import { User } from 'projects/core/src/lib/modal/user/user.modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private profilesService : UserService) { }
  
  users : User [] = []
  
  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe( profiles => {
      this.users = profiles
    })
  }

}
