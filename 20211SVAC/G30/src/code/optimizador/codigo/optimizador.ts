import { Instruccion } from '../codigo/instruccion'
import { parse } from '../test'

export class Optimizador {
   
   listaInstrucciones: Array<Instruccion>;
   nuevasInstrucciones: Array<Instruccion>;
   reporteOptimizacion: Array<Optimizacion>;
   cadenaOptimizada: string;
   cadenaInicial: string;
   
   constructor(){
      this.cadenaOptimizada = '';
      this.cadenaInicial = '';
      this.listaInstrucciones = [];
      this.reporteOptimizacion = [];
      this.nuevasInstrucciones = [];
   }

   public addInstruccion(instruccion: Instruccion): void{
      this.listaInstrucciones.push(instruccion);
   }

   public optimizar(codigo:string){
      this.listaInstrucciones = [];

      // trayendo c3d del main
      this.cadenaOptimizada = '';
      console.log('codigo -Z', codigo);
      //metiendo el c3d al parser
      this.listaInstrucciones = parse(codigo);
      console.log(this.listaInstrucciones);

      // nuevalista.lenght = viejalista.lenght
      this.nuevasInstrucciones = this.listaInstrucciones;
      this.reglas6_16Header(this.listaInstrucciones);


      //paso el array a la cadena
      this.arrayCadena();
      console.log(this.reporteOptimizacion);
      return this.cadenaOptimizada;
   }

   private reglas6_16Header(array: Array<Instruccion>){
      
      let contador = 0;
      
      for (let instruccion of array){

         if (instruccion.getTipo().includes('header')) {
            // primero miro si es header, si es, lo meto de una a la cadena
            this.cadenaOptimizada += instruccion.cadena;
            this.cadenaOptimizada += '\n';            
         }

         if (instruccion.getTipo().includes('asignacion')) {
            if (instruccion.arg1 == '0' || instruccion.arg2 == '0' ) {
               if (instruccion.operador == '/' || instruccion.operador == '*') {
                  // si cumple con todas las condiciones de 15 y 16 
                  let regla;
                  if (instruccion.operador == '/') {
                     regla = '16';
                  } else {
                     regla = '15';
                  }

                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = 0;' 
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena));
               }
            }
         }

         contador++;
      }

   }

   private arrayCadena(){
      for (let linea of this.nuevasInstrucciones){
         this.cadenaOptimizada += linea.cadena + '\n';
      }
   }
   
}

export class Optimizacion {

   linea: number;
   regla: string;
   codigo: string;

   constructor(linea:number, regla:string, codigo:string){
      this.linea = linea;
      this.regla = regla;
      this.codigo = codigo;
   }


}