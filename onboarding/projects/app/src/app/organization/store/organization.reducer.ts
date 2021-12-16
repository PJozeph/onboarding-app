import { OrgActions } from "./organization.actions";
import * as orgActions from './organization.actions';
import { Organization } from "../services/organization.service";
import { Actions } from "@ngrx/effects";

export interface State {
    organization: Organization;
}

const initialState: State = {
    organization : localStorage.getItem('selectedOrg') ? JSON.parse(localStorage.getItem('selectedOrg')) : null
};

export function organizationReducer(state = initialState, action: OrgActions) {
    switch (action.type) {
        case orgActions.SELECTED_ORGANIZATION :
            return {
                ...state,
                organization: action.payload,
            }
        case orgActions.REMOVE_ORG_MEMBER : {
            const newOrg  = {...state.organization};
            newOrg.members = state.organization.members.filter( member => member !== action.payload); 
             return {
                 ...state,
                 organization : newOrg
             }   
        }
        case orgActions.ADD_ORG_MEMBER : {
            const newOrg  = {...state.organization};
            newOrg.members = [...state.organization.members, action.payload]
            return {
                ...state,
                organization : newOrg
            }
        }
        default: return state;
    }
}