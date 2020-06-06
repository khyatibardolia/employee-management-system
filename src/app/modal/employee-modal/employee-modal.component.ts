import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {EmployeesService} from '../../services/employees/employees.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  @Input() employeeForm: FormGroup;
  @Input() submitted;
  employeeData = [];
  emp: any;
  modalRef: BsModalRef;
  fileToUpload: File = null;
  @ViewChild('emptemplate', {static: true}) emptemp: ElementRef;

  constructor(private modalService: BsModalService,
              private employeeService: EmployeesService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    console.log('empform onInit-->>', this.employeeForm);
    this.employeeForm = this.formBuilder.group({
      id: [null],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
    this.employeeData = this.employeeService.getAllEmployees();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  get getFormControls() {
    return this.employeeForm.controls;
  }

  onAddEditEmployee() {
    this.submitted = true;
    if (!this.getFormControls.fullName.errors && !this.getFormControls.email.errors && !this.getFormControls.contactNo.errors) {
      this.employeeService.saveEmployeeData(this.employeeForm);
      this.modalRef.hide();
    }
  }

  onEditEmployee(emp) {
    this.emp = emp;
    this.employeeForm.patchValue(emp);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
      }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
