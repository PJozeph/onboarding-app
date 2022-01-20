import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public isMobile : boolean;

  constructor(private deviceDetector : DeviceDetectorService,
              private router : Router) {}

  ngOnInit(): void {
    this.isMobile = this.deviceDetector.isMobile();
    if(this.isMobile) {
      this.router.navigate(['mobile'])
    } else {
      this.router.navigate(['welcome'])
    }
  }



}
