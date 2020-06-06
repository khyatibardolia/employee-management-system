import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  closeNav() {
    document.getElementById('mySidepanel').style.width = '0';
    document.getElementById('main-container').classList.remove('add-margin');
  }

  openNav() {
    document.getElementById('main-container').classList.add('add-margin');
    document.getElementById('mySidepanel').style.width = '250px';

  }

}
