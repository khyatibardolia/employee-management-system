import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EmployeesService {
  getEmployees = JSON.parse(localStorage.getItem('newEmployee')) || [];
  employessChanged = new Subject<any>();

  constructor(private toastr: ToastrService) {}
  saveEmployeeData(form) {
    console.log('form-->>', form);
    if(form.value.id === null) {
      form.value.id = Date.now();
      this.getEmployees.push(form.value);
      this.toastr.success('', 'Employee '+ form.value.fullName + ' has been added successfully!');
    } else {
      console.log('else called');
      for (let i in this.getEmployees) {
        if (this.getEmployees[i].id === form.value.id) {
          this.getEmployees[i] = form.value;
        }
      }
      this.toastr.success('', 'Employee '+ form.value.fullName + ' has been changed successfully!');
    }
    localStorage.setItem('newEmployee', JSON.stringify(this.getEmployees));
    this.employessChanged.next(this.getEmployees.slice());
  }

  getAllEmployees() {
    return this.getEmployees;
  }

  deleteEmployee(id: number) {
    for(let i in this.getEmployees){
      if(this.getEmployees[i].id === id) {
        this.getEmployees.splice(i,1);
        console.log('on delete-->>', this.getEmployees[i]);
        localStorage.setItem('newEmployee', JSON.stringify(this.getEmployees));
        this.employessChanged.next(this.getEmployees.slice());
      }
    }
  }
}
