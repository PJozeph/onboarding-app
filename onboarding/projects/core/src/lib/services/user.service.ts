import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore, onSnapshot, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../modal/user/user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fireStore: Firestore, 
              private angularFireStore : AngularFirestore) { }

  public getUsers() : Observable<User[]> {
    const observable = new Observable<User[]>(subscriber => {
      const q = query(collection(this.fireStore, "accounts"));
        onSnapshot(q, (querySnapshot) => {
        const users : User [] = []
        querySnapshot.forEach((doc) => {
          console.log("user name  "  + doc.data())
            users.push(new User(doc.data().uid,
                                doc.data().name, 
                                doc.data().imagePath ? doc.data().imagePath : 'assets/defaultProfileImage.jpg' , null))
        });
        subscriber.next(users);
      });
    })
    return observable;
  }

  public getUserById(userId : string) : Observable<User> {
    return this.angularFireStore.doc<User>('accounts/' + userId).valueChanges()
  }

}
