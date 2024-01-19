import { HttpClient, HttpHeaders } from '@angular/common/http';
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



  comprobarUsuario(nombreUsuario: string, contrasena: string) {
    const usuario = {
      nombre: nombreUsuario,
      contrasena: contrasena
    };
  
    this.http.post(`${this.URL}comprobarUsuarioLogin.php`, JSON.stringify(usuario)).subscribe(
      (datos: any) => {
        if (datos.resultado === 'OK') {
          alert("Contraseña correcta");
        } else {
          alert('Contraseña incorrecta');
        }
        
      },
      error => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Consulta la consola para más detalles.');
        console.error('Detalles del error:', error instanceof ErrorEvent ? error.error : error);
      
      }
    );
  }


  mostrarError(){
    console.log("Error fatal");
  }

}
