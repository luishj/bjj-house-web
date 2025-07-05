import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'treinos',
        loadChildren: () =>
          import('../treinos/treinos.module').then((m) => m.TreinosPageModule),
      },
      {
        path: 'campeonatos',
        loadChildren: () =>
          import('../campeonatos/campeonatos.module').then((m) => m.CampeonatosPageModule),
      },
      {
        path: 'academias',
        loadChildren: () =>
          import('../academias/academias.module').then((m) => m.AcademiasPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/treinos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/treinos',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
