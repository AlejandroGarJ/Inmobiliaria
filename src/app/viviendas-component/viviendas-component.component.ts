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
  
  cantidadViviendas:any=0;
  nPaginas: number[]=[];
  itemsPorPag=2;
  paginaActual=1;
  indiceIni=0;

  constructor(private dataViviendas:DataViviendasService){

    
  }

  
  ngOnInit(){
    this.obtenerViviendasPag();
    this.obtenerNViviendas();
   
    
  }

 

  obtenerNViviendas(){
    this.dataViviendas.obtenerCantidadViviendas().subscribe(
      result => {
    
      
      this.cantidadViviendas=result;
      
      this.generarNPaginas();

      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  }

  obtenerViviendasPag(){

    this.dataViviendas.obtenerViviendasPag(this.indiceIni,(this.indiceIni-1)+this.itemsPorPag).subscribe(
      result => {
    
        this.viviendas = result;
        
        
      

      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  }

  generarNPaginas() {
    this.nPaginas = Array.from({ length: Math.ceil(this.cantidadViviendas / this.itemsPorPag) }, (_, index) => index + 1);
  }

  actualizarBotones(){

  if(this.itemsPorPag>0){
  this.generarNPaginas();
  this.indiceIni=0;
  
  this.obtenerViviendasPag();
  }
  }

  mostrarPagina(paginaEscogida:number){

    this.paginaActual=paginaEscogida;
    this.indiceIni=(this.paginaActual-1)*this.itemsPorPag;

  
    this.obtenerViviendasPag();
  }
}
