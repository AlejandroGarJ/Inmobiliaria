import { Component, EventEmitter, Output } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';

export interface ViviendaAAnadir{

  tipo:string,
  zona:string,
  direccion:string,
  ndormitorios:string,
  tamano:number,
  extras:String[],
  precio:number,
  observaciones:string

}


@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrl: './anadir.component.css'
})
export class AnadirComponent {

constructor(private viviendaData:DataViviendasService){}
  viviendaAAnadir:ViviendaAAnadir={

    tipo:"Escoge tipo",
    zona:"Escoge zona",
    direccion:"",
    ndormitorios:"Escoge n dormitorios",
    tamano:0,
    extras:[],
    precio:0,
    observaciones:"",
    
  };

  listaImagenesFile:File[]=[];
  listaNombreImagenes:string[]=[];

  mostrarVentanaEmergente=false;
  mensajeEmergente:string="Faltan campos por rellenar";
  mostrarExtras=false;

  @Output() seCreoVivienda = new EventEmitter<void>();

  crearVivienda(){
    

    /*Si pasa la validacion de datos se creara la vivienda y una vez creada se realizara la insercion debida de las imagenes
    tanto en la base de datos como los propios archivos del servidor*/

    if(this.validacionDeDatos()==true){

      this.viviendaData.crearVivienda(this.viviendaAAnadir).subscribe(
        result => {
          
        if(result==true){
          this.usarVentanaEmergente();
          if(this.listaImagenesFile.length>0) this.añadirImagenes();
         
          this.mensajeEmergente="Se creo con exito";
          this.seCreoVivienda.emit();

        }

        },
        error => {
          console.error('Error al obtener viviendas:', error);
        }
      );
    }
    else this.mostrarVentanaEmergente=true;
  }


  añadirImagenes(){
   

    this.viviendaData.guardarImagenes(this.listaImagenesFile).subscribe(
      (response: any) => {
        console.log( response);
      
      },
      (error) => {
        console.error('Error al enviar imágenes:', error);
        // Aquí puedes manejar cualquier error que ocurra durante la solicitud HTTP
      }
    );


  }




  validacionDeDatos(){

    let datosCorrectos:boolean=true;

    if(this.viviendaAAnadir.tipo=="Escoge tipo") datosCorrectos=false;
    if(this.viviendaAAnadir.zona=="Escoge zona")datosCorrectos=false;
    if(this.viviendaAAnadir.ndormitorios=="Escoge n dormitorios")datosCorrectos=false;
    
    if(this.viviendaAAnadir.tamano==0)datosCorrectos=false;
    if(this.viviendaAAnadir.precio==0)datosCorrectos=false;
    if(this.viviendaAAnadir.direccion=="")datosCorrectos=false; 
    if(this.viviendaAAnadir.extras.length===0)datosCorrectos=false;
    return datosCorrectos;
  }

  usarVentanaEmergente(){
    if(this.mostrarVentanaEmergente==false)this.mostrarVentanaEmergente=true;
    else {
      this.mostrarVentanaEmergente=false;
      this.mensajeEmergente="Faltan campos por rellenar";
    }
  }


  usarExtras(){

    if(this.mostrarExtras==false)this.mostrarExtras=true;
    else this.mostrarExtras=false;
  }



  onFileChange(event:any){
    this.listaImagenesFile = event.target.files;


    for(let i=0;i<this.listaImagenesFile.length;i++){

      this.listaNombreImagenes.push(this.listaImagenesFile[i].name);//Guardar el nombre de las imagenes

  
    }
    
  }

 

}
