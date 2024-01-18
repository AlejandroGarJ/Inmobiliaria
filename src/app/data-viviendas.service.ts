import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataViviendasService {

  URL = "http://localhost/InmobiliariaBack/";

  constructor(private http:HttpClient) { }

  obtenerViviendas() {
    return this.http.get(`${this.URL}obtenerViviendas.php`);
  }
}
