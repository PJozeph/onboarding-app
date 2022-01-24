import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageDialogComponent } from "projects/core/src/lib/dialog/message/message-dialog/message-dialog.component";
import { of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

import * as authActions from '../store/auth.actions'

@Injectable()
export class LoginEffect {

    constructor(private actions$: Actions,
        private dialog: MatDialog) { }

    loginFailEffect$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.LOGIN_FAIL),
        switchMap((action: any) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = { message : action.errorMessage}
            this.dialog.open(MessageDialogComponent, dialogConfig);
            return of({ type: 'noop' });
        })));
}