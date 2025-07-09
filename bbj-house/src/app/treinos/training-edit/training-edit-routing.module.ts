import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingEditPage } from './training-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingEditPageRoutingModule {}