import { TaskModel } from "./task.modal";


export class GoalTask extends TaskModel  {

    constructor(public id : number, 
                 public userId: number,
                 public name: string, 
                 public description: string, 
                 public iconPath: string,
                 public comments: string[] ) {
        super(id,userId, name, description, iconPath);
    }    

}