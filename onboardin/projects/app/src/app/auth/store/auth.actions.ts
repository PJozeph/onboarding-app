import { Action } from "@ngrx/store";
import { User } from "../services/user";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const GOOGLE_LOGIN_START = '[Auth] Google Login Start';

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string; password: string }) {}
  }

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: { user : User }) {}
  }

  export class GoogleLoginStart implements Action {
    readonly type = GOOGLE_LOGIN_START;
  }

  export type AuthActions =
      | LoginStart
      | LoginSuccess