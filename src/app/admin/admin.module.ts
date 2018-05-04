import { ClientModule } from './client/client.module';
import { ClientlistComponent } from './client/clientlist/clientlist.component';
import { AdmindashboardComponent } from '../admin/admindashboard/admindashboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { NgModule, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import { AdminheaderComponent} from '../admin/admin-header/adminheader.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminSlideComponent } from './admin-slide/admin-slide.component';
import { Authguard } from '../_guards/auth.guards';
const adminRoutes: Routes = [{
path : 'admin' , component : AdminComponent,
pathMatch: 'full'
},
{
    path : 'admin/dashboard' , component : AdmindashboardComponent , canActivate: [Authguard],
    children : [ {path: 'client', component : ClientlistComponent , pathMatch: 'full'  } ]
    }
];
@NgModule({
    imports : [ClientModule , CommonModule , MatIconModule, RouterModule.forRoot(adminRoutes)],
    exports : [ClientModule],
    declarations : [AdmindashboardComponent, SidebarComponent , AdminComponent , AdminheaderComponent, AdminFooterComponent, AdminSlideComponent],
    bootstrap: [ AdminComponent ]
})


export class  AdminModule {
}