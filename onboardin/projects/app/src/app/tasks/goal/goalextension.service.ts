import { Injectable } from '@angular/core';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Observable, Subject } from 'rxjs';
import { GoalExtension } from '../../extension/modal/extension.goal.modal';
import { Extension } from '../../extension/modal/extension.modal';

@Injectable({
  providedIn: 'root'
})
export class GoalExtensionService {

  private profile : User;
  private extensionSubject = new Subject<Extension>();

  constructor() { }

  public setProfile(profile: User) {
    this.profile = profile;
    this.extensionSubject.next(profile.extension)
  }

  public getExtension() : Observable<Extension> {
    return this.extensionSubject.asObservable()
  }

  public addGoal(profile : User, goalTitle: string){
    const copyProfile : User = {...profile}
    const goalExtension: GoalExtension = <GoalExtension>copyProfile.extension;
    let currentMaxId = goalExtension.goal.length;
    const incremented = currentMaxId+2
    goalExtension.goal.push({id: incremented, comment : [], completed : false, name : goalTitle});
    this.extensionSubject.next(copyProfile.extension)
  }

  public markCompleted(user : User, goalId: number) {
    const copyUser : User = {...user}
    const goalExtension: GoalExtension = <GoalExtension>copyUser.extension;

    let newGoal  = goalExtension.goal.find(goal => goal.id === goalId)!;
    newGoal.completed = true;
  }

  public undoCompleted(user : User, goalId: number) {
    const copyUser : User = {...user}
    const goalExtension: GoalExtension = <GoalExtension>copyUser.extension;

    let newGoal  = goalExtension.goal.find(goal => goal.id === goalId)!;
    newGoal.completed = false;

    this.extensionSubject.next(copyUser.extension)
  }

  public addComment(goalId: number, user : User , comment : string) {
    const copyUser : User = {...user}
    const goalExtension: GoalExtension = <GoalExtension>copyUser.extension;
    let copyGoal  = goalExtension.goal.find(goal => goal.id === goalId)!;
    copyGoal.comment.push(comment)
    this.extensionSubject.next(copyUser.extension)
  }


}
