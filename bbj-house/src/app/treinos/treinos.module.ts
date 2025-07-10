import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TreinosPageRoutingModule } from './treinos-routing.module';
import { TreinosPage } from './treinos.page';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinosPageRoutingModule
    
  ],
  declarations: [TreinosPage,LoginModalComponent]
})
export class TreinosPageModule {}