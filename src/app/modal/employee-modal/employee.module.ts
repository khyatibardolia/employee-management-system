import {NgModule} from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import {EmployeeModalComponent} from './employee-modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports:[ModalModule, FormsModule],
  declarations: [ EmployeeModalComponent ],
  exports:[EmployeeModalComponent]
})
export class CommonModule {}
