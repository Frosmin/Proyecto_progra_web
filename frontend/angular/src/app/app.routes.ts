import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ViewFormComponent } from './viewForm/view.form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viewform', component: ViewFormComponent },
  { path: 'crear', component: FormComponent },
];
