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

  parametrosBusqueda:any=null;

  imagenesVivienda:any;
  seHaEscogidoAlgunParametroBusqueda=false;
  
  viviendaAModificar:Vivienda={} as Vivienda;//Porque no le doy valor inicial
  mostrarVentanaEmergente=false;
  mostrarVentanaEmergente2=false;

  columnasVivienda: (keyof Vivienda)[] = ['id', 'tipo', 'zona', 'direccion', 'ndormitorios', 'tamano', 'extras', 'precio', 'observaciones', 'fecha_anuncio'];
  
 // tu arreglo de imágenes
  indiceImagenVisible = 0;

  mostrarSiguienteImagen() {
    this.indiceImagenVisible = (this.indiceImagenVisible + 1) % this.imagenesVivienda.length;
  }

  mostrarImagenAnterior() {
    this.indiceImagenVisible = (this.indiceImagenVisible - 1 + this.imagenesVivienda.length) % this.imagenesVivienda.length;
  }

  usarVentanaEmergente(vivienda:any=null){
    this.viviendaAModificar = { ...vivienda };
    if(this.mostrarVentanaEmergente==false)this.mostrarVentanaEmergente=true;
    else this.mostrarVentanaEmergente=false;
  }

  //Metodos para la ventana emergente de las imagenes a modificar
  abrirVentanaEmergente2(id:number){
    
    this.mostrarVentanaEmergente2=true;
    this.obtenerImagenes(id);
  }
  cerrarVentanaEmergente2(){
    this.mostrarVentanaEmergente2=false;
  }
  
  obtenerImagenes(id:number){

    this.dataViviendas.obtenerFotos(id).subscribe(
      result => {
        
      this.imagenesVivienda=result;
      console.log(this.imagenesVivienda);
      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  
  }

  //Recibe objeto de tipo parametro del componente hijo(buscador-component), esta funcion es llamada cada vez que se modifica un parametro de busqueda
  recibirParametrosDelHijo(nuevosParametros: any) {
    this.parametrosBusqueda = nuevosParametros.resultadoArray;
   
    this.obtenerViviendasPag();
  }
  

  
  modificarVivienda(){
    
    this.usarVentanaEmergente(this.viviendaAModificar);
    
    //Es imposible que la update de fallo por lo que no se gestionan
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
    
    

    
  }

 


  

  obtenerViviendasPag(){

    this.dataViviendas.obtenerViviendasPag(this.indiceIni,this.itemsPorPag,this.parametrosBusqueda).subscribe(
      result => {
        
      
       this.viviendas=result.registros;
       
       console.log(result.consulta);


        this.cantidadViviendas=result.nViviendas;
      
      this.generarNPaginas();
        
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
