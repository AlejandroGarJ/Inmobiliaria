import { Component, OnInit } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';

@Component({
  selector: 'app-viviendas-component',
  templateUrl: './viviendas-component.component.html',
  styleUrl: './viviendas-component.component.css'
})
export class ViviendasComponentComponent implements OnInit {

  viviendas : any;
  columnas: any;
  vivienda = {

    id:null,
    tipo:null,
    zona:null,
    nDormitorios:null,
    precio:null,
    tamano:null,
    extras:null,
    observaciones:null,
    fecha_anuncio:null
  }
  constructor(private dataViviendas:DataViviendasService){}


  ngOnInit(){
    this.obtenerViviendas();
  }

  obtenerViviendas(){
    this.dataViviendas.obtenerViviendas().subscribe(
      result=> this.viviendas=result

      
    );

    this.columnas = Object.keys(this.viviendas[0]);
  }


  obtenerColumnas(data: any[]): string[] {
    if (data && data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }

}
