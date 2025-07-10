import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { EstatisticaCardComponent } from '../components/estatistica-card/estatistica-card.component';
import { GraduacaoCardComponent } from '../components/graduacao-card/graduacao-card.component';
import { HeaderCardComponent } from '../components/header-card/header-card.component';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,   
    
  ],
  declarations: [HomePage,EstatisticaCardComponent,GraduacaoCardComponent,HeaderCardComponent,StatCardComponent]
})
export class HomePageModule {}
