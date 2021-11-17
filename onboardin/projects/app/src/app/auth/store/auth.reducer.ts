import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import * as authAction from './auth.actions';
import { AuthActions } from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user'))  : null ,
    authError: null,
    loading: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case authAction.LOGIN_START :
            return {
                ...state,
                loading: true,
            }
        case authAction.LOGIN_SUCCESS : 
            return {
                ...state,
                loading: false,
                user : action.payload
            }
        case authAction.LOGOUT  :
            return {
                ...state,
                user : null
        }
        default: return state;
    }
}
