import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.modal';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'lib-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private profilesService : ProfileService) { }
  
  profiles : Profile [] = []
  
  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe( profiles => {
      this.profiles = profiles
    })
  }

}
