import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from 'projects/core/src/lib/components/user-card/users/user.component';

const routes: Routes = [
  {path: 'users' , component : UsersComponent},
  {path : 'user/:userid', loadChildren: ()=> import('./tasks/task.module').then( m => m.TaskModule)},
  {path: '' , pathMatch : 'full', redirectTo: 'users'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
