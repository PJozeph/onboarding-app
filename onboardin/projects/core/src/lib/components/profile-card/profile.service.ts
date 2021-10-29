import { Injectable } from '@angular/core';
import { Profile } from './profile.modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profiles : Profile [] = [new Profile(0, 'Nagy Emese', 'asddf'),

  new Profile(1, 'Kis Balázs', 'asddf'),
  new Profile(2, 'Nagy Attila', 'asddf'),
  new Profile(3, 'Pallagi Andrea', 'asddf'),
  new Profile(4, 'Kovács János', 'asddf'),
  new Profile(5, 'Nagy Ervin', 'asddf'),
  new Profile(6, 'Földesi Anna', 'asddf'),
  new Profile(7, 'Molnár Attila', 'asddf'),
  new Profile(8, 'Molnár Ákos', 'asddf'),
  new Profile(9, 'Kelemen István', 'asddf'),
  new Profile(10, 'Takács Bence', 'asddf'),
  new Profile(11, 'Hollik István', 'asddf')]

  constructor() { }

  public getProfiles(){
    return this.profiles
  }

  public getProfileById(profileId : number) : Profile {
    return this.profiles.find(p => p.id === profileId)!;
  }


}
