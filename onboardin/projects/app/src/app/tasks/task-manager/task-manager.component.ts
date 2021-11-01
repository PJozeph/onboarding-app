import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'projects/core/src/lib/components/profile-card/profile.modal';
import { ProfileService } from 'projects/core/src/lib/components/profile-card/profile.service';
import { TaskCard } from '../task.modal';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  profile : Profile;
  tasks : TaskCard [];

  constructor(private activatedRoute : ActivatedRoute,
              private profileService: ProfileService,
              private taskService: TaskService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( param => {
      const {profileId} = param;
      this.profile = this.profileService.getProfileById(parseInt(profileId))
      this.tasks = this.taskService.getTasksByUser(this.profile.id)
    });
  }

}
