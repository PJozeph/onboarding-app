import { Injectable } from '@angular/core';
import { GoalTask } from './goal-task-modal';
import { TaskModel } from './task.modal';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks : TaskModel []  = [
      new GoalTask(6, 2, "Goals", "description", "assets/icons/goals.svg", ["Ez egy comment", "Ez a második comment"]),
      new TaskModel(0 , 'Meet your Boddy', 'Ipsum has been \nthe industry ', "assets/icons/people.svg"),
      new TaskModel(1, 'Email Template', 'Ipsum has been \nthe industry ', "assets/icons/email.svg"),
      new TaskModel(2, 'First Project', 'Ipsum has been \nthe industry ', "assets/icons/project.svg"),
      new TaskModel(3, '1o1 Template', 'Ipsum has been \nthe industry ', "assets/icons/chat.svg" ),
      new TaskModel(4, 'Feedback', 'Ipsum has been \nthe industry ',  "assets/icons/feedback.svg"),
      new TaskModel(5, 'Knowledge and Skills', 'Ipsum has been \nthe industry ',  "assets/icons/atom.svg"),
    ]
      
  constructor() { }

  public getTasks() {
    return this.tasks;
  }


}
