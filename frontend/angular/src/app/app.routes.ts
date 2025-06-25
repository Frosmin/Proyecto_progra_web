import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ViewFormComponent } from './viewForm/view.form.component';
import { HomeComponent } from './home/home.component';
import { VistaComponent } from './vista/vista.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viewform', component: ViewFormComponent },
  { path: 'view/:id', component: VistaComponent },
  { path: 'crear', component: FormComponent },
  { path: 'login', component: LoginComponent },
];
