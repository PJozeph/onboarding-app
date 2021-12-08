import { Action } from "@ngrx/store";

export const EXTENSION_SELECTED = '[User_Dashboard] Set extension';

export class SelectExtension implements Action {
    readonly type = EXTENSION_SELECTED;
    constructor(public payload : string) { }
}

export type UserDashboardActions = SelectExtension;