import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayRemove } from '@angular/fire/firestore';
import { arrayUnion } from 'firebase/firestore';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';

export interface Organization {
  uid? : string,
  name : string,
  members: string [],
  editorsUid? : string []
  ownerUid?: string,
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private angularFirestore : AngularFirestore) { }

  public getUserOrganizations(uid: string) : Observable <Organization []> {
    const orgs$  = this.angularFirestore.collection<Organization>
    ('organizations', ref => 
      ref.where('members', 'array-contains', uid))
    return orgs$.valueChanges({ idField: 'uid' })
  }


  public createOrganization(organization : Organization) {
    return this.angularFirestore
      .collection<Organization>('organizations')
      .add(organization)
  }

  public getOrganizationMembers(members : string []) : Observable <User[]> {
   return this.angularFirestore
   .collection<User>('accounts', ref => ref.where('uid', 'in', members)).valueChanges();
  }

  public addMember(usersId: string, organizationId : string) {
     return this.angularFirestore
      .collection("organizations")
      .doc(organizationId)
      .set({
        members: arrayUnion( usersId )
      }, { merge: true });
  }
  
  public removeMember(userId: string, organizationId :string , ){
    this.angularFirestore
    .collection("organizations")
    .doc(organizationId)
    .set({
      members: arrayRemove( userId )
    }, { merge: true });
  }

}
