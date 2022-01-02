import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private authService : AuthService, 
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
  }

  public onLogout() {
    this.authService.signOut();
    this.router.navigate([''])
  }

  public onSubscriptionStatus(){
    this.router.navigate(['subscription-status'], {relativeTo : this.activatedRoute})
  }

}
