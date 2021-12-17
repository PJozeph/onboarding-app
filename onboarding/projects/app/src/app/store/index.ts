

import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '../auth/store/auth.reducer';
import * as selectedUserReducer from '../extension/goal/store/goal.reducer';
import * as userDashboard from '../tasks/store/user-dashboard.reducers';
import * as organization from "../organization/store/organization.reducer"
import * as goalComment from '../extension/goal/comment-item/store/goal-comment.reducers'

export interface AppState {
    auth: authReducer.State;
    selectedUser : selectedUserReducer.State;
    userDashboard : userDashboard.State;
    organization : organization.State;
    goalComment : goalComment.State
}

export const reducers: ActionReducerMap<AppState> = {
    auth : authReducer.authReducer,
    selectedUser : selectedUserReducer.userSelectReducer,
    userDashboard : userDashboard.userDashboardReducer,
    organization : organization.organizationReducer,
    goalComment : goalComment.goalCommentReducer
  };