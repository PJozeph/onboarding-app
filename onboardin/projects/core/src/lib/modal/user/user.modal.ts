import { Extension } from "projects/app/src/app/extension/modal/extension.modal";

export class User {
    constructor(public uid : string, 
                public name : string, 
                public imagePath: string,
                public extension : Extension,
                public organization? : [
                    { name : '', users : []}
                ],
                public token? : string) {}
}