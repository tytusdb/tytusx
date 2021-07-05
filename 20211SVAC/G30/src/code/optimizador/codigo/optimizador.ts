import { Instruccion } from '../codigo/instruccion'
import { parse } from '../test'

export class Optimizador {

   listaInstrucciones: Array<Instruccion>;
   nuevasInstrucciones: Array<Instruccion>;
   public reporteOptimizacion: Array<Optimizacion>;
   cadenaOptimizada: string;
   cadenaInicial: string;
   asignacionesPrevias: Array<Instruccion>;

 
   constructor() {
      this.cadenaOptimizada = '';
      this.cadenaInicial = '';
      this.listaInstrucciones = [];
      this.reporteOptimizacion = [];
      this.nuevasInstrucciones = [];
      this.asignacionesPrevias = [];
   }

   public addInstruccion(instruccion: Instruccion): void {
      this.listaInstrucciones.push(instruccion);
   }

   public optimizar(codigo: string) {
      this.listaInstrucciones = [];

      // trayendo c3d del main
      this.cadenaOptimizada = '';
      console.log('cadenan1 ', this.cadenaOptimizada);
      console.log('codigo -Z', codigo);
      //metiendo el c3d al parser
      this.listaInstrucciones = parse(codigo);
      console.log(this.listaInstrucciones);

      // nuevalista.lenght = viejalista.lenght
      this.nuevasInstrucciones = this.listaInstrucciones;
      this.reglas6_16Header(this.listaInstrucciones);
      this.reglas3_4(this.listaInstrucciones);
      this.reglas1_2(this.listaInstrucciones);
    


      //paso el array a la cadena
      this.arrayCadena();
      console.log(this.reporteOptimizacion);
      return this.cadenaOptimizada;
   }

   public getReporte(): Array<Optimizacion>{
      console.log('geteando reporte');
      //console.log(this.reporteOptimizacion);
      return this.reporteOptimizacion;
   }

