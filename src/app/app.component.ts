import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataViviendasService } from './data-viviendas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Inmobiliaria';
  usuario="";
  contrasena="";
  constructor(private cookieService:CookieService, private dataViviendasServ:DataViviendasService){}

   ngOnInit(){

    this.usuario= JSON.parse(this.cookieService.get('Usuario')).nombre;
    this.contrasena= JSON.parse(this.cookieService.get('Usuario')).contrasena;

    this.dataViviendasServ.comprobarUsuario(this.usuario,this.contrasena);



   }

}
