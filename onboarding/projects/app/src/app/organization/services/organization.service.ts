import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';

export interface Organization {
  uid? : string,
  name : string,
  members: []
  ownerUid?: string,
  editors? : []
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private angularFirestore : AngularFirestore) { }

  public getUserOrganization(uid: string) : Observable <Organization []> {
    const goalCollection: AngularFirestoreDocument<User> = this.angularFirestore.doc<User>('accounts/' + uid);
    return goalCollection.collection<Organization>('organizations')
      .valueChanges({ idField: 'uid' })
  }

  public createOrganization(userId : string, organization : Organization) {
    return this.angularFirestore.collection<Organization>('accounts')
      .doc(userId)
      .collection('organizations')
      .add(organization)
  }

  public getOrganizationMembers(members : string []) : Observable <User[]> {
    return this.angularFirestore
    .collection<User>('accounts', ref => ref.where('uid', 'in', members)).valueChanges();
  }

  public addMember(orgOwnerId: string ,usersId: string, organizationId : string) {
    this.angularFirestore.collection("accounts")
      .doc(orgOwnerId)
      .collection("organizations")
      .doc(organizationId)
      .set({
        members: arrayUnion( usersId )
      }, { merge: true }).then(result => console.log(result))
  } 

}
