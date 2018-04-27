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
  public selectedUserType: any;
  private activeinactiveUpdateUserSubscription: Subscription;
  public clientInformation: any = [];
  constructor(private http: CommonHttpService) { }

  ngOnInit() {
    console.log('sdasd');
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
  public userBaseFilter(selected: any) {
  const optionValue: any = selected.target.value;
  

  }
  public ngAfterContentInit() {
  this.loadUserInfo();
  }

  public ngOnDestroy() {
    if(this.userInfoListSubsctiption!== undefined) {
      this.userInfoListSubsctiption.unsubscribe();
    }
    if (this.activeinactiveUpdateUserSubscription !== undefined) {
      this.activeinactiveUpdateUserSubscription.unsubscribe();
    }
  }

  public updatUserMode(id: any, mode: any ) {
    console.log(mode);
    mode = (mode === 'inactive' ? 'active' : 'inactive');
    console.log(mode);
    const params = { 'id' : id , 'modetype' : mode  };
    this.activeinactiveUpdateUserSubscription = this.http.callApi2('userupdate', params).subscribe( (res) => {
      console.log(res);
    },
  (error) => {
    console.log(error);
  });

    this.loadUserInfo();
  }



}
