import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  constructor(private userService: UserService) {}

  transform(value: string, ...args: unknown[]): Observable<string> {
    return this.userService.getUserById(value).pipe(map(user => user.name));
  }

}
