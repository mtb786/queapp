import { CommonHttpService } from './../common/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientModule} from '../app/admin/client/client.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AdminModule} from './admin/admin.module';

const appRoutes: Routes = [
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AdminModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CommonHttpService],
  bootstrap: [AppComponent],
})
export class AppModule { }
