import {Component, OnInit , ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../services/employees/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  modalRef: BsModalRef;
  employeeForm: FormGroup;
  submitted = false;
  employeeData = [];
  isEmployeeAdded = false;

  constructor(private route: Router,
              private router: ActivatedRoute,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private employeeService: EmployeesService) {
  }

  ngOnInit() {
   /* this.employeeForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.minLength(10)]]
    });*/
    this.employeeData = this.employeeService.getAllEmployees();
  }

  /*openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }*/

 /* get getFormControls() {
    console.log(this.employeeForm.controls);
    return this.employeeForm.controls;
  }*/

  /*onAddEmployee() {
    this.submitted = true;
    this.employeeService.addEmployees(Date.now(), this.employeeForm.get('fullName').value,
      this.employeeForm.get('email').value, this.employeeForm.get('contactNo').value);
  }*/
}
