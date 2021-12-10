import { Action } from "@ngrx/store";
import { Organization } from "../services/organization.service";

export const SELECTED_ORGANIZATION = '[ORG] Set selected organization';

export class SelectOrganization implements Action {
    readonly type = SELECTED_ORGANIZATION;
    constructor(public payload: Organization) { }
}

export type OrgActions = SelectOrganization;