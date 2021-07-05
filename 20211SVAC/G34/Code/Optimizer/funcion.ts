import { AsignacionDosDirecciones } from "./asignacion_dos_direcciones";
import { Goto } from "./goto";
import { InstIf } from "./inst_if";
import { Instruccion } from "./Instruccion";
import { InstruccionConOptimizacion } from "./instruccion_con_optimizacion";
import { Optimizacion } from "./optimizacion";
import { Optimizaciones } from "./optimizaciones";

export class Funcion extends InstruccionConOptimizacion {
  id: string;
  instrucciones: Instruccion[];

  constructor(linea: string, codigo: string, id: string, instrucciones: Instruccion[]) {
    super(linea, codigo);
    //Object.assign(this, {id, instrucciones});
    this.id = id;
    this.instrucciones = instrucciones;
  }

  optimizar(): string {
    let salida: string = `void ${this.id}(){\n`;
    const length = this.instrucciones.length;
    for (let i = 0; i < length; i++) {
      const inst = this.instrucciones[i];
      //Validaciones para optimizacion REGLA 5
      if (inst instanceof AsignacionDosDirecciones && i + 1 < length) {
        const sig = this.instrucciones[i + 1];
        if (sig instanceof AsignacionDosDirecciones) {
          //t10 = b;
          //b = t10; //elimino esta
          if (inst.dir1 == sig.dir2 && inst.dir2 == sig.dir1) {
            i++; //Para que no se tome en cuenta la sig instruccion
            const cod1 = inst.optimizar();
            const cod2 = sig.optimizar();
            Optimizaciones.add(new Optimizacion(inst.linea, cod1 + cod2, cod1, '5'));
          }
        }
      }
      //Validaciones para REGLA 3 y REGLA 4
      if (inst instanceof InstIf && i + 1 < length) {
        const sig = this.instrucciones[i + 1];
        if (sig instanceof Goto) {
          //REGLA 3
          //if(1 == 1) goto L1; goto L2; ---> if(1 == 1) goto L1;
          if (inst.op == '==' && inst.canOptimize()) {
            i++;
            const cod1 = inst.optimizar();
            const cod2 = sig.optimizar();
            Optimizaciones.add(new Optimizacion(inst.linea, cod1 + cod2, cod1, '3'));
          }
          //REGLA 4
          //if(5 != 1) goto L1; goto L2; ---> goto L2;
          if (inst.op == '!=' && inst.canOptimize()) {
            const cod1 = inst.optimizar();
            const cod2 = sig.optimizar();
            Optimizaciones.add(new Optimizacion(inst.linea, cod1 + cod2, cod2, '4'));
            continue;
          }
        }
      }
      salida += inst.optimizar();
    }
    salida += '\n}\n';
    return salida;
  }

}
