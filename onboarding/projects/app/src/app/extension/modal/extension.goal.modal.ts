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
