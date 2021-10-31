import { Injectable } from '@angular/core';
import { TaskCard } from './task.modal';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks : TaskCard []  = [
      new TaskCard(0, 'Meet your Boddy', 'Ipsum has been the industry standard dummy text ever since', "assets/icons/people.svg"),
      new TaskCard(1, 'Email Template', 'Ipsum has been the industry standard dummy text ever since', "assets/icons/email.svg"),
      new TaskCard(2, 'First Project', 'Ipsum has been the industry standard dummy text ever since', "assets/icons/project.svg"),
      new TaskCard(3, '1o1 Template', 'Ipsum has been the industry standard dummy text ever since', "assets/icons/chat.svg" ),
      new TaskCard(4, 'Goals', 'Ipsum has been the industry standard dummy text ever since',  "assets/icons/goals.svg"),
      new TaskCard(5, 'Access', 'Ipsum has been the industry standard dummy text ever since',  "assets/icons/key.svg"),
      new TaskCard(6, 'Feedback', 'Ipsum has been the industry standard dummy text ever since',  "assets/icons/feedback.svg"),
      new TaskCard(7, 'Knowledge and Skills', 'Ipsum has been the industry standard dummy text ever since',  "assets/icons/atom.svg"),
    ]
      
  constructor() { }

  public getTasks() {
    return this.tasks;
  }

}
