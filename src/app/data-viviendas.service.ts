import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataViviendasService {

  URL = "http://localhost/InmobiliariaBack/";

  private contrasenaCorrectaSubject = new BehaviorSubject<boolean>(false);


  constructor(private http:HttpClient, private router:Router) { }

  obtenerViviendas() {
    return this.http.get(`${this.URL}obtenerViviendas.php`);
  }

  

  comprobarUsuario(nombreUsuario: string, contrasena: string): Observable<any> {
    const usuario = {
      nombre: nombreUsuario,
      contrasena: contrasena
    };

    
    return this.http.post(`${this.URL}comprobarUsuarioLogin.php`, JSON.stringify(usuario)) as Observable<any>;
  }

 

 

  redireccionar(){
    this.router.navigate(['/login']);
   
  }

}
