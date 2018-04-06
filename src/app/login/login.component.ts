import { Router  } from '@angular/router';
import { CommonHttpService } from './../../common/http.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public uid: String;
  public upassword: String;
  private loginSubscription: Subscription;
  constructor(private http: CommonHttpService, private routes: Router ) { }

  ngOnInit() {
  }
  public Login(id: any, password: any) {
    const params = { 'id': id, 'password': password };
    this.loginSubscription = this.http.callApi2('login', params).subscribe((res) => {
      console.log(res);
      if (res['status'] ===  true) {
      this.routes.navigateByUrl('/admin/dashboard');
      }
    }, (err) => {

    });
  }


  ngOnDestroy() {
    if (this.loginSubscription !== undefined) {
      this.loginSubscription.unsubscribe();
    }
  }
}


