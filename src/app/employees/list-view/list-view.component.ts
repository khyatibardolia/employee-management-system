import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EmployeesService} from '../employees.service';
import {Subscription} from 'rxjs/index';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Input() employeeArr;
  returnedArray: string[];
  modalRef: BsModalRef;
  currentPage: number;
  page: any;
  itemsPerPage = 8;
  private empChange: Subscription;

  constructor(private route: Router,
              private router: ActivatedRoute,
              private employeeService: EmployeesService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.returnedArray = this.employeeArr.slice(0, 8);
    this.router.queryParams.subscribe((params: Params) => {
      this.currentPage = params['currentPage'];
    });
    console.log('cp-->>', this.currentPage);
    this.empChange = this.employeeService.employessChanged.subscribe((newEmp) => {
      this.returnedArray = newEmp;
    });
  }

  openModal(template: TemplateRef<any>) {
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
    this.itemsPerPage = page;
    this.route.navigate(['/employees'], {relativeTo: this.router, queryParams: {perPage: page}, queryParamsHandling: 'merge'});
    const startItem = (this.currentPage - 1) * page;
    const endItem = this.currentPage * page;
    this.returnedArray = this.employeeArr.slice() && this.employeeArr.slice(startItem, endItem);
  }

  onDeleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }
}
