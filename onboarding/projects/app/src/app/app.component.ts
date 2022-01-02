import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public isMobile : boolean;

  constructor( private deviceDetector : DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.deviceDetector.isMobile();
  }



}
