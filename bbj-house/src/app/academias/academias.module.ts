import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademiasPageRoutingModule } from './academias-routing.module';

import { AcademiasPage } from './academias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademiasPageRoutingModule
  ],
  declarations: [AcademiasPage]
})
export class AcademiasPageModule {}
