import { Action } from "@ngrx/store";
import { User } from "projects/core/src/lib/modal/user/user.modal";

export const SELECTED_USER = '[Goal] Set selected user';
export const REMOVE_SELECTED_USER = '[Goal] Remove selected user';

export class SelectUser implements Action {
    readonly type = SELECTED_USER;
    constructor(public payload: User) { }
}

export class RemoveSelectedUser implements Action {
    readonly type = REMOVE_SELECTED_USER;
    constructor(public payload: User) { }
}

export type GoalActions =
    | SelectUser
    | RemoveSelectedUser