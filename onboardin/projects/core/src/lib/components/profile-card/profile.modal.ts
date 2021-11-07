import { GoalExtension } from "projects/app/src/app/extension/extension.goal.modal";
import { Extension } from "projects/app/src/app/extension/extension.modal";

export class Profile {
    constructor(public id : number, 
                public name : string, 
                public imagePath: string,
                public extension : Extension) {}
}