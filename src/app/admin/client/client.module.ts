import {NgModule} from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { ClientlistComponent} from './clientlist/clientlist.component';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '.././sidebar/sidebar.component';
import { MatButtonModule ,MatDialogModule, MatPaginatorModule, MatSlideToggleModule,   MatSelectModule , MatSlideToggle , MatTooltipModule, MatMenuModule, MatIconModule, MatInputModule, MatOptgroup , MatSidenavModule, MatToolbarModule, MatFormFieldModule, MatCardModule } from '@angular/material';
// const clientroutes:  Routes = [{ 
//     path: 'client', component : ClientlistComponent
// }];
const materialModules = [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDialogModule
];
@NgModule({
    declarations : [ClientlistComponent],
    imports : [
        CommonModule,
        FormsModule,
        ...materialModules
        // RouterModule.forRoot(clientroutes)

    ] ,   exports : [ClientlistComponent , ...materialModules]
})

export class ClientModule {}

