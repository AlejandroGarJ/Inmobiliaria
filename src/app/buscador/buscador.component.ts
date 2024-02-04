import { Component, EventEmitter, Output } from '@angular/core';


interface Parametros{

  ndormitorios:any;
  tipo:any,
  zona:any,
  extras:any;
  precioMin:any;
  precioMax:any;
  [key: string]: any; // Firma de índice para permitir la indexación por cadena
}


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {

  @Output() parametrosCambiados = new EventEmitter<any>();


  parametros: Parametros = {
    ndormitorios: "Escoge dormitorios",
    tipo: "Escoge tipo",
    zona: "Escoge zona",
    extras: "Escoge extras",
    precioMin: 0,
    precioMax:1000
  };
  

  cambiarPrecioMaximo() {
    // Actualizar el precio máximo automáticamente cuando el precio mínimo cambie
    this.parametros.precioMax = Math.max(this.parametros.precioMin, this.parametros.precioMax);
  }


  enviarParametrosAlPadre() {
    this.cambiarPrecioMaximo();
    const propiedadesExcluidas = /^Escoge/;
  
    const resultadoArray = Object.entries(this.parametros)
      .filter(([clave, valor]) => !propiedadesExcluidas.test(valor))
      .map(([clave, valor]) => ({ clave, valor }));
  
   
  
    this.parametrosCambiados.emit({ resultadoArray });
  }
}
