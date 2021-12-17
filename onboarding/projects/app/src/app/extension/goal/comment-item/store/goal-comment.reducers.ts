import { Comment } from '../../../modal/extension.goal.modal';
import * as commentsActions from './goal-comment.actions';

export interface State {
    comments: Comment [];
    errorMessage : string
}

const initialState: State = {
    comments : [],
    errorMessage : null
};

export function goalCommentReducer(state = initialState, action: commentsActions.GoalCommentActions) {
    switch (action.type) {
        case commentsActions.RETRIEVE_COMMENTS :
            return {
                ...state,
            }
        case commentsActions.GET_COMMENTS_SUCCESS : 
            return {
                ...state,
                comments : [...action.payload]
            }
        case commentsActions.GET_COMMENTS_FAILED : 
            return {
                ...state,
                errorMessage : action.payload
            }
        default: return state;
    }
}