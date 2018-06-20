import { CommonHttpService } from './../../../../common/http.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  providers: [CommonHttpService],
  styleUrls: ['./clientlist.component.scss'],
})
export class ClientlistComponent implements OnInit {
  closeResult: string;

  // API Subscription Instance

  private userInfoListSubsctiption: Subscription;
  private userFilterSubscription: Subscription;
  private userSearchListSubscriptioin: Subscription;
  private activeinactiveUpdateUserSubscription: Subscription;
  private AddUserSubscription: Subscription;

  // Input Bind Instances

  public userData: any = {
    "id": '',
    "name": '',
    "password": '',
    "modetype": 'active',
    "type": '',
    "location": '',
    "createdby": "manish"
  }

  public selectedUserType: any;
  public clientInformation: any = [];
  constructor(private http: CommonHttpService, private modalService: NgbModal, public dialog: MatDialog) { }

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
  public saveUser(): void {
    const reqDATA: any = {
      "id": "bhavnani0@gmail.com",
      "name": "Manish",
      "password": "test@123",
      "modetype": "active",
      "type": "admin",
      "location": "india",
      "createdby": "manish"
    }



    this.AddUserSubscription = this.http.callApi2('user', this.userData).subscribe((res) => {
      console.log(res);
    });
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


  open(content) {
    console.log('asdsad');

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


















}
