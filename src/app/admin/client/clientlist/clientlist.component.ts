import { CommonHttpService } from './../../../../common/http.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  providers: [CommonHttpService],
  styleUrls: ['./clientlist.component.scss'],
})
export class ClientlistComponent implements OnInit {

  private userInfoListSubsctiption: Subscription;
  private userFilterSubscription: Subscription;
  public selectedUserType: any;
  private userSearchListSubscriptioin: Subscription;
  private activeinactiveUpdateUserSubscription: Subscription;
  public clientInformation: any = [];
  constructor(private http: CommonHttpService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log('sdasd');
    //  setTimeout(() => {
    //   window.location.reload();
    // }, 500);
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
    console.log(optionValue);
    this.userFilterSubscription = this.http.callApiParams('usersearch', optionValue).subscribe((res) => {
      console.log(res);
      this.clientInformation = res.data;
    });


  }
  public ngAfterContentInit() {
    this.loadUserInfo();
  }

  public ngOnDestroy() {
    if (this.userInfoListSubsctiption !== undefined) {
      this.userInfoListSubsctiption.unsubscribe();
    }
    if (this.activeinactiveUpdateUserSubscription !== undefined) {
      this.activeinactiveUpdateUserSubscription.unsubscribe();
    }
  }

  public updatUserMode(id: any, mode: any) {
    console.log(mode);
    mode = (mode === 'inactive' ? 'active' : 'inactive');
    console.log(mode);
    const params = { 'id': id, 'modetype': mode };
    this.activeinactiveUpdateUserSubscription = this.http.callApi2('userupdate', params).subscribe((res) => {
      console.log(res);
    },
      (error) => {
        console.log(error);
      });

    this.loadUserInfo();
  }

  public deleteUser(id: string, event) {
  //  const confFlag =  window.confirm('Are you sure want to remove id');
   
  }
  public removeUser(id) {
  //  const data = { 'id' : id };
  //   this.http.callApi2('userdelete', data).subscribe((res) => {
  //     console.log(res);
  //   });
  //   const dialogRef = this.dialog.open(ClientlistComponent, {
  //     width: '250px',
  //     data: { name: 'asd', animal: 'asdsad' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });

}

}
