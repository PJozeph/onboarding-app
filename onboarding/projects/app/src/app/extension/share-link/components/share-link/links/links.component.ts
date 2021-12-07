import { Component, Input, OnInit } from '@angular/core';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Link } from '../../../../modal/link.extension.modal';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  @Input() userLinks : Link[];
  @Input() user : User;

  constructor() { }

  ngOnInit(): void {
  }

}
