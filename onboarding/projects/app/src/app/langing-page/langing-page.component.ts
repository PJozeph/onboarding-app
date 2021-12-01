import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Goal } from '../extension/modal/extension.goal.modal';

@Component({
  selector: 'app-langing-page',
  templateUrl: './langing-page.component.html',
  styleUrls: ['./langing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  public onClick() {

    this.authService.emailSignUp('csaba@gmail.com', '1234657')
    .then((user) => {
        setTimeout(() => {
          this.authService.updateName(user.user.uid, 'PALLLLLLLL');
        }, 500);
      }
    );
  }

}
