import * as subscriptionActions from './subscription.actions';
import { SubscriptionActions } from './subscription.actions';

export interface State {
    productId: string;
    isActive: boolean;
}

const initialState: State = {
    productId: window.localStorage.getItem('productId') ? window.localStorage.getItem('productId') : null,
    isActive:  window.localStorage.getItem('memberStatus') ? JSON.parse(window.localStorage.getItem('memberStatus')) === true : false
};

export function membershipReducer(state = initialState, action: SubscriptionActions) {
    switch (action.type) {
        case subscriptionActions.GET_SUBSCRIPTION_STATUS :
            return {
                ...state,
            }
            case subscriptionActions.SET_SUBSCRIPTION :
            window.localStorage.setItem('productId', action.product);
            window.localStorage.setItem('memberStatus', JSON.stringify(action.isActive))
            return {
                ...state,
                isActive : action.isActive,
                productId : action.product
        }
        case subscriptionActions.CANCEL_SUBSCRIPTION : {
            window.localStorage.removeItem("productId");
            window.localStorage.removeItem("memberStatus")
            return {
                ...state,
                productId: null,
                isActive : false
            }
        }    
        default: return state;
    }
}
