import { Action } from "@ngrx/store";
import { Comment } from "../../../modal/extension.goal.modal";

export const RETRIEVE_COMMENTS = '[COMMENTS] Start get comment';
export const GET_COMMENTS_SUCCESS = '[COMMENTS] Get comments success';
export const GET_COMMENTS_FAILED = '[COMMENTS] Get comments failed';

export class RetrieveComments implements Action {
    readonly type = RETRIEVE_COMMENTS;
    constructor(public payload : {userId: string , goalId : string}) { }
}

export class GetCommentsSuccess implements Action {
    readonly type = GET_COMMENTS_SUCCESS;
    constructor(public payload :  Comment []) { }
}

export class GetCommentsFailed implements Action {
    readonly type = GET_COMMENTS_FAILED;
    constructor(public payload : string) { }
}

export type GoalCommentActions = RetrieveComments
                       | GetCommentsFailed
                       | GetCommentsSuccess
                        