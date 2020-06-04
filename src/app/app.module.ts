import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import {LoginService} from './login/login.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GridViewComponent } from './employees/grid-view/grid-view.component';
import { ListViewComponent } from './employees/list-view/list-view.component';
import {EmployeesService} from './employees/employees.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmployeeModalComponent } from './modal/employee-modal/employee-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {LoadingSpinner} from './shared/loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    GridViewComponent,
    ListViewComponent,
    EmployeeModalComponent,
    AuthComponent,
    LoadingSpinner
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [LoginService, EmployeesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
