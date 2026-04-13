import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  
  private readonly API = 'http://localhost:8080/veiculos';

  constructor(private http: HttpClient) {}

  criar(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.API, veiculo);
  }

  listar(filtros?: any): Observable<Veiculo[]> {
    let params = new HttpParams();

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
          params = params.set(key, filtros[key]);
        }
      });
    }

    return this.http.get<Veiculo[]>(this.API, { params });
  }

  buscarPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.API}/${id}`);
  }

  buscarComFiltros(filtros: any) {
    return this.http.get<any[]>(this.API, {
      params: filtros
    });
  }

  atualizar(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.API}/${id}`, veiculo);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
