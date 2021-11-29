import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, Firestore, getDoc, getDocs, onSnapshot, query, setDoc, where } from '@angular/fire/firestore';
import { Goal } from 'projects/app/src/app/extension/modal/extension.goal.modal';
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

  public getUserById(userId) : Observable<User> {
    return this.angularFireStore.doc<User>('accounts/' + userId).valueChanges()
  }


  public async addGoal(userId: string , goal : Goal) {
    const accounts = collection(this.fireStore, "accounts");
    const account = query(accounts, where("uid", "==", userId));
    const querySnapshot = await getDocs(account);
    querySnapshot.forEach((user) => {
      const userRef = doc(this.fireStore, 'accounts', user.id);
      setDoc(userRef, { name: name }, { merge: true });
    })
  }

}
