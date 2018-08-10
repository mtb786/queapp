import { Authguard } from './_guards/auth.guards';
import { CommonHttpService } from './../common/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientModule } from '../app/admin/client/client.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';

import { AuthService , SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular5-social-login";
const appRoutes: Routes = [
  { path: '', component: LoginComponent }
];

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [

      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('800034475316-9fi57pi5n0oe22r4i9ruc4968lq0f1pr.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
  providers: [CommonHttpService, AuthService, Authguard, CookieService , {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
