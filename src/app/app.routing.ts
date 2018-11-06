import {RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';
export const appRoutes:Routes=[
  {
    path: '',
    redirectTo: "viewtask",
    pathMatch: 'full'
  },
    {path:'addtask',component:AddTaskComponent},
    {path:'viewtask',component:ViewTaskComponent},
    {path:'edittask/:id',component:EditTaskComponent}
  ]