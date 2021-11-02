import { Injectable } from '@angular/core';
import { Profile } from './profile.modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profiles: Profile[] = [
    new Profile(0, 'Nagy Emese', 'assets/profile_0.jpg', [1,2,3,4] ),
    new Profile(1, 'Kis Balázs', 'assets/profile-picture.jpg', [1,2,3,4]),
    new Profile(2, 'Nagy Attila', 'assets/Pallagi_profile.jpg', [2,3,4,1]),
    new Profile(3, 'Pallagi Andrea', 'assets/funny_profile_pic.jpg', [1,2,3,4]),
    new Profile(4, 'Kovács János', 'assets/profile_1.jpg', [1,2,3,4]),
    new Profile(5, 'Nagy Ervin', 'assets/profile_2.jpg', [1,2,3,4]),
    new Profile(6, 'Földesi Anna', 'assets/profile_3.jpg', [2,3,4]),
    new Profile(7, 'Molnár Attila', 'assets/profile_4.jpg', [3,]),
    new Profile(8, 'Molnár Ákos', 'assets/profile_5.jpg', [4]),
    new Profile(9, 'Kelemen István', 'assets/profile_6.jpg', [4]),
    new Profile(10, 'Takács Bence', 'assets/profile_7.jpg', [1,2]),
    new Profile(11, 'Hollik István', 'assets/profile_8.jpg', [1,2]),
    new Profile(11, 'Hollik István', 'assets/profile_8.jpg', [1,2]),
    new Profile(11, 'Hollik István', 'assets/profile_8.jpg', [1,2])
  ]

  constructor() { }

  public getProfiles() {
    return this.profiles
  }

  public getProfileById(profileId: number): Profile {
    return this.profiles.find(p => p.id === profileId)!;
  }


}
