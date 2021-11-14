

import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../auth/store/auth.reducer';


export interface AppState {
    auth: authReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth : authReducer.authReducer
  };