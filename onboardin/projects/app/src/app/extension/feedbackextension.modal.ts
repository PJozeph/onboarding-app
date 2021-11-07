import { Extension } from "./extension.modal";

interface Feedback {
    comment : string [],
}

export class FeedbackExtension {
    
    constructor(public id: number,
                public name : string,
                public description : string, 
                public iconPath : string,
                public goal : Feedback) {
    }
}