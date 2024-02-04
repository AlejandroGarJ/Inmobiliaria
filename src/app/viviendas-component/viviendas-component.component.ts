import { Component, OnInit } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';


//Declarar estructura de Vivienda
interface Vivienda {
  id: any;
  tipo: any;
  zona: any;
  direccion: any;
  ndormitorios: any;
  tamano: any;
  extras: any;
  precio: any;
  observaciones: any;
  fecha_anuncio: any;
}






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
  
  viviendaAModificar:Vivienda={} as Vivienda;//Porque no le doy valor inicial
  mostrarVentanaEmergente=false;

  columnasVivienda: (keyof Vivienda)[] = ['id', 'tipo', 'zona', 'direccion', 'ndormitorios', 'tamano', 'extras', 'precio', 'observaciones', 'fecha_anuncio'];
  

  usarVentanaEmergente(vivienda:any=null){
    this.viviendaAModificar = { ...vivienda };
    if(this.mostrarVentanaEmergente==false)this.mostrarVentanaEmergente=true;
    else this.mostrarVentanaEmergente=false;
  }

  recibirParametrosDelHijo(nuevosParametros: any) {
    const arrayResultado = nuevosParametros.resultadoArray;
    console.log(arrayResultado);
    this.obtenerViviendasPag(arrayResultado);
  }
  


  
  modificarVivienda(){

    this.usarVentanaEmergente(this.viviendaAModificar);
    
    



    this.dataViviendas.modificarVivienda(this.viviendaAModificar).subscribe(
      result => {
    
      
     
      this.obtenerViviendasPag();

      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  }
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

  obtenerViviendasPag(parametrosBusqueda:any=null){

    this.dataViviendas.obtenerViviendasPag(this.indiceIni,(this.indiceIni-1)+this.itemsPorPag,parametrosBusqueda).subscribe(
      result => {
    
       this.viviendas=result;
        
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


  borrarVivienda(id:String){
    this.dataViviendas.borrarVivienda(id).subscribe(
      result => {
    
        
        this.obtenerViviendasPag();

      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  }
}
