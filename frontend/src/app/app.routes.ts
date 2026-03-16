import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks';
import { PublicApiComponent } from './pages/public-api/public-api';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'public-api', component: PublicApiComponent }
];

