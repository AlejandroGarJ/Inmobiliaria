import { Component, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataViviendasService } from './data-viviendas.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Inmobiliaria';
  nombreUsuario="";
  contrasena="";
  
 usuarioCorrecto=false
 esAdmin=false;

 fechaUltimaSession="";

estaEnViviendas=false; 

  constructor(private cookieService:CookieService, private dataViviendasServ:DataViviendasService, private router:Router){

  
  }



  ngOnInit() {
     
    this.router.events.subscribe(event => {
      //Si cambia la url (cambia de ruta o de pagina)
      if (event instanceof NavigationEnd) {
       let ruta = window.location.href.split('/')[window.location.href.split('/').length-1];

       const nombreUsuarioFromStorage = sessionStorage.getItem('nombreUsuario');
       this.nombreUsuario = nombreUsuarioFromStorage !== null ? nombreUsuarioFromStorage : '';
 
       const contrasenaFromStorage = sessionStorage.getItem('contrasena');
       this.contrasena = contrasenaFromStorage !== null ? contrasenaFromStorage : '';
       
       if(ruta != 'login')this.usuarioCorrecto = true;
       else this.usuarioCorrecto = false;

       if(ruta=='viviendas'){
        this.estaEnViviendas=true;
       }else this.estaEnViviendas=false;

       if(sessionStorage.getItem("esAdmin")=="si")this.esAdmin=true;
       else this.esAdmin=false;

       if(this.cookieService.get('ultimaSesion')) this.fechaUltimaSession="Anterior conexion: "+this.cookieService.get('ultimaSesion');
    
      }
    });

  }

  cerrarSesion(){

    

    if(sessionStorage.getItem('guardarUsuario')=='false'){
      sessionStorage.removeItem("nombreUsuario");
      sessionStorage.removeItem("contrasena");

    }

    this.router.navigate(['login']);

    this.cookieService.set('ultimaSesion',this.cookieService.get('sesionActual'));
    
    
  }


 





  



   






}
