import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.css']
})
export class LeftNavigationComponent implements OnInit {

  constructor(private router : Router,
              private activatedRoute : ActivatedRoute) { }

  public onAddNewComer() {
    this.router.navigate(['/add-newcomer'])
  }

  public onListNewComers() {
    this.router.navigate(['/organizations'], { relativeTo: this.activatedRoute })
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
