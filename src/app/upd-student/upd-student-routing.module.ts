import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdStudentPage } from './upd-student.page';

const routes: Routes = [
  {
    path: '',
    component: UpdStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdStudentPageRoutingModule {}
