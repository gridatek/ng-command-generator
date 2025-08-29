import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home2',
    loadComponent: () => import('./home/home2').then((m) => m.Home2),
  },
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
