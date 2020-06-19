import {Component, NgModule, OnInit} from '@angular/core';
import { User } from '../model/user';
import {Data, Router} from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  Products: any = [];
  user = new User();
  username: string;


  constructor(private router: Router,
              private service: AppService)
  {
    this.readProduct();
    this.getUser();
  }

  ngOnInit(): void {
  }

  readProduct() {
    this.service.getProducts().subscribe((data) => {
      this.Products = data;
    });
  }

  getUser(){

    if (this.service.getLoggedInUser().uname == null)
    {
      this.router.navigate(['/login']);
    }

    this.user = this.service.getLoggedInUser();
    this.username = JSON.stringify(this.user.uname);
  }

  logout(){
    this.user = new User();
    this.service.setLoggedInUser(this.user);
    this.router.navigate(['/login']);
  }
}
