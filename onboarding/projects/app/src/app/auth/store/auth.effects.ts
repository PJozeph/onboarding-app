import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageDialogComponent } from "projects/core/src/lib/dialog/message/message-dialog/message-dialog.component";
import { User } from "projects/core/src/lib/modal/user/user.modal";
import { UserService } from "projects/core/src/lib/services/user.service";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

import * as authActions from '../store/auth.actions';

@Injectable()
export class LoginEffect {

    constructor(private actions$: Actions,
        private dialog: MatDialog,
        private userService: UserService,
        private authService: AuthService) { }

    loginFailEffect$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOGIN_FAIL),
        switchMap((action: any) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = { message: action.errorMessage }
            this.dialog.open(MessageDialogComponent, dialogConfig);
            return of({ type: 'noop' });
        })));

    loginStartEffect$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOGIN_START),
        switchMap((action: any) => {
            return this.authService.emailLogin(action.email, action.password).pipe(
                switchMap((user) => this.userService.getUserById(user.user.uid)),
                tap(user => window.localStorage.setItem('user', JSON.stringify(user))),
                map((user: User) => new authActions.LoginSuccess(user)),
                catchError((error: Error) => of(new authActions.LoginFail(error.message)))
            )
        })));

        
    googleLoginStartEffect$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOGIN_START),
        switchMap((action: any) => {
            return this.authService.emailLogin(action.email, action.password).pipe(
                switchMap((user) => this.userService.getUserById(user.user.uid)),
                tap(user => window.localStorage.setItem('user', JSON.stringify(user))),
                map((user: User) => new authActions.LoginSuccess(user)),
                catchError((error: Error) => of(new authActions.LoginFail(error.message)))
            )
        })));
}