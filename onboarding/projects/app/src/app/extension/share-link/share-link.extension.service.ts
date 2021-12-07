import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Link } from '../modal/link.extension.modal';

@Injectable({
  providedIn: 'root'
})
export class ShareLinkExtensionService {

  constructor(private angularFireStore : AngularFirestore) { }

  public addLink(userId: string , link : Link) {
    const goalCollection = this.angularFireStore.collection<Link>('accounts')
      .doc(userId)
      .collection('links')
    goalCollection.add(link)
  }

  public removeLink(userId : string, linkId: string){
      this.angularFireStore.collection("accounts")
        .doc(userId)
        .collection("links")
        .doc(linkId)
        .delete();
  }

  public updateLink(userId: string, link : Link) {
    this.angularFireStore.collection("accounts")
        .doc(userId)
        .collection("links")
        .doc(link.linkId)
        .update(link);
  }

  public getLinks(userId: string) : Observable<Link[]> {
    const goalCollection: AngularFirestoreDocument<User> = this.angularFireStore.doc<User>('accounts/' + userId);
    return goalCollection.collection<Link>('links')
      .valueChanges({ idField: 'linkId' })
  }

  public getLinkById(userId: string, linkId : string) : Observable<Link> {
    return this.angularFireStore.doc<User>('accounts/' + userId)
      .collection('links')
      .doc<Link>(linkId)
      .valueChanges()
      .pipe(debounceTime(500));
  }

}
