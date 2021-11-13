import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from 'projects/core/src/lib/components/user-card/users/user.component';
import { AddNewcomerComponent } from 'projects/core/src/lib/pages/addnewcomer/addnewcomer.component';
import { TaskManagerComponent } from './tasks/task-manager/task-manager.component';
import { TaskListComponent } from './tasks/tasklist/tasklist.component';

const routes: Routes = [

  {path: 'add-newcomer' , component : AddNewcomerComponent},
  {path: 'tasks' , component : TaskListComponent},
  {path: 'profile/:profileId' , component : TaskManagerComponent },
  {path: 'list-newcomers' , component : UsersComponent},
  {path: '' , component : UsersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
