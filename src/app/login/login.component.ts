import { Component } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  nombreUsuario:string="";
  contrasena:string="";

 

  constructor(private dataViviendas:DataViviendasService){}






  comprobarUsuario(){
    
  }
}
