import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'muro-avisos',
    pathMatch: 'full',
  },
  {
    path: 'muro-avisos',
    loadComponent: () => import('./paginas/muro-avisos/muro-avisos.page').then( m => m.MuroAvisosPage)
  },
  {
    path: 'registro-publicacion',
    loadComponent: () => import('./paginas/registro-publicacion/registro-publicacion.page').then( m => m.RegistroPublicacionPage)
  },
];