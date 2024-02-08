import { Component, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataViviendasService } from '../data-viviendas.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  

  nombreUsuario:string="";
  contrasena:string="";

  mensajeErrorC="";
  mensajeErrorU="";
  
  

  ngOnInit(){

    const nombreUsuarioFromStorage = sessionStorage.getItem('nombreUsuario');
    this.nombreUsuario = nombreUsuarioFromStorage !== null ? nombreUsuarioFromStorage : '';

    const contrasenaFromStorage = sessionStorage.getItem('contrasena');
    this.contrasena = contrasenaFromStorage !== null ? contrasenaFromStorage : '';

  }

  constructor(private cookieService:CookieService, private dataVivienda:DataViviendasService,private route:Router){}

  guardarUsuario(){

    this.mensajeErrorC="";
    this.mensajeErrorU="";

    const checkboxElement = document.getElementById('exampleCheck1') as HTMLInputElement;

    if(checkboxElement.checked){
      sessionStorage.setItem("guardarUsuario","true");//Para cuando cierre sesion que se guarden o no 
    }else{
      sessionStorage.setItem("guardarUsuario","false");
    }
    this.dataVivienda.comprobarUsuario(this.nombreUsuario,this.contrasena).subscribe(

      response => {
        
       
        if(response=="contraseñaIncorrecta") this.mensajeErrorC="Contraseña incorrecta";
        if(response=="usuarioIncorrecto") this.mensajeErrorU="Usuario incorrecto";
        if(this.contrasena=="") this.mensajeErrorC="Introduce una contraseña";
        if(this.nombreUsuario=="") this.mensajeErrorU="Introduce un usuario";

        if(response == "correcto1") sessionStorage.setItem("esAdmin","si");
        else sessionStorage.setItem("esAdmin","no");
        
        //Si usuario y password correctos...
        if(response=="correcto" || response=="correcto1"){
          this.route.navigate(['viviendas']);

          const fechaActual = new Date();

          const dia = fechaActual.getDate();
          const mes = fechaActual.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
          const anio = fechaActual.getFullYear();
          const horas = fechaActual.getHours();
          const minutos = fechaActual.getMinutes();
          const segundos = fechaActual.getSeconds();
    
          const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

     
          this.cookieService.set("sesionActual",fechaFormateada);
          
        }
       

      },
      error => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Consulta la consola para más detalles.');
        console.error('Detalles del error:', error instanceof ErrorEvent ? error.error : error);
      }
    );
  }

  
  



}
