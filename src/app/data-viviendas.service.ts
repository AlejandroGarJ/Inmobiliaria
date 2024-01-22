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

  

  comprobarUsuario(nombreUsuario: any=null, contrasena: any=null): Observable<any> {

    if(nombreUsuario == null){
      nombreUsuario=sessionStorage.getItem('nombreUsuario');
      contrasena=sessionStorage.getItem('contrasena');
    }else{
      sessionStorage.setItem('nombreUsuario',nombreUsuario);
      sessionStorage.setItem('contrasena',contrasena);
    }
    const usuario = {
      nombre: nombreUsuario,
      contrasena: contrasena
    };

    

    
    return this.http.post(`${this.URL}comprobarUsuarioLogin.php`, JSON.stringify(usuario)) as Observable<any>;
  }
  



 
  crearUsuario(nombreUsuario:String,contrasena:String): Observable<any>{
    const usuarioNuevo = { nombre: nombreUsuario, contrasena: contrasena };
    return this.http.post(`${this.URL}crearUsuario.php`, JSON.stringify(usuarioNuevo)) as Observable<any>;
  }

  obtenerUsuarios() {
    return this.http.get(`${this.URL}obtenerUsuarios.php`);
  }
 
  
  borrarUsuario(nombreUsuario:String): Observable<any>{
    
    return this.http.post(`${this.URL}borrarUsuario.php`, JSON.stringify(nombreUsuario)) as Observable<any>;
  }

  modificarUsuario(nombreUsuario:String,contrasena:String,id_usuario:String,contraIgual:String): Observable<any>{
    const usuarioNuevo = { nombre: nombreUsuario, contrasena: contrasena, id_usuario: id_usuario, contraIgual:contraIgual};
    return this.http.post(`${this.URL}modificarUsuario.php`, JSON.stringify(usuarioNuevo)) as Observable<any>;
  }

  redireccionar(){
    this.router.navigate(['/login']);
   
  }

}
