import { CommonHttpService } from './../../../../common/http.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  providers : [CommonHttpService],
  styleUrls: ['./clientlist.component.css'],
})
export class ClientlistComponent implements OnInit {

  private userInfoListSubsctiption: Subscription;
  constructor(private http: CommonHttpService) { }

  ngOnInit() {
  }
  private loadUserInfo() {
    this.userInfoListSubsctiption = this.http.callApi('userinfo').subscribe((res) => {
      console.log(res);
    });

  }
  ngAfterContentInit() {
  this.loadUserInfo();
  }
}
