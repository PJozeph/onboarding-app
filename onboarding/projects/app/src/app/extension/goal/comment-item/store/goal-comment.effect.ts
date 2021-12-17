import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { GoalExtensionService } from "../../goalextension.service";
import * as golCommentActions from '../store/goal-comment.actions';

@Injectable()
export class GoalCommentEffects {
 
  goalComments$ = createEffect(() => this.actions$.pipe(
    ofType(golCommentActions.RETRIEVE_COMMENTS),
    mergeMap((action : golCommentActions.RetrieveComments ) => 
    this.goalExtensionService.getGoal(action.payload.userId, action.payload.goalId).pipe(map( g => g.comment))
    .pipe(map((comments  => 
        new golCommentActions.GetCommentsSuccess(comments))),
        catchError(() => EMPTY))
    ))
  );
 
  constructor(
    private actions$: Actions,
    private goalExtensionService : GoalExtensionService
  ) {}
}