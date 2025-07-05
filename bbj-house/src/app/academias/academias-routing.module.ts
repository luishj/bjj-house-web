import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademiasPage } from './academias.page';

const routes: Routes = [
  {
    path: '',
    component: AcademiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademiasPageRoutingModule {}
