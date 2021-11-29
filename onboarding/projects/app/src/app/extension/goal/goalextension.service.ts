import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion } from 'firebase/firestore';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import { Extension } from '../../extension/modal/extension.modal';

export interface GoalId extends Goal { goalId: string; }

@Injectable({
  providedIn: 'root'
})
export class GoalExtensionService {

  private user: User;
  private extensionSubject = new Subject<Extension>();

  constructor(private fireStore: AngularFirestore) { }

  public setProfile(profile: User) {
    this.user = profile;
    this.extensionSubject.next(profile.extension)
  }

  public getExtension(): Observable<Extension> {
    return this.extensionSubject.asObservable()
  }

  public markCompleted(user: User, goalId: string) {
    const copyUser: User = { ...user }
    const goalExtension: GoalExtension = <GoalExtension>copyUser.extension;

    let newGoal = goalExtension.goals.find(goal => goal.goalId === goalId)!;
    newGoal.completed = true;
  }

  public undoCompleted(user: User, goalId: string) {
    const copyUser: User = { ...user }
    const goalExtension: GoalExtension = <GoalExtension>copyUser.extension;

    let newGoal = goalExtension.goals.find(goal => goal.goalId === goalId)!;
    newGoal.completed = false;

    this.extensionSubject.next(copyUser.extension)
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

  public getGoal(userId : string , goalId : string) : Observable<Goal> {
    return this.fireStore.doc<User>('accounts/' + userId)
          .collection('goals')
          .doc<Goal>(goalId)
          .valueChanges({ idField: 'goalId' }).pipe(debounceTime(500));
  }

  public addComment(commentId : string, userId: string, comment : string, commenterId : string) {
      this.fireStore.collection("accounts")
      .doc(userId)
      .collection("goals")
      .doc(commentId)
      .set({
        comment : arrayUnion({uid: commenterId, message : comment})
      }, { merge: true })
  }


}
