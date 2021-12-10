import { OrgActions } from "./organization.actions";
import * as orgActions from './organization.actions';
import { Organization } from "../services/organization.service";

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
        default: return state;
    }
}