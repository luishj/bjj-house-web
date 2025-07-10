import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  {
    path: 'campeonatos',
    loadChildren: () => import('./campeonatos/campeonatos.module').then( m => m.CampeonatosPageModule)
  },
  {
    path: 'academias',
    loadChildren: () => import('./academias/academias.module').then( m => m.AcademiasPageModule)
  },
  {
    path: 'treinos',
    loadChildren: () => import('./treinos/treinos.module').then( m => m.TreinosPageModule)
  },
  {
    path: 'training-registration',
    loadChildren: () => import('./treinos/training-registration/training-registration.module').then( m => m.TrainingRegistrationPageModule)
  }, 
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'training-edit/:id',
    loadChildren: () => import('./treinos/training-edit/training-edit.module').then(m => m.TrainingEditPageModule)
  }
  ,
  {
    path: 'training-details/:id',
    loadChildren: () => import('./treinos/training-details/training-details.module').then(m => m.TrainingDetailsPageModule)
  },
    {
    path: 'athlete-registration',
    loadChildren: () => import('./components/athlete-registration/athlete-registration.module').then(m => m.AthleteRegistrationPageModule)
  },
    {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
