import { Action } from "@ngrx/store";

export const START_SUBSCRIPTION = '[Subscription] Start Subscription';
export const CANCEL_SUBSCRIPTION = '[Subscription] Cancel Subscription';
export const SET_SUBSCRIPTION = '[Subscription] Set Subscription';

export class StartSubscription implements Action {
    readonly type = START_SUBSCRIPTION;
    constructor() {}
  }

export class CancelSubscription implements Action {
    readonly type = CANCEL_SUBSCRIPTION;
    constructor() {}
  }

export class SetSubscription implements Action {
    readonly type = SET_SUBSCRIPTION;
    constructor(public isActive : boolean, public product : string) {}
}  

  export type SubscriptionActions =
      | StartSubscription
      | CancelSubscription
      | SetSubscription