import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrganizationService } from 'projects/core/src/lib/services/organization.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, 
              private userService: UserService,
              private organizationService : OrganizationService) { }

  ngOnInit(): void {
  }

  public login(){
      this.authService.googleLogin().subscribe( user => {
        this.userService.addUser(user);
      })
  }

}
