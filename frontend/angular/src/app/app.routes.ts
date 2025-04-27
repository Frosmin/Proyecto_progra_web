import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';

export const routes: Routes = [
  { path: 'hello', component: HelloComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];