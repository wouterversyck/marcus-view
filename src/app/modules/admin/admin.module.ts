import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '@app/modules/admin/admin-routing.module';
import { UsersComponent } from './pages/users/users.component';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
