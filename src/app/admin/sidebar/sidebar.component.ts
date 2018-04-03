import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public settingtoggle: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
public settingToggle() {
this.settingtoggle = !this.settingtoggle;
}
}
