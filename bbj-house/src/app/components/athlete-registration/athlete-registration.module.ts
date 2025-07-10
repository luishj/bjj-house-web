import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AthleteRegistrationComponent } from './athlete-registration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AthleteRegistrationComponent
      }
    ])
  ],
  declarations: [AthleteRegistrationComponent],
  exports: [AthleteRegistrationComponent]
})
export class AthleteRegistrationPageModule {}