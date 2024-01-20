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
  
  usuarioCorrecto=false;

  constructor(private cookieService:CookieService, private dataViviendasServ:DataViviendasService, private router:Router){

  
  }



  ngOnInit() {

    this.nombreUsuario= JSON.parse(this.cookieService.get('Usuario')).nombre;
    this.contrasena= JSON.parse(this.cookieService.get('Usuario')).contrasena;
     
    this.dataViviendasServ.comprobarUsuario(this.nombreUsuario,this.contrasena).subscribe(

      response => {
        
       
        if(response=="contraseñaIncorrecta") this.router.navigate(['login']);
        if(response=="usuarioIncorrecto")this.router.navigate(['login']);
       
        if(response=="correcto") this.usuarioCorrecto=true;
        

      },
      error => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Consulta la consola para más detalles.');
        console.error('Detalles del error:', error instanceof ErrorEvent ? error.error : error);
      }
    );


    
     
  }


 





  



   






}
