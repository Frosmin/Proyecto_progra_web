import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ViewFormComponent } from './viewForm/view.form.component';

export const routes: Routes = [
  { path: 'viewform', component: ViewFormComponent},
  { path: 'crear', component: FormComponent}
];