import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { GoalActions } from './goal.actions';
import * as goalActions from './goal.actions'

export interface State {
    user: User;
}

const initialState: State = {
    user : localStorage.getItem('selectedUser') ? JSON.parse(localStorage.getItem('selectedUser')) : null
};

export function userSelectReducer(state = initialState, action: GoalActions) {
    switch (action.type) {
        case goalActions.SELECTED_USER :
            return {
                ...state,
                user: action.payload,
            }
        case goalActions.REMOVE_SELECTED_USER : 
            return {
                ...state,
                user : null
            }
        default: return state;
    }
}