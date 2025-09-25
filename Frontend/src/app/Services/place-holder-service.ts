import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  private _http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000'

  //generos
  getAllGeneros<T>(): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/generos/`);
  }

  updateGenero(id: number, data: { nombre: string }): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/generos/${id}`, data);
  }

  createGenero(data: { nombre: string }): Observable<any> {
    return this._http.post(`${this.baseUrl}/generos/`, data);
  }

  getGeneroById<T>(id: number): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/generos/${id}/genero`);
  }

  getArtistasByGeneroId<T>(generoId: number): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/artistasGenero/${generoId}/artistasConGeneros`);
  }

  deleteGenero(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/generos/${id}/delete`);
  }


  //artistas
  getAllArtistas<T>(): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/artistas/`);
  }

  createArtista(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/artistas/`, formData);
  }

  updateArtista(id: number, formData: FormData): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/artistas/${id}/update`, formData);
  }

  getArtistaById<T>(id: number): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/artistas/${id}/artista`);
  }

  deleteArtista(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/artistas/${id}/delete`);
  }


  //albums
  createAlbum(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/albums/`, formData);
  }

  updateAlbum(id: number, formData: FormData): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/albums/${id}/update`, formData);
  }


  getAlbumsByArtistaId<T>(artistaId: number): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/albums/${artistaId}/artistas`);
  }

  getAlbumById<T>(id: number): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/albums/${id}/album`);
  }

  getAllAlbums<T>(): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/albums/`);
  }

  deleteAlbum(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/albums/${id}/delete`);
  }



  //canciones

  getAllCanciones<T>(): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/canciones/`);
  }
  getCancionesByAlbumId<T>(albumId: number): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/canciones/${albumId}/albums`);
  }

  createCancion(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/canciones/`, formData);
  }

  getCancionesById<T>(id: number): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/canciones/${id}/cancion`);
  }

  updateCancion(id: number, formData: FormData): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/canciones/${id}/update`, formData);
  }

  deleteCancion(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/canciones/${id}/delete`);
  }

  //artistagenero
  addArtistasToGenero(idGenero: number, idArtistas: number[]) {
  return this._http.post(`${this.baseUrl}/artistasGenero/generos/${idGenero}/artistas`,{ idArtistas });
}
  getArtistasNotInGenero<T>(idGenero: number): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/artistasGenero/generos/${idGenero}/artistas-disponibles`);
  }



  //search
  globalSearch(q: string) {
  return this._http.get<any>(`http://localhost:3000/search/search?q=${encodeURIComponent(q)}`);
}

}
