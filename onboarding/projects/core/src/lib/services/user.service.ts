import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../modal/user/user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireStore : AngularFirestore) { }

  public getUsers() : Observable<User[]> {
    return this.angularFireStore
    .collection<User>('accounts')
    .valueChanges().pipe(map( users => {
      return users.map(user => {
        return new User(user.uid, user.stripeUid ,user.displayName, user.imagePath)
      })
    }));
  }

  public getUserById(userId : string) : Observable<User> {
    return this.angularFireStore.doc<User>('accounts/' + userId).valueChanges()
  }

  public getUserByEmail(userEmail : string) : Observable<User[]> {
    return this.angularFireStore
    .collection<User>('accounts', ref => ref.where('email', '==', userEmail)).valueChanges();

  }

  public getUserMembership(user : User) : Observable<any> {
    if(!user) {
      return EMPTY
    }
    const userCollection: AngularFirestoreDocument<User> = this.angularFireStore.doc<User>('accounts/' + user.uid);
    return userCollection.collection('membership').valueChanges()
  }

}