   private reglas6_16Header(array: Array<Instruccion>) {

      let contador = 0;

      for (let instruccion of array) {


         //DIVIDIDOS
         if (instruccion.operador == '/') {

            if (instruccion.arg1 == '0' || instruccion.arg2 == '0') {
               // si cumple con todas las condiciones de 16 
               let regla = '16';
               this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = 0;'
               this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
            }

            if (instruccion.arg2 == '1') {
               if (instruccion.arg1 == instruccion.resultado) {
                  let regla = '9';
                  this.nuevasInstrucciones[contador].cadena = '';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
               } else {
                  let regla = '13';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            }

         }
         // MULTIPLICADOS
         if (instruccion.operador == '*') {

            if (instruccion.arg1 == '0' || instruccion.arg2 == '0') {
               // si cumple con todas las condiciones de 15
               let regla = '15';
               this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = 0;'
               this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
            }

            if (instruccion.arg1 == '1') {
               if (instruccion.arg2 == instruccion.resultado) {
                  let regla = '8';
                  this.nuevasInstrucciones[contador].cadena = '';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
               } else {
                  let regla = '12';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg2 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }

            } else if (instruccion.arg2 == '1') {
               if (instruccion.arg1 == instruccion.resultado) {
                  let regla = '8';
                  this.nuevasInstrucciones[contador].cadena = '';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
               } else {
                  let regla = '12';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            }

            if (instruccion.arg1 == '2') {
               // si no es un  numero = es un temporal o un id. Si es un temp o un id, lo sumo.
               if (isNaN(parseInt(instruccion.arg2))) {
                  // si cumple con todas las condiciones de 14
                  let regla = '14';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg2 + ' + ' + instruccion.arg2 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            } else if (instruccion.arg2 == '2') {

               if (isNaN(parseInt(instruccion.arg1))) {
                  // si cumple con todas las condiciones de 14
                  let regla = '14';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ' + ' + instruccion.arg1 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            }

         }
         // MENOS
         if (instruccion.operador == '-') {

            if (instruccion.arg2 == '0') {
               if (instruccion.resultado == instruccion.arg1) {
                  let regla = '7';
                  this.nuevasInstrucciones[contador].cadena = '';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
               } else {
                  let regla = '11';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            }

         }
         // MAS
         if (instruccion.operador == '+') {

            if (instruccion.arg2 == '0') {
               if (instruccion.resultado == instruccion.arg1) {
                  let regla = '6';
                  this.nuevasInstrucciones[contador].cadena = '';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
               } else {
                  //console.log('regla 10!')
                  let regla = '10';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            } else if (instruccion.arg1 == '0') {
               if (instruccion.resultado == instruccion.arg2) {
                  let regla = '6';
                  this.nuevasInstrucciones[contador].cadena = '';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
               } else {
                  let regla = '10';
                  this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg2 + ';';
                  this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
               }
            }

         }
         //console.log('# ', contador);
         contador++;
      }

   }

   private reglas1_2(array: Array<Instruccion>) {
      let contador = 0;
      var regla1abierta = false;
      let eliminarabierto = false;

      for (let instruccion of array) {

         if (regla1abierta) {
            if (instruccion.getTipo() == 'etiqueta') {
               // si si es, quito regla 1
               regla1abierta = false;
               this.nuevasInstrucciones[contador].cadena = instruccion.cadena;
            } else {
               let regla = '1';
               this.nuevasInstrucciones[contador].cadena = '';
               this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
            }
         }

         if (instruccion.getTipo() == 'salto' && !regla1abierta) {
            if (!eliminarabierto) {
               regla1abierta = true;
               console.log('salto detectado');
               this.nuevasInstrucciones[contador].cadena = instruccion.cadena;
            } else {
               let regla = '2';
               this.nuevasInstrucciones[contador].cadena = '';
               this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
            }

         }

         if (instruccion.getTipo() == 'salto_condicional' && this.listaInstrucciones.length > (contador + 2)) {
            // ifs para ver si cumple con 2
            let coso = contador;
            if (this.listaInstrucciones[coso + 1].getTipo() == 'salto') {
               if (this.listaInstrucciones[coso + 2].getTipo() == 'etiqueta') {

                  // si la etiqueta if = a la etiqueta de después, cumple con #2
                  if (this.listaInstrucciones[contador + 2].cadena.includes(instruccion.resultado)) {

                     if (instruccion.operador == '<') {
                        this.nuevasInstrucciones[contador].operador = '>';
                     } else if (instruccion.operador == '>') {
                        this.nuevasInstrucciones[contador].operador = '<';
                     } else if (instruccion.operador == '==') {
                        this.nuevasInstrucciones[contador].operador = '!=';
                     } else if (instruccion.operador == '!=') {
                        this.nuevasInstrucciones[contador].operador = '==';
                     } else if (instruccion.operador == '<=') {
                        this.nuevasInstrucciones[contador].operador = '>=';
                     } else if (instruccion.operador == '>=') {
                        this.nuevasInstrucciones[contador].operador = '<=';
                     }

                     this.nuevasInstrucciones[contador].cadena = 'if ( ' + instruccion.arg1 + this.nuevasInstrucciones[contador].operador + instruccion.arg2 + ' ) ' + this.listaInstrucciones[coso + 1].cadena;
                     this.reporteOptimizacion.push(new Optimizacion(contador, '2', this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                     eliminarabierto = true;
                  }
               }
            }
         }


         contador++;
      }

      console.log('final');
      console.log(this.nuevasInstrucciones);
   }

   private reglas3_4(array: Array<Instruccion>) {
      let contador = 0;
      for (let instruccion of array) {
         if (instruccion.getTipo() == 'salto_condicional') {

            let arg1 = parseInt(instruccion.arg1);
            let arg2 = parseInt(instruccion.arg2);
            // si los dos son números, hago para las reglas 3 y 4
            if (!isNaN(arg1) && !isNaN(arg2)) {
               if (instruccion.operador == '==') {
                  if (arg1 == arg2) {
                     let regla = '3';
                     this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));

                  } else {
                     let regla = '4';
                     this.nuevasInstrucciones[contador].cadena = '';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                  }
               } else if (instruccion.operador == '!=') {
                  if (arg1 != arg2) {
                     let regla = '3';
                     this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));

                  } else {
                     let regla = '4';
                     this.nuevasInstrucciones[contador].cadena = '';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                  }
               } else if (instruccion.operador == '<=') {
                  if (arg1 <= arg2) {
                     let regla = '3';
                     this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));

                  } else {
                     let regla = '4';
                     this.nuevasInstrucciones[contador].cadena = '';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                  }
               } else if (instruccion.operador == '>=') {
                  if (arg1 >= arg2) {
                     let regla = '3';
                     this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));

                  } else {
                     let regla = '4';
                     this.nuevasInstrucciones[contador].cadena = '';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                  }
               } else if (instruccion.operador == '<') {
                  if (arg1 < arg2) {
                     let regla = '3';
                     this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));

                  } else {
                     let regla = '4';
                     this.nuevasInstrucciones[contador].cadena = '';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                  }
               } else if (instruccion.operador == '>') {
                  if (arg1 > arg2) {
                     let regla = '3';
                     this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));

                  } else {
                     let regla = '4';
                     this.nuevasInstrucciones[contador].cadena = '';
                     this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                  }
               }
            }

         }

         if (instruccion.getTipo() == 'etiqueta') {
            this.asignacionesPrevias.push(instruccion);
         }

         if (instruccion.getTipo() == 'asignacion') {
            // si es iwal transverso al previo, elimino este
            if (instruccion.operador == '') {
               let match = false;
               let cont2 = 0;
               // si es una asignación, miro si hay un H1 = H2, H2 = H1 antes.
               // si ya encontré un match, miro que ninguno de los dos se reasigne
               for (const iterator of this.asignacionesPrevias) {
                  if ((iterator.resultado == instruccion.arg1) && (iterator.arg1 == instruccion.resultado)) {
                     match = true;
                     console.log('match!')

                     let conti = 0;
                     for (const cosita of this.asignacionesPrevias) {
                        
                        if (conti > cont2) 
                        {  // si pasa después del contador en el que ando arriba
                           console.log(cosita.resultado, ' == ', instruccion.arg1);
                           if ( cosita.resultado == instruccion.arg1 || cosita.getTipo() == 'etiqueta') {
                              match = false;
                              console.log('2', cosita.resultado == instruccion.arg1 )
                              console.log(cosita.getTipo() == 'etiqueta')
                              console.log('match inverso :c')
                              return;
                              // si hay otra asignación o es una etiqueta, no hago nada
                           } 
                        }
                        conti++;
                     }

                     if (match) {
                        let regla = '5';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                     }
                  }
                  cont2++;
               }

               if (match) {
                  // 
               }

               this.asignacionesPrevias.push(instruccion);
            }
         }

         contador++;
      }
   }

   private arrayCadena() {
      for (let linea of this.nuevasInstrucciones) {
         if (linea.cadena == '') {

         } else {
            this.cadenaOptimizada += linea.cadena + '\n';
         }
      }
   }

}

export class Optimizacion {

   linea: number;
   regla: string;
   codigo: string;
   codigo_original:string;

   constructor(linea: number, regla: string, codigo: string, codigo_original:string) {
      this.linea = linea;
      this.regla = regla;
      this.codigo = codigo;
      this.codigo_original = codigo_original;
   }


}