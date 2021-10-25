import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.modal';

@Component({
  selector: 'lib-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor() { }

  profiles : Profile [] = [new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf'),
                                   new Profile('asdf', 'asddf')]

  ngOnInit(): void {
  }

}
