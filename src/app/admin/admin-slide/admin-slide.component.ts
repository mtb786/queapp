import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-slide',
  templateUrl: './admin-slide.component.html',
  styleUrls: ['./admin-slide.component.scss']
})
export class AdminSlideComponent implements OnInit {

  public accordinMangage: any = {
    'setting' : false
  };
  constructor() { }

  ngOnInit() {
  }

  public showDialog(type: any) {
    this.accordinMangage[type] =  !this.accordinMangage[type];
  }

}
