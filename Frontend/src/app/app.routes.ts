import { Routes } from '@angular/router';
import { Album } from './models/Album.models';
import { FormComponent } from './Artista/form/form.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomeComponent),
  },
  //generos
  {
    path: 'generos',
    loadComponent: () => import('./Genero/genero-list/genero-list.component').then(m => m.GeneroListComponent),
  },
  {
    path: 'generos/create',
    loadComponent: () => import('./Genero/genero-form/genero-form.component').then(m => m.GeneroFormComponent),
  },
  {
    path: 'generos/:id/genero',
    loadComponent: () => import('./Genero/genero-detail/genero-detail.component').then(m => m.GeneroDetailComponent),
  },
  {
    path: 'generos/update/:id',
    loadComponent: () => import('./Genero/genero-form/genero-form.component').then(m => m.GeneroFormComponent),
  },
  {
    path: 'generos/selected/:id',
    loadComponent: () => import('./Genero/genero-select/genero-select.component').then(m => m.GeneroSelectComponent),
  },
  //artistas
  {
    path: 'artistas',
    loadComponent: () => import('./Artista/artista-list/artista-list.component').then(m => m.ArtistaListComponent),
  },
  {
    path: 'artistas/create',
    loadComponent: () => import('./Artista/form/form.component').then(m => m.FormComponent),
  },
  {
    path: 'artistas/:id/artista',
    loadComponent: () => import('./Artista/artista-detail/artista-detail.component').then(m => m.ArtistaDetailComponent),
  },
  {
    path: 'artistas/update/:id',
    loadComponent: () => import('./Artista/form/form.component').then(m => m.FormComponent),
  },
  //albums
  {
    path: 'albums/create/:idArtista',
    loadComponent: () => import('./Album/album-form/album-form.component').then(m => m.AlbumFormComponent),
  },
  {
    path: 'albums',
    loadComponent: () => import('./Album/album-list/album-list.component').then(m => m.AlbumListComponent),
  },
  {
    path: 'albums/:id/album-detail',
    loadComponent: () => import('./Album/album-detail/album-detail.component').then(m => m.AlbumDetailComponent),
  },
  {
    path: 'albums/update/:id',
    loadComponent: () => import('./Album/album-form/album-form.component').then(m => m.AlbumFormComponent),
  },

  //canciones
  {
    path: 'canciones',
    loadComponent: () => import('./Canciones/canciones-list/canciones-list.component').then(m => m.CancionesListComponent),
  },
  {
    path: 'canciones/create/:idAlbum',
    loadComponent: () => import('./Canciones/canciones-form/canciones-form.component').then(m => m.CancionesFormComponent),
  },
  {
    path: 'canciones/:id/canciones-detail',
    loadComponent: () => import('./Canciones/canciones-detail/canciones-detail.component').then(m => m.CancionesDetailComponent)
  },
  {
    path: 'canciones/update/:id',
    loadComponent: () => import('./Canciones/canciones-form/canciones-form.component').then(m => m.CancionesFormComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];