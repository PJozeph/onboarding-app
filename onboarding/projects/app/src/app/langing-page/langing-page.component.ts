import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

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

  }

}
