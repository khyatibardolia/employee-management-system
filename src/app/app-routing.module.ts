import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';


const routes: Routes = [{
  path: '', component: AuthComponent},
  {path: 'employees', component: EmployeesComponent, children: [
    {path: ':grid-view' , component: EmployeesComponent},
      {path: ':list-view' , component: EmployeesComponent},
      {path: ':currentPage', component: EmployeesComponent, children: [
          {path: ':currentPage/perPage', component: EmployeesComponent}
        ]},
      ], canActivate : [AuthGuardService]},
  {path: 'auth' , component: AuthComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
