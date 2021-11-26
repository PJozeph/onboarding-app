import { Extension } from "./extension.modal";

interface Feedback {
    comment : string [],
}

export class FeedbackExtension extends Extension {
    
    constructor(public feedback : Feedback) {

    super(2,"Feedback","Desc.","iconPath")

    }
}