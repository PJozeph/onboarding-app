import { Action } from "@ngrx/store";
import { User } from "projects/core/src/lib/modal/user/user.modal";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login FAIL';
export const GOOGLE_LOGIN_START = '[Auth] Google Login Start';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public email: string, public password: string) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public errorMessage: string) { }
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
  | LoginFail