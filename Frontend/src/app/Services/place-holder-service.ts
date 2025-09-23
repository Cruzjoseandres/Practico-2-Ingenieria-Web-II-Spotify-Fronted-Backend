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







  getAllArtistas<T>(): Observable<T[]> {
    return this._http.get<T[]>(`${this.baseUrl}/artistas/`);
  }

  createArtista(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/artistas/`, formData);
  }







}
