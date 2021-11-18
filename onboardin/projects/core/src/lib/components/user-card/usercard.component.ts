import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.modal';

@Component({
  selector: 'lib-user-card',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(private router : Router) { }

  @Input() user : User;
  @Input() showEdit : boolean = true;

  ngOnInit(): void {
  }

  public onSelect(uid : string){
    this.router.navigate(['profile/' + uid])
  }

}
