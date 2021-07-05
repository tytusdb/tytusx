import errores from "../Global/ListaError";
import { Tipo } from "./Tipo";
export class Entorno {
    constructor(nombre, padre, global) {
        this.tsimbolos = new Array();
        this.nombre = nombre;
        this.padre = padre;
        if (global === null)
            this.global = this;
        else
            this.global = global;
    }
    agregarSimbolo(nombre, simbolo) {
        this.tsimbolos.push({ 'nombre': nombre, 'valor': simbolo });
    }
    sobreEscribirSimbolo(nombre, simbolo) {
        for (let a = this; a != null; a = a.padre) {
            for (let i = 0; i < a.tsimbolos.length; i++) {
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    let nuevo = { 'nombre': nombre, 'valor': simbolo };
                    a.tsimbolos[i] = nuevo;
                    return true;
                }
            }
        }
        errores.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return false;
    }
    getStringTipo(t) {
        switch (t) {
            case Tipo.STRING:
                return 'Cadena';
            case Tipo.ETIQUETA:
                return 'Etiqueta';
            case Tipo.ATRIBUTO:
                return 'Atributo';
            case Tipo.XQ_FUNC:
                return "Funcion XQuery";
            case Tipo.XQ_VAR:
                return "Variable XQuery";
        }
        return '';
    }
    obtenerSimbolo(nombre) {
        for (let a = this; a != null; a = a.padre) {
            for (let i = 0; i < a.tsimbolos.length; i++) {
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    return a.tsimbolos[i].valor;
                }
            }
        }
        errores.agregarError('semantico', 'No existe el simbolo ' + nombre, -1, -1);
        return null;
    }
    /* Metodo para cambiar el valor del simbolo */
    setSimbolo(nombre, simbolo) {
        //console.log("Entra a set simbolo");
        for (let a = this; a != null; a = a.padre) {
            for (let i = 0; i < a.tsimbolos.length; i++) {
                //console.log(a.tsimbolos[i].nombre.toString().toLowerCase());
                //console.log(nombre.toString().toLowerCase());
                let aux = a.tsimbolos[i];
                if (aux.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()) {
                    aux.valor = simbolo;
                    //console.log(a.tsimbolos[i].valor);
                    //console.log(this.tsimbolos[i].valor);
                    return;
                }
            }
        }
    }
    /* Verifica si el simbolo existe en el entorno actual */
    existeSimbolo(nombre) {
        for (let i = 0; i < this.tsimbolos.length; i++) {
            if (this.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                return true;
        }
        return false;
    }
}
