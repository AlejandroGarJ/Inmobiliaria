import { Component } from '@angular/core';
import { DataViviendasService } from '../data-viviendas.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrl: './gestionar-usuarios.component.css'
})
export class GestionarUsuariosComponent {
  nombreUsuario:String="";
  contrasena:any=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  mensajeErrorU="";
  mensajeErrorC="";
  mensajeEmergente="";

  usuarios:any;
  usuariosAux:any;

  mostrarVentanaEmergente=false;
  constructor(private dataService:DataViviendasService){}

  ngOnInit(){
    this.obtenerUsuarios();
    this.nombreUsuario="";
    
    
  }

  comprobarFormato(){



    this.mensajeErrorU="";
    this.mensajeErrorC="";
    let formatoCorrecto=true;

    if(this.nombreUsuario==""){
      this.mensajeErrorU="Introduce un usuario"
      formatoCorrecto=false;
    }

    if(this.contrasena.length<4){
      this.mensajeErrorC="La contraseña tiene que tener mínimo 4 carácteres";
      formatoCorrecto=false;
      if(this.contrasena==""){
        this.mensajeErrorC="Introduce una contrasena"
        
      } 
    }
   
    if(formatoCorrecto){

      this.dataService.crearUsuario(this.nombreUsuario, this.contrasena).subscribe(
        (respuesta) => {
          // Manejar la respuesta exitosa aquí
         if(respuesta=='creado') {
          this.obtenerUsuarios();
          this.mensajeEmergente="Se creo con éxito"
          this.contrasena=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
         }
         if(respuesta=='existente') {
             
          this.mensajeEmergente="Ese usuario ya existe";
         }
         this.mostrarVentanaEmergente=true;
         this.ngOnInit();
        },
        (error) => {
          // Manejar el error aquí
          console.error(error);
        }
      );
    } 
  }

  cerrarVentanaEmergente(){
    this.mostrarVentanaEmergente=false;
  }

  obtenerUsuarios() {
    this.dataService.obtenerUsuarios().subscribe(
      result => {
        this.usuarios = JSON.parse(JSON.stringify(result));//Para que no se referencien a la misma direccion de memoria
        this.usuariosAux = JSON.parse(JSON.stringify(result));
      },
      error => {
        console.error('Error al obtener viviendas:', error);
      }
    );
  }

  borrarUsuario(usuario:String){

   

    this.dataService.borrarUsuario(usuario).subscribe(

      (respuesta)=>{
        
        if(respuesta=='ok')this.mostrarVentanaEmergente=true;
        this.mensajeEmergente="Usuario borrado con éxito";
        this.usuarios=[];
        this.obtenerUsuarios();

      },
      (error)=>{
        this.mensajeEmergente="No se pudo borrar";
        this.mostrarVentanaEmergente=true;
      }
    );
  }

  modificarUsuario(index:number){


 

    if(this.usuarios[index].id_usuario==this.usuariosAux[index].id_usuario && this.usuarios[index].password==this.usuariosAux[index].password){
      this.mostrarVentanaEmergente=true;
      this.mensajeEmergente="Modifica al menos un campo";
    }else{

      let contraIgual='no';
      if(this.usuarios[index].password==this.usuariosAux[index].password){
       contraIgual='si';
      }
    
      if(this.usuarios[index].password.length<4){
        this.mostrarVentanaEmergente=true;
        this.mensajeEmergente="La contraseña debe tener mínimo cuatro carácteres";
      }else{

          this.dataService.modificarUsuario(this.usuarios[index].id_usuario,this.usuarios[index].password,this.usuariosAux[index].id_usuario,contraIgual).subscribe(

            (respuesta) => {
              // Manejar la respuesta exitosa aquí
              if(respuesta=='ok'){
                this.obtenerUsuarios();
                this.mostrarVentanaEmergente=true;
                this.mensajeEmergente="Se modifico el usuario con éxito";
              }else{
                this.obtenerUsuarios();
                this.mostrarVentanaEmergente=true;
                this.mensajeEmergente="No se pudo modificar el usuario con éxito";
              }
              
            },
            (error) => {
              // Manejar el error aquí
              console.error('Error al modificar usuario', error);
            }
            
          );

      }
  }
  
}

}
