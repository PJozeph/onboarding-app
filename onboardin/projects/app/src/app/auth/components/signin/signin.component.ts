import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'projects/core/src/lib/services/organization.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, 
              private userService: UserService,
              private organizationService : OrganizationService) { }

  ngOnInit(): void {
  }

  public create() {
    this.organizationService.createOrganization('test');
  }

  public login(){
    this.organizationService.createOrganization('test');
      // this.authService.googleLogin().subscribe( user => {
      //   this.userService.addUser(user);
      // })

  }

}
