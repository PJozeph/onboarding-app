import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/app/src/app/user/user.service';
import { User } from '../user.modal';

@Component({
  selector: 'lib-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private profilesService : UserService) { }
  
  profiles : User [] = []
  
  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe( profiles => {
      this.profiles = profiles
    })
  }

}
