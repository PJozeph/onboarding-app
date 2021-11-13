import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/app/src/app/user/user.service';
import { User } from '../user.modal';

@Component({
  selector: 'lib-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private profilesService : UserService) { }
  
  profiles : User [] = []
  
  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe( profiles => {
      this.profiles = profiles
    })
  }

}
