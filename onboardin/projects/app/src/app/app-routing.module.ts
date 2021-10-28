import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from 'projects/core/src/lib/components/profile-card/profiles/profiles.component';
import { AddNewcomerComponent } from 'projects/core/src/lib/pages/addnewcomer/addnewcomer.component';

const routes: Routes = [

  {path: 'add-newcomer' , component : AddNewcomerComponent},
  {path: '' , component : ProfilesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
