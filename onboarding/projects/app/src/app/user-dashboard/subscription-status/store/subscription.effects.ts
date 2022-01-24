import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { UserService } from "projects/core/src/lib/services/user.service";
import { map, switchMap } from "rxjs/operators";

import * as fromApp from '../../../store/index';
import * as subscriptionAction from '../store/subscription.actions';

@Injectable()
export class SubscriptionEffect {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store$: Store<fromApp.AppState>) { }

    getMembership$ = createEffect(() => this.actions$.pipe(
        ofType(subscriptionAction.GET_SUBSCRIPTION_STATUS),
        switchMap(() => this.store$.select('auth').pipe(map(state => state.user))),
        switchMap((user) =>
            this.userService.getUserMembership(user).pipe(
                map(membership => ({
                    type: subscriptionAction.SET_SUBSCRIPTION,
                    product: membership[0].product,
                    isActive: membership[0].active
                }))
            )
        )
    ));
}