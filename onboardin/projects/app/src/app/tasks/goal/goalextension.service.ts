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
    goalExtension.goal.push({id: 1, comment : [], completed : false, name : goalTitle});
  }


}
