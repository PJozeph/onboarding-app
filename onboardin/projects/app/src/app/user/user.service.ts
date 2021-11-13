import { Injectable } from "@angular/core";
import { User } from "projects/core/src/lib/components/profile-card/user.modal";
import { BehaviorSubject } from "rxjs";
import { GoalExtension } from "../extension/extension.goal.modal";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
     subject = new BehaviorSubject<User[]>([
      new User(0, 'Pallagi Andrea', 'assets/funny_profile_pic.jpg', new GoalExtension( [])),
      new User(1, 'Nagy Emese', 'assets/profile_0.jpg', new GoalExtension( []) ),
      new User(2, 'Kis Balázs', 'assets/profile-picture.jpg', new GoalExtension( 
        [
          {id: 1, completed: false, comment: ['Comment1', 'comment2'],name:'1st Complete Terminal Installation'},
          {id: 2, completed: true, comment: ['Comment1', 'comment2'],name:'Complete Card Activation'},
          {id: 3, completed: true, comment: ['Comment1', 'comment2'],name:'Fix First Bug'},
          {id: 4, completed: false, comment: ['Comment1', 'comment2'],name:'Complete Terminal Installation'},
          {id: 5, completed: true, comment: ['Comment1', 'comment2'],name:'Complete Card Activation'},
          {id: 6, completed: true, comment: ['Comment1', 'comment2'],name:'Fix First Bug'},
          {id: 7, completed: false, comment: ['Comment1', 'comment2'],name:'Complete Terminal Installation'},
          {id: 8, completed: true, comment: ['Comment1', 'comment2'],name:'Complete Card Activation'},
          {id: 9, completed: true, comment: ['Comment1', 'comment2'],name:'Fix First Bug'},
          {id: 10, completed: false, comment: ['Comment1', 'comment2'],name:'Complete Terminal Installation'},
        ])),
      new User(3, 'Nagy Attila', 'assets/Pallagi_profile.jpg', new GoalExtension( [])),
      new User(4, 'Pallagi Andrea', 'assets/funny_profile_pic.jpg', new GoalExtension( [])),
      new User(5, 'Kovács János', 'assets/profile_1.jpg', new GoalExtension( [])),
      new User(6, 'Nagy Ervin', 'assets/profile_2.jpg', new GoalExtension( [])),
      new User(7, 'Földesi Anna', 'assets/profile_3.jpg', new GoalExtension( [])),
      new User(8, 'Molnár Attila', 'assets/profile_4.jpg', new GoalExtension( [])),
      new User(9, 'Molnár Ákos', 'assets/profile_5.jpg', new GoalExtension( [])),
      new User(10, 'Kelemen István', 'assets/profile_6.jpg', new GoalExtension( [])),
      new User(11, 'Takács Bence', 'assets/profile_7.jpg', new GoalExtension( [])),
      new User(12, 'Hollik István', 'assets/profile_8.jpg', new GoalExtension( [])),
      new User(13, 'Hollik István', 'assets/profile_8.jpg', new GoalExtension( [])),
      new User(14, 'Hollik István', 'assets/profile_8.jpg', new GoalExtension( []))
    ]);
  
  
    constructor() { }
  
    public getProfileById(profileId: number): User {
       return  this.subject.value.find(p => p.id === profileId)!;
    }

    public addUser(user : User){
        const users : User [] = this.subject.value;
        users.push(user)
        this.subject.next([...users]);
    }
  
    public getProfiles(){
      return this.subject.asObservable();
    }
  
  }
  