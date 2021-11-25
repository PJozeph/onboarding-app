import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.css']
})
export class LeftNavigationComponent implements OnInit {

  constructor(private router : Router) { }

  public onAddNewComer() {
    this.router.navigate(['/add-newcomer'])
  }

  public onListNewComers() {
    this.router.navigate(['/users'])
  }

  public onTasks() {
    this.router.navigate(['/tasks'])
  }

  public onLogin() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

}
