import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'projects/core/src/lib/components/profile-card/profile.modal';
import { ProfileService } from 'projects/core/src/lib/components/profile-card/profile.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  profile : Profile;

  constructor(private activatedRoute : ActivatedRoute,
              private profileService: ProfileService) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe( value => {
      const {profileId} = value;
        this.profile = this.profileService.getProfileById(parseInt(profileId))
    });
  }

}
