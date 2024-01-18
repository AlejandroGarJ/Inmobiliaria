import { Component, OnInit } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';

@Component({
  selector: 'app-viviendas-component',
  templateUrl: './viviendas-component.component.html',
  styleUrl: './viviendas-component.component.css'
})
export class ViviendasComponentComponent implements OnInit {

  viviendas : any;
  columnas:string[]=[];
  
  constructor(private dataViviendas:DataViviendasService){}

  
  ngOnInit(){
    this.obtenerViviendas();
   
  }

  obtenerViviendas() {
    this.dataViviendas.obtenerViviendas().subscribe(
      result => {
        this.viviendas = result;
        this.columnas = Object.keys(this.viviendas[0]);
      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  }
}
