import errores from '../Global/ListaError';
import { Simbolo } from '../AST/Simbolo';
import { Tipo } from '../AST/Tipo';
export class UserFunction {
    constructor(tipo, ambito, nombre, parametros, instrucciones, linea, columna) {
        this.tipo = tipo;
        this.ambito = ambito;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(entornoXQuery, entornoXML) {
        if (!entornoXQuery.existeMetodo(this.nombre)) {
            let sim = new Simbolo(Tipo.XQ_FUNC, this.nombre, null, this.linea, this.columna);
            sim.setParametros(this.parametros);
            sim.setInstrucciones(this.instrucciones);
            entornoXQuery.global.agregarSimbolo(this.nombre, sim);
        }
        else
            errores.agregarError('semantico', 'Ya existe el metodo/funcion ' + this.nombre, this.linea, this.columna);
    }
}
