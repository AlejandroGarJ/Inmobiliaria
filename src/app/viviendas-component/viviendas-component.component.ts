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
  
  

  usarVentanaEmergente(vivienda:any=null){
    this.viviendaAModificar = { ...vivienda };
   
    if(this.mostrarVentanaEmergente==false)this.mostrarVentanaEmergente=true;
    else this.mostrarVentanaEmergente=false;
  }


//borrar imagen de vivienda

borrarImagen(imagen:string,id:number){

  console.log(imagen+" "+id);

  this.dataViviendas.borrarImagen(imagen,id).subscribe(

    result => {
      
    if(result=true){

      this.abrirVentanaEmergente2(this.viviendaAModificar.id);
    }


    
    },
    error => {
      console.error('Error al obtener viviendas:', error);
    }
  );


}


listaImagenesFile:File[]=[];

onFileChange(event:any){
  this.listaImagenesFile = event.target.files;

  this.dataViviendas.guardarImagenes(this.listaImagenesFile,this.viviendaAModificar.id).subscribe(
    result => {
      
    this.abrirVentanaEmergente2(this.viviendaAModificar.id);

    },
    error => {
      console.error('Error al obtener viviendas:', error);
    }
  );
  
}






  imagenArchivo:any;
  //Metodos para la ventana emergente de las imagenes a modificar

  nombreImagenes:string[]=[];

  abrirVentanaEmergente2(id:number){
    
    this.mostrarVentanaEmergente2=true;
    
    this.viviendaAModificar.id=id;

    this.dataViviendas.obtenerArchivoImagenes(id).subscribe(
      result => {
        
      console.log("Resultado imiagenes: "+result);
        this.imagenArchivo=result['archivoImagenes'];
        this.nombreImagenes=result['nombreImagenes'];
      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );



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

  mostrarAnadir=false;
  mostrarAnadirComponent(){

    if(this.mostrarAnadir==false)this.mostrarAnadir=true;
    else this.mostrarAnadir=false;

  }




  //Recibe objeto de tipo parametro del componente hijo(buscador-component), esta funcion es llamada cada vez que se modifica un parametro de busqueda
  recibirParametrosDelHijo(nuevosParametros: any) {
    this.parametrosBusqueda = nuevosParametros.resultadoArray;
   
    this.obtenerViviendasPag();
  }
  

  
  modificarVivienda(){
    console.log(this.viviendaAModificar);
    this.usarVentanaEmergente(this.viviendaAModificar);
    
    
    //Es imposible que la update de fallo por lo que no se gestionan errores
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
