import { Injectable } from '@angular/core';

export interface Extension {
  name : string,
  description : string,
  routeName : string,
  iconPath: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks : Extension  []  = [
      {name : 'Goals', description : 'Set goals' , routeName : 'goals', iconPath: ''},
      {name : 'Share link', description : 'Share useful links' , routeName : 'sharelink', iconPath :''}, 
    ]

  constructor() { }

  public getTasks() {
    return this.tasks;
  }

  public getTaskByRoute(route : string) : Extension {
    return this.tasks.find( e => e.routeName === route);
  }

}
