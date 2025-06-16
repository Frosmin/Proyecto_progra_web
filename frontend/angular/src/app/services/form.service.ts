import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  crearFormulario(formulario: any): Observable<any> {
    return this.http.post(`${this.apiURL}/formulario`, formulario);
  }
  
  obtenerFormularios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/formulario`);
  }
  
  obtenerFormularioPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/formulario/${id}`);
  }
}