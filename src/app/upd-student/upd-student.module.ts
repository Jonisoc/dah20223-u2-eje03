import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdStudentPageRoutingModule } from './upd-student-routing.module';

import { UpdStudentPage } from './upd-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdStudentPageRoutingModule
  ],
  declarations: [UpdStudentPage]
})
export class UpdStudentPageModule {}
