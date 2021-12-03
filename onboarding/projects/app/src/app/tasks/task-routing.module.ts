import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component';

const routes: Routes = [
    { path: '', component: TaskManagerComponent , children : [ 
        {
            path : 'goals' , 
            loadChildren : ()=> import('../extension/goal/goal.module').then(m => m.GoalModule) 
        },
        {
            path : 'sharelink' , 
            loadChildren : ()=> import('../extension/share-link/share-link.module').then(m => m.ShareLinkModule) 
        }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }