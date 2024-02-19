import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import{ViviendaAAnadir}from './anadir/anadir.component';


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

  //Metodos paginacion:

  obtenerCantidadViviendas(){
    return this.http.get(`${this.URL}obtenerCantidadViviendas.php`);
  }

  obtenerViviendasPag(indiceIni: number, itemsPorPag: number,parametrosBusqueda:any=null): Observable<any> {

    
    const parametros = { indiceIni: indiceIni, itemsPorPag: itemsPorPag, parametrosBusqueda:parametrosBusqueda };
    return this.http.post(`${this.URL}obtenerViviendasPag.php`, parametros) as Observable<any>;
  }
  

  comprobarUsuario(nombreUsuario: any=null, contrasena: any=null): Observable<any> {

    if(nombreUsuario == null){//Si no ha completado el nombre cogera el nombre que hubiese antes que si no sera ""
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

  //CRUD VIVIENDA

 crearVivienda(vivienda:ViviendaAAnadir){

  console.log(JSON.stringify(vivienda));

  return this.http.post(`${this.URL}crearVivienda.php`, JSON.stringify(vivienda)) as Observable<any>;

 }

  borrarVivienda(idVivienda:String): Observable<any>{
    
    return this.http.post(`${this.URL}borrarVivienda.php`, JSON.stringify(idVivienda)) as Observable<any>;
  }

  

  modificarVivienda(vivienda:any):Observable<any>{

    return this.http.post(`${this.URL}modificarVivienda.php`, JSON.stringify(vivienda)) as Observable<any>;
  }

  obtenerFotos(idVivienda:number):Observable<any>{

    return this.http.post(`${this.URL}obtenerImagenes.php`,idVivienda) as Observable<any>;
  }


 
  guardarImagenes(listaImagenesFile:File[],id:any=null){

   
    const formData = new FormData();
   
    if (id !== null) {
      formData.append('id', id.toString());
    }
    
    
    // Agregar cada imagen al FormData
    for (let i = 0; i < listaImagenesFile.length; i++) {
      formData.append('imagenes[]', listaImagenesFile[i]);//Se pasan las imagenes a un formato binario
    }
    
    console.log(formData);
    
    return this.http.post(`${this.URL}guardarImagenes.php`,formData) as Observable<any>;
    
  }



  obtenerArchivoImagenes(idVivienda:number):Observable<any>{

    return this.http.post(`${this.URL}obtenerArchivoImagenes.php`,idVivienda) as Observable<any>;
  }


  borrarImagen(imagen:string,id:number):Observable<any>{

    const borrarImagen ={imagen:imagen, id:id};
    return this.http.post(`${this.URL}borrarImagen.php`,borrarImagen) as Observable<any>;

  }



  redireccionar(){
    this.router.navigate(['/login']);
   
  }

}
