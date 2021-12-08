

import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../auth/store/auth.reducer';
import * as selectedUserReducer from '../extension/goal/store/goal.reducer';
import * as userDashboard from '../tasks/store/user-dashboard.reducers';


export interface AppState {
    auth: authReducer.State;
    selectedUser : selectedUserReducer.State;
    userDashboard : userDashboard.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth : authReducer.authReducer,
    selectedUser : selectedUserReducer.userSelectReducer,
    userDashboard : userDashboard.userDashboardReducer
  };