import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [

  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'introduccion',
        loadComponent: () =>
          import('../introduccion/introduccion.page').then((m) => m.IntroduccionPage),
      },
      {
        path: 'terminos',
        loadComponent: () =>
          import('../terminos/terminos.page').then((m) => m.TerminosPage),
      },
      {
        path: 'documento',
        loadComponent: () =>
          import('../documento/documento.page').then((m) => m.DocumentoPage),
      },
      {
        path: '',
//        redirectTo: '/tabs/introduccion',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
//    redirectTo: '/tabs/introduccion',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },

];
