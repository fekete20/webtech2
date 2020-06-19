import {Component, NgModule, OnInit} from '@angular/core';
import { User } from '../model/user';
import {Data, Router} from '@angular/router';
import { AppService } from '../app.service';
import {MaterialModule} from '../material.module';
/*
@NgModule( {
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule
  ]
})
*/


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
 // imports: ['../material.module']

})


export class ListComponent implements OnInit {


/* exports: [
    MaterialModule
  ];
*/
  Employee: any = [];
  user = new User();
  username: string;


  constructor(private router: Router,
              private appService: AppService)
  {
    this.getEmployee();
    this.getUser();
  }

  ngOnInit(): void {
  }

  getEmployee() {
    this.appService.getEmployee().subscribe((data) => {
      this.Employee = data;
    });
  }

  getUser(){

    if (this.appService.getLoggedInUser().uname == null)
    {
      this.router.navigate(['/login']);
    }

    this.user = this.appService.getLoggedInUser();
    this.username = JSON.stringify(this.user.uname);
  }

  logout(){
    this.user = new User();
    this.appService.setLoggedInUser(this.user);
    this.router.navigate(['/login']);
  }
}
