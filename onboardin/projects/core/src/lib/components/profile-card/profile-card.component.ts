import { Component, Input, OnInit } from '@angular/core';
import { Profile } from './profile.modal';

@Component({
  selector: 'lib-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  constructor() { }

  @Input() profile : Profile;

  ngOnInit(): void {
  }

}
