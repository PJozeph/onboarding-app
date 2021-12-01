import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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
        return new User(user.uid, user.displayName, user.imagePath)
      })
    }));
  }

  public getUserById(userId : string) : Observable<User> {
    return this.angularFireStore.doc<User>('accounts/' + userId).valueChanges()
  }

}
