import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  title = 'employee-crud-app';
  showSideBar = false;

  ngOnInit() {
    if (this.router.url !== '/') {
      this.showSideBar = true;
    }
    console.log('this.showSideBar', this.showSideBar);
  }

}
