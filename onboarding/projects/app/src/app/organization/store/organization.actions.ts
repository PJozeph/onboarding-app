import { Action } from "@ngrx/store";
import { Organization } from "../services/organization.service";

export const SELECTED_ORGANIZATION = '[ORG] Set selected organization';
export const REMOVE_ORG_MEMBER = '[ORG] Remove org member';
export const ADD_ORG_MEMBER = '[ORG] Add org member';

export class SelectOrganization implements Action {
    readonly type = SELECTED_ORGANIZATION;
    constructor(public payload: Organization) { }
}

export class RemoveOrgMember implements Action {
    readonly type = REMOVE_ORG_MEMBER;
    constructor(public payload: string) { }
}

export class AddOrgMember implements Action {
    readonly type = ADD_ORG_MEMBER;
    constructor(public payload: string) { }
}

export type OrgActions = SelectOrganization 
                       | RemoveOrgMember 
                       | AddOrgMember;