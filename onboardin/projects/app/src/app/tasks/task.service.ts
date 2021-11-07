import { Injectable } from '@angular/core';
import { GoalTask } from './goal-task-modal';
import { TaskModel } from './task.modal';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks : TaskModel []  = [
      new TaskModel(0 ,2, 'Meet your Boddy', 'Ipsum has been \nthe industry ', "assets/icons/people.svg"),
      new TaskModel(1, 2, 'Email Template', 'Ipsum has been \nthe industry ', "assets/icons/email.svg"),
      new TaskModel(2, 1, 'First Project', 'Ipsum has been \nthe industry ', "assets/icons/project.svg"),
      new TaskModel(3, 1, '1o1 Template', 'Ipsum has been \nthe industry ', "assets/icons/chat.svg" ),
      new TaskModel(4, 1, 'Feedback', 'Ipsum has been \nthe industry ',  "assets/icons/feedback.svg"),
      new TaskModel(5, 1, 'Knowledge and Skills', 'Ipsum has been \nthe industry ',  "assets/icons/atom.svg"),
      new GoalTask(6, 2, "Goals", "description", "iconPath", ["Ez egy comment", "Ez a második comment"])
    ]
      
  constructor() { }

  public getTasks() {
    return this.tasks;
  }

  public getTasksByUser(userId:  number): TaskModel [] {
    return this.tasks.filter(task => userId === task.userId)!;
  }

}
