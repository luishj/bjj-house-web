import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { TrainingEditPage } from './treinos/training-edit/training-edit.page';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,    NgxMaskDirective],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
