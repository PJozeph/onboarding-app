import { Injectable } from '@angular/core';
import { GoalExtension } from 'projects/app/src/app/extension/extension.goal.modal';
import { Extension } from 'projects/app/src/app/extension/extension.modal';
import { GoalTask } from 'projects/app/src/app/tasks/goal-task-modal';
import { TaskModel } from 'projects/app/src/app/tasks/task.modal';
import { TaskService } from 'projects/app/src/app/tasks/task.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Profile } from './profile.modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

   subject = new BehaviorSubject<Profile[]>([
    new Profile(0, 'Pallagi Andrea', 'assets/funny_profile_pic.jpg', new GoalExtension( [])),
    new Profile(1, 'Nagy Emese', 'assets/profile_0.jpg', new GoalExtension( []) ),
    new Profile(2, 'Kis Balázs', 'assets/profile-picture.jpg', new GoalExtension( 
      [
        {id: 1, completed: false, comment: ['Comment1', 'comment2'],name:'Complete Terminal Installation'},
        {id: 1, completed: false, comment: ['Comment1', 'comment2'],name:'Complete Card Activation'},
      ])),
    new Profile(3, 'Nagy Attila', 'assets/Pallagi_profile.jpg', new GoalExtension( [])),
    new Profile(4, 'Pallagi Andrea', 'assets/funny_profile_pic.jpg', new GoalExtension( [])),
    new Profile(5, 'Kovács János', 'assets/profile_1.jpg', new GoalExtension( [])),
    new Profile(6, 'Nagy Ervin', 'assets/profile_2.jpg', new GoalExtension( [])),
    new Profile(7, 'Földesi Anna', 'assets/profile_3.jpg', new GoalExtension( [])),
    new Profile(8, 'Molnár Attila', 'assets/profile_4.jpg', new GoalExtension( [])),
    new Profile(9, 'Molnár Ákos', 'assets/profile_5.jpg', new GoalExtension( [])),
    new Profile(10, 'Kelemen István', 'assets/profile_6.jpg', new GoalExtension( [])),
    new Profile(11, 'Takács Bence', 'assets/profile_7.jpg', new GoalExtension( [])),
    new Profile(12, 'Hollik István', 'assets/profile_8.jpg', new GoalExtension( [])),
    new Profile(13, 'Hollik István', 'assets/profile_8.jpg', new GoalExtension( [])),
    new Profile(14, 'Hollik István', 'assets/profile_8.jpg', new GoalExtension( []))
  ]);

  extensionArraySubject = new Subject<Extension[]>();

  constructor() { }

  public getProfileById(profileId: number): Profile {
     return  this.subject.value.find(p => p.id === profileId)!;
  }

  public getProfiles(){
    return this.subject.asObservable();
  }

}
