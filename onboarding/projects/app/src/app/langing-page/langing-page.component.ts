import { Component, OnInit } from '@angular/core';
import { Goal } from '../extension/modal/extension.goal.modal';

@Component({
  selector: 'app-langing-page',
  templateUrl: './langing-page.component.html',
  styleUrls: ['./langing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onClick() {
    const goal : Goal = { goalId : '1', comment : [], name : '', completed : false}
  }

}
