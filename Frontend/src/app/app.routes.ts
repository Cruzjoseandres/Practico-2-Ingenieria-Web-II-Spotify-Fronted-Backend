import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomeComponent),
  },
  {
    path: 'generos',
    loadComponent: () => import('./Genero/genero-list/genero-list.component').then(m => m.GeneroListComponent),
  },
  {
    path: 'generos/create',
    loadComponent: () => import('./Genero/genero-form/genero-form.component').then(m => m.GeneroFormComponent),
  },
  {
    path: 'artistas',
    loadComponent: () => import('./Artista/artista-list/artista-list.component').then(m => m.ArtistaListComponent),
  },
  {
    path: 'artistas/create',
    loadComponent: () => import('./Artista/form/form.component').then(m => m.FormComponent),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];