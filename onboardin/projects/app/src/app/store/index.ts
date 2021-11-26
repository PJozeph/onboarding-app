

import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../auth/store/auth.reducer';
import * as selectedUserReducer from '../extension/goal/store/goal.reducer';


export interface AppState {
    auth: authReducer.State;
    selectedUser : selectedUserReducer.State
}

export const reducers: ActionReducerMap<AppState> = {
    auth : authReducer.authReducer,
    selectedUser : selectedUserReducer.userSelectReducer
  };