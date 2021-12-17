import { User } from "projects/core/src/lib/modal/user/user.modal";

export interface Comment {
    uid : string;
    message : string
    commenter?: User
} 

export interface Goal {
    goalId?: string,
    completed: boolean;
    name: string;
    comment : Comment [],
    description?: string
}
