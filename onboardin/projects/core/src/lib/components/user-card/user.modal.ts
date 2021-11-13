import { Extension } from "projects/app/src/app/extension/modal/extension.modal";

export class User {
    constructor(public id : number, 
                public name : string, 
                public imagePath: string,
                public extension : Extension) {}
}