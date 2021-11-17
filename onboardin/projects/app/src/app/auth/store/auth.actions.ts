import { Action } from "@ngrx/store";
import { User } from "projects/core/src/lib/components/user-card/user.modal";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const GOOGLE_LOGIN_START = '[Auth] Google Login Start';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string; password: string }) {}
  }

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload:  User ) {}
  }

  export class GoogleLoginStart implements Action {
    readonly type = GOOGLE_LOGIN_START;
  }

  export class Logout implements Action {
    readonly type = LOGOUT;
  }

  export type AuthActions =
      | LoginStart
      | LoginSuccess 
      | Logout