import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import {LoginService} from './services/login/login.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GridViewComponent } from './employees/grid-view/grid-view.component';
import { ListViewComponent } from './employees/list-view/list-view.component';
import {EmployeesService} from './services/employees/employees.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmployeeModalComponent } from './modal/employee-modal/employee-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {LoadingSpinner} from './shared/loading-spinner';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    GridViewComponent,
    ListViewComponent,
    EmployeeModalComponent,
    AuthComponent,
    LoadingSpinner,
    HeaderComponent,
    SidebarComponent
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
  providers: [LoginService, EmployeesService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
