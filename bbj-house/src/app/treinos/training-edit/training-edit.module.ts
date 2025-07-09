import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TrainingEditPageRoutingModule } from './training-edit-routing.module';
import { TrainingEditPage } from './training-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingEditPageRoutingModule
  ],
  declarations: [TrainingEditPage]
})
export class TrainingEditPageModule {}