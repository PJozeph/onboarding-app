import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Goal } from '../../extension/modal/extension.goal.modal';

export interface GoalId extends Goal { goalId: string; }

@Injectable({
  providedIn: 'root'
})
export class GoalExtensionService {

  constructor(private fireStore: AngularFirestore) { }

  public markCompleted(user: User, goalId: string) {
    this.fireStore.collection("accounts")
      .doc(user.uid)
      .collection("goals")
      .doc(goalId)
      .set({
        completed: true
      }, { merge: true })
  }

  public undoCompleted(user: User, goalId: string) {
    this.fireStore.collection("accounts")
      .doc(user.uid)
      .collection("goals")
      .doc(goalId)
      .set({
        completed: false
      }, { merge: true })
  }

  public addGoal(userId: string, goal: Goal) {
    const goalCollection = this.fireStore.collection<Goal>('accounts')
      .doc(userId)
      .collection('goals')
    goalCollection.add(goal)
  }

  public getGoals(userId: String): Observable<Goal[]> {
    const goalCollection: AngularFirestoreDocument<User> = this.fireStore.doc<User>('accounts/' + userId);
    return goalCollection.collection<Goal>('goals')
      .valueChanges({ idField: 'goalId' })
      .pipe(debounceTime(500));
  }

  public getGoal(userId: string, goalId: string): Observable<Goal> {
    return this.fireStore.doc<User>('accounts/' + userId)
      .collection('goals')
      .doc<Goal>(goalId)
      .valueChanges({ idField: 'goalId' })
      .pipe(debounceTime(500));
  }

  public addComment(commentId: string, userId: string, comment: string, commenterId: string) {
    this.fireStore.collection("accounts")
      .doc(userId)
      .collection("goals")
      .doc(commentId)
      .set({
        comment: arrayUnion({ uid: commenterId, message: comment })
      }, { merge: true })
  }

  public deleteGoal(userId: string, goalId: string) {
    this.fireStore.collection("accounts")
      .doc(userId)
      .collection("goals")
      .doc(goalId)
      .delete();
  }

}
