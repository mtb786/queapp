import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-adminheader',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminheaderComponent implements OnInit {

  constructor(private routes: Router, private cookie : CookieService) { }

  ngOnInit() {
  }
  public logOut() {
  localStorage.clear();

  this.routes.navigateByUrl('');
  this.cookie.deleteAll();  
  }
}
