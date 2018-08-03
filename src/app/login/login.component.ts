import { Router, ActivatedRoute } from '@angular/router';
import { CommonHttpService } from './../../common/http.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public uid: String;
  returnUrl: string;
  public loginFlag: boolean;
  public forgetFlag: boolean;
  public upassword: String;
  private loginSubscription: Subscription;
  constructor(private http: CommonHttpService,private routes: Router, private route: ActivatedRoute, private socialAuthService: AuthService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



  public Login(id: any, password: any) {
    const params = { 'id': id, 'password': password };
    this.loginSubscription = this.http.callApi2('api/auth/login', params).subscribe((res) => {
      if (res['status'] === true) {
        console.log(res.data);
        const user_id = res.data.user_id;
        const user_tokken = res.data.tokken;
        console.log(user_tokken);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('user_tokken', user_tokken);
        this.routes.navigateByUrl('/admin/dashboard');
      }
    }, (err) => {

    });

  }
  public socialLogin() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {

        console.log(userData);
        console.log(userData.email);
        localStorage.setItem('user_id',userData.email);
        localStorage.setItem('user_tokken', userData.token);   
        this.routes.navigateByUrl('/admin/dashboard');
      
        
      }
    );

  }
  public login(type: boolean) {
    this.loginFlag = type;
  }
  public forgetPassword(type: boolean) {
    this.forgetFlag = type;
    this.loginFlag = false;
  }

  ngOnDestroy() {
    if (this.loginSubscription !== undefined) {
      this.loginSubscription.unsubscribe();
    }
  }
}


