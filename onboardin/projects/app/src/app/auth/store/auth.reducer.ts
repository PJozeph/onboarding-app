import { Action } from "@ngrx/store";
import { User } from "../services/user";
import {AuthActions}  from './auth.actions';
import * as authAction from './auth.actions'

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case authAction.LOGIN_START:
            return {
                ...state,
                loading: true,
            }
        default: return state;
    }
}
