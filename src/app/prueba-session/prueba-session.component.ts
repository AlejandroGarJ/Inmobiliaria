import { Component } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';

@Component({
  selector: 'app-prueba-session',
  templateUrl: './prueba-session.component.html',
  styleUrl: './prueba-session.component.css'
})
export class PruebaSESSIONComponent {

  constructor(private dataVivienda:DataViviendasService){}


  onInit(){

    sessionStorage.setItem("usuario","pepito");

    alert(sessionStorage.getItem('usuario'));
  }
}
