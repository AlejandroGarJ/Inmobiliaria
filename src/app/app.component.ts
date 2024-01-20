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

  constructor(private cookieService:CookieService, private dataViviendasServ:DataViviendasService, private router:Router){

  
  }



  ngOnInit() {

  


    
     
  }


 





  



   






}
