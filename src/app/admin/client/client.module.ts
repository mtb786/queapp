import {NgModule} from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { ClientlistComponent} from './clientlist/clientlist.component';
import {CommonModule} from '@angular/common';
import { SidebarComponent } from '.././sidebar/sidebar.component';
// const clientroutes:  Routes = [{
//     path: 'client', component : ClientlistComponent
// }];

@NgModule({
    declarations : [ClientlistComponent],
    imports : [
        CommonModule
        // RouterModule.forRoot(clientroutes)

    ] ,   exports : [ClientlistComponent]
})

export class ClientModule {}

