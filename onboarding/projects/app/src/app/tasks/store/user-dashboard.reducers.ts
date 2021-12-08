import { UserDashboardActions } from './user-dashboard.actions';
import * as userDashboardActions from "./user-dashboard.actions"

export interface State {
    selectedExtensionName: string;
}

const initialState: State = {
    selectedExtensionName : localStorage.getItem('selectedExtension') ? localStorage.getItem('selectedExtension') : null
};

export function userDashboardReducer(state = initialState, action: UserDashboardActions) {
    switch (action.type) {
        case userDashboardActions.EXTENSION_SELECTED :
            return {
                ...state,
                user: action.payload,
            }
        default: return state;
    }
}