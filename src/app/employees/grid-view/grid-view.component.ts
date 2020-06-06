import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmployeesService} from '../../services/employees/employees.service';
import {FormGroup} from '@angular/forms';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import * as _ from "lodash";
import {EmployeesComponent} from '../employees.component';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {
  returnedArray: string[];
  modalRef: BsModalRef;
  currentPage: number;
  page: any;
  itemsPerPage = 8;
  // fetchEmployee: Object;
  // employeeEdited = false;
  private empChange: Subscription;

  @Input() employeeArr;
   @Input() emptemp;
 // @ViewChild('emptemplate', {static: true}) empModal: ElementRef;

  constructor(private route: Router,
              private router: ActivatedRoute,
              private employeeService: EmployeesService,
              private modalService: BsModalService
              ) {
  }

  ngOnInit() {
    console.log('empArray', this.employeeArr);
    console.log('modalRef', this.modalRef);
    console.log('emptemp', this.emptemp);
    this.returnedArray = this.employeeArr.slice(0, 8);
    this.currentPage = 1;
    this.empChange = this.employeeService.employessChanged.subscribe((newEmp) => {
      console.log('grid-view subscribe', newEmp);
      this.returnedArray = newEmp;
    });
  }
  openModal(template: TemplateRef<any>) {
    console.log('template-->>', template);
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  pageChanged(event: PageChangedEvent): void {
    console.log('page', event);
    event.itemsPerPage = this.router.snapshot.queryParams['perPage'] ? this.router.snapshot.queryParams['perPage'] : 8;
    this.itemsPerPage = event.itemsPerPage;
    this.route.navigate(['/employees'], {relativeTo: this.router, queryParams: {currentPage: event.page, perPage: this.page}});
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.employeeArr.slice() && this.employeeArr.slice(startItem, endItem);
  }

  fnPerPage(page: number) {
    this.page = page;
    this.route.navigate(['/employees'], {relativeTo: this.router, queryParams: {perPage: page}, queryParamsHandling: 'merge'});
    const startItem = ((this.currentPage - 1) * page);
    const endItem = this.currentPage * page;
    this.returnedArray = this.employeeArr.slice() && this.employeeArr.slice(startItem, endItem);
  }

  onDeleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }
  fnSort(type: string) {
    if(type === 'name') {
       this.returnedArray =  _.orderBy(this.returnedArray, ['fullName'], ['asc']);
    } else if(type === 'email') {
      this.returnedArray =  _.orderBy(this.returnedArray, ['email'], ['asc']);
    } else {
      this.returnedArray =  _.orderBy(this.returnedArray, ['contactNo'], ['asc']);
    }
  }

  fnSortData(type: string) {
   if(type === 'ascending') {
     this.returnedArray =  _.orderBy(this.returnedArray, ['fullName', 'email', 'contactNo'], ['asc', 'asc', 'asc']);
   } else {
     this.returnedArray =  _.orderBy(this.returnedArray, ['fullName', 'email', 'contactNo'], ['desc', 'desc', 'desc']);
   }
  }
}
