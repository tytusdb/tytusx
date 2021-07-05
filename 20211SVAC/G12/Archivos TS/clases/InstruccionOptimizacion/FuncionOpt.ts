import {Nodo} from '../InstruccionOptOtros/Nodo';
import {Salto} from './Salto';
import {Etiqueta} from './Etiqueta';
import {InstruccionOptimizada} from '../InstruccionOptOtros/InstruccionOptimizada';
import {ListaRepoOptimizacion} from '../InstruccionOptOtros/ListaRepoOptimizacion';

export  class FuncionOpt extends Nodo {
  nombre: string;
  instrucciones: Array<Nodo>;

  constructor(nombre: string, instrucciones: Array<Nodo>, linea: number) {
    super(linea);
    this.nombre = nombre;
    this.instrucciones = instrucciones;
  }

  optimizar(): any {
    let saltoDetectado = false;
    let contadorRegla1;
    let lineaRegla1;
    let cadenaRegla1Eliminado;
    let cadenaRegla1Agregado;
    let codigoOptimizado = `void ${this.nombre}(){\n`;
    for (const instruccion of this.instrucciones){
      if (saltoDetectado && instruccion instanceof Etiqueta){
        saltoDetectado = false;
        if (contadorRegla1 > 0){
          cadenaRegla1Eliminado += instruccion.optimizar();
          cadenaRegla1Agregado += instruccion.optimizar();
          const repo = new InstruccionOptimizada('Mirilla', 'Regla 1', cadenaRegla1Eliminado, cadenaRegla1Agregado, lineaRegla1);
          ListaRepoOptimizacion.getLista().push(repo);
        }
      }
      if (instruccion instanceof Salto && !saltoDetectado){
        saltoDetectado = true;
        lineaRegla1 = instruccion.linea;
        codigoOptimizado += instruccion.optimizar();
        cadenaRegla1Agregado = instruccion.optimizar();
        cadenaRegla1Eliminado = '';
        contadorRegla1 = -1;
      }
      if (!saltoDetectado){
        codigoOptimizado += instruccion.optimizar();
      }
      else{
        cadenaRegla1Eliminado += instruccion.optimizar();
        contadorRegla1 += 1;
      }
    }
    codigoOptimizado += `}\n\n`;
    return codigoOptimizado;
  }
}
