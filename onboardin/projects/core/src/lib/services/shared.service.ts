import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private selectedUserId = new Subject<string>();

  
  public setSelectedUserId(userId : string){
    this.selectedUserId.next(userId);
  }

  public getSelectedUserId() : Observable<string> {
    return this.selectedUserId.asObservable();
  }
  
}
