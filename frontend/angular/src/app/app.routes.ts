import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'crear', component: FormComponent}
];