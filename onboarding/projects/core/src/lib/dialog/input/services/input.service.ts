import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface InputDialogSource {
  type : string,
  title : string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  private input = new Subject<InputDialogSource>();

  constructor() { }

  public addSource(source : InputDialogSource) {
    this.input.next(source);
  }

  public source() {
    return this.input.asObservable();
  }

}
