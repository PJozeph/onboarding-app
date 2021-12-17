import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../../../extension/modal/extension.goal.modal';
import * as fromApp from '../../../store/index';


@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit, OnDestroy {

  constructor(private store$ : Store<fromApp.AppState>){}

  public comments$ : Observable<Comment[]>;

  ngOnInit(): void {
    this.comments$ = this.store$.select('goalComment').pipe(map(state => state.comments))
  }

  ngOnDestroy(): void {
  }

}