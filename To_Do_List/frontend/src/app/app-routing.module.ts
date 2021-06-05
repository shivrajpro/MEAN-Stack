import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'lists',
    pathMatch:'full'
  },
  {
    path:'lists',
    component: TaskViewComponent
  },
  {
    path:'new-list',
    component: NewListComponent
  },
  {
    path:'lists/:listId/tasks/new-task',
    component: NewTaskComponent
  },
  {
    path:'lists/:listId/tasks',
    component: TaskViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
