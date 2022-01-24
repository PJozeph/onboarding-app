import { Action } from "@ngrx/store";

export const GET_SUBSCRIPTION_STATUS = '[Subscription] Get Subscription Status';
export const SET_SUBSCRIPTION = '[Subscription] Set Subscription';

export class GetSubscriptionStatus implements Action {
    readonly type = GET_SUBSCRIPTION_STATUS;
    constructor() {}
  }

export class SetSubscription implements Action {
    readonly type = SET_SUBSCRIPTION;
    constructor(public isActive : boolean, public product : string) {}
}  

  export type SubscriptionActions =
      | GetSubscriptionStatus
      | SetSubscription