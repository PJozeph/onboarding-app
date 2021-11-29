import { Extension } from "./extension.modal";


interface Comment {
    uid : string;
    message : string
} 

export interface Goal {
    goalId?: string,
    completed: boolean;
    name: string;
    comment : Comment [],
    description?: string
}

export class GoalExtension extends Extension  {
    
    constructor(public goals : Goal[]) {
        super(1,"Goal","Desc.","iconPath")
    }
}