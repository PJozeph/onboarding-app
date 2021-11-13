import { Extension } from "./extension.modal";

interface Goal {
    id: number
    completed: boolean;
    name: string;
    comment : string [],
}

export class GoalExtension extends Extension  {
    
    constructor(public goal : Goal[]) {

        super(1,"Goal","Desc.","iconPath")

    }
}