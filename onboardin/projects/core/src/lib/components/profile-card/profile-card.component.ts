import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.modal';

@Component({
  selector: 'lib-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  constructor(private router : Router) { }

  @Input() profile : User;
  @Input() showEdit : boolean = true;

  ngOnInit(): void {
  }

  public onSelect(profileId : number){
    this.router.navigate(['profile/' + profileId])
  }

}
