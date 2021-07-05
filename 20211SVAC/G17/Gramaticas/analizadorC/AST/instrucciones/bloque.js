import { Instruccion } from "../modelos"
import { Asignacion } from "./asignacion"
import { Expresion } from "../modelos"
import { Etiqueta, Ira, Si } from "./si"
import { Id } from "../expresiones/expresion"

export class Bloque extends Instruccion {
    constructor(instrucciones){
        super()
        this.instrucciones = instrucciones
    }

    optimizar(){
        var iraActual = ''
        var newInstrucciones = []
        var instruccionAnterior
        for (var instruccion of this.instrucciones) {
            var instruccionActual = instruccion.optimizar()
            var insertar = true
            // regla 1
            // t2 = b;
            // b = t2; -> no insertar
            if (
                instruccionAnterior &&
                instruccionAnterior instanceof Asignacion   &&
                instruccionActual instanceof Asignacion     &&
                instruccionAnterior.expresion instanceof Id &&
                instruccionActual.expresion instanceof Id   &&
                instruccionAnterior.id == instruccionActual.expresion.id &&
                instruccionAnterior.expresion.id == instruccionActual.id
            ) { 
                // no insertar la instrucion actual
                insertar = false
            }

            // si existe un if else
            // if condición goto la; goto lb;
            if (
                instruccionAnterior &&
                instruccionAnterior instanceof Si &&
                instruccionActual instanceof Ira
            ){
                // asignar al if su etiqueta else
                newInstrucciones.pop()
                instruccionAnterior.iraFalso = instruccionActual

                // validar SI, con etiqueta falso, si es tiene condición constante
                instruccionAnterior = instruccionAnterior.optimizar2()

                // regla 3
                if ( // no era una condición constante, era un if normal
                    instruccionAnterior instanceof Si
                ){
                    instruccionAnterior = instruccionAnterior.intercambiarEtiquetas()
                }

                newInstrucciones.push(instruccionAnterior)
                insertar = false
            }

            // goto LX
            // goto LY -> no insertar
            if (
                instruccionAnterior &&
                instruccionAnterior instanceof Ira &&
                instruccionActual instanceof Ira 
            ){
                insertar = false
            }

            // ptimizar si es condición constante
            if (
                instruccionActual instanceof Si
            ){
                instruccionActual = instruccionActual.optimizar2()
            }

            // ira
            if (instruccionActual instanceof Ira && insertar){
                iraActual = instruccionActual.etiqueta
            }

            // regla 2 
            if (
                instruccionActual instanceof Etiqueta &&
                instruccionActual.etiqueta == iraActual
            ){
                // desde aquí hasta atrás, hay que eliminar todo
                do {
                    var cnd = newInstrucciones.pop()
                } while (!(cnd instanceof Ira && cnd.etiqueta == iraActual))
                iraActual = ''
            }else if (instruccionActual instanceof Etiqueta){
                iraActual = ''
            }

            // regla 6; regla 7
            //goto L1;  -> goto L2
            // 
            //L1:
            //goto L2
            if (
                instruccionActual instanceof Ira &&
                instruccionAnterior instanceof Etiqueta &&
                instruccionActual.etiqueta != instruccionAnterior.etiqueta
            ){
                //var tmpIns = []
                for (let i = newInstrucciones.length; i >= 0; i--) {
                    const ins = newInstrucciones[i];
                    if (
                        ins instanceof Ira &&
                        ins.etiqueta == instruccionAnterior.etiqueta
                    ){
                        newInstrucciones[i] = new Ira(instruccionActual.etiqueta)
                    }

                    if (
                        ins instanceof Si &&
                        ins.ira.etiqueta == instruccionAnterior.etiqueta
                    ){
                        newInstrucciones[i] = new Si(ins.condicion, new Ira(instruccionActual.etiqueta))
                    }
                }
            }

            

            if(insertar){
                newInstrucciones.push(instruccionActual)
                instruccionAnterior = instruccionActual
            }
        }

        this.instrucciones = newInstrucciones
        return this
    }

    tresd(){
        var retorno = ''

        for (const instruccion of this.instrucciones) {
            retorno += '\t'+ instruccion.tresd()
        }

        return retorno
    }
}