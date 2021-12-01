import { Extension } from "projects/app/src/app/extension/modal/extension.modal";

export class User {
    constructor(public uid : string, 
                public displayName : string, 
                public imagePath: string,
                public token? : string) {}
}