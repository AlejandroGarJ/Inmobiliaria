import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  nombreUsuario:string="";
  contrasena:string="";

  ngOnInit(){

    this.nombreUsuario= JSON.parse(this.cookieService.get('Usuario')).nombre;
    this.contrasena= JSON.parse(this.cookieService.get('Usuario')).contrasena;
  }

  constructor(private cookieService:CookieService){}

  guardarUsuario(){


    const usuario = {
      nombre: this.nombreUsuario,
      contrasena: this.contrasena
    };

    this.cookieService.set('Usuario', JSON.stringify(usuario));
  }


}
