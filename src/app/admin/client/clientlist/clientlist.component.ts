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
  public clientInformation: any = [];
  constructor(private http: CommonHttpService) { }

  ngOnInit() {
  }
  private loadUserInfo() {
    this.userInfoListSubsctiption = this.http.callApi('userinfo').subscribe((res) => {
      console.log(res);
      this.clientInformation = res.data;
      console.log('Client Information');
      console.log(this.clientInformation);

    }, (err) => {
   console.log(err);
    }
  );

  }
  ngAfterContentInit() {
  this.loadUserInfo();
  }
}
