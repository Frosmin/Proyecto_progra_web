import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tablero } from '../utils/TableroTypes';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTableros(): Observable<Tablero[]> {
    return this.http.get<Tablero[]>('http://localhost:8080/api/tableros');
  }
  getTablero(id: number): Observable<Tablero> {
    return this.http.get<Tablero>(`http://localhost:8080/api/tablero/${id}`);
  }
}
