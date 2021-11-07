import { Injectable } from '@angular/core';
import { Profile } from 'projects/core/src/lib/components/profile-card/profile.modal';
import { ProfileService } from 'projects/core/src/lib/components/profile-card/profile.service';
import { Observable, Subject } from 'rxjs';
import { GoalExtension } from '../../extension/extension.goal.modal';
import { Extension } from '../../extension/extension.modal';

@Injectable({
  providedIn: 'root'
})
export class GoalExtensionService {

  private profile : Profile;
  private extensionSubject = new Subject<Extension>();

  constructor(private profileService : ProfileService) { }

  public setProfile(profile: Profile) {
    this.profile = profile;
    this.extensionSubject.next(profile.extension)
  }

  public getExtension() : Observable<Extension> {
    return this.extensionSubject.asObservable()
  }

  public addGoal(profile : Profile, goalTitle: string){
    const copyProfile : Profile = {...profile}
    const goalExtension: GoalExtension = <GoalExtension>copyProfile.extension;
    let currentMaxId = goalExtension.goal.length;
    const incremented = currentMaxId+2
    goalExtension.goal.push({id: incremented, comment : [], completed : false, name : goalTitle});
    this.extensionSubject.next(copyProfile.extension)
  }

  public markCompleted(profile : Profile, goalId: number){
    const copyProfile : Profile = {...profile}
    const goalExtension: GoalExtension = <GoalExtension>copyProfile.extension;

    let newGoal  = goalExtension.goal.find(goal => goal.id === goalId)!;
    newGoal.completed = true;
  }

  public undoCompleted(profile : Profile, goalId: number){
    const copyProfile : Profile = {...profile}
    const goalExtension: GoalExtension = <GoalExtension>copyProfile.extension;

    let newGoal  = goalExtension.goal.find(goal => goal.id === goalId)!;
    newGoal.completed = false;

    this.extensionSubject.next(copyProfile.extension)
  }


}
