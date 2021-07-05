import { Simbolo } from "./Simbolo";

export class Entorno {
    private identificador: string;
    private anterior: Entorno;
    private tabla: Array<Simbolo>

    //recibe un entorno unicamente, el entorno anterior
    constructor(identificador: string, anterior: Entorno) {
        this.tabla = [];
        this.identificador = identificador;
        this.anterior = anterior;
    }
    //se agrega un simbolo a la tabla
    agregar(simbolo: Simbolo) {

        let symbol_exist = false;
        for (let sim of this.tabla) {
            if(simbolo.identificador == sim.identificador) symbol_exist = true;
        }

        if(!symbol_exist) this.tabla.push(simbolo);
        else this.reemplazar(simbolo.identificador, simbolo);
    }

    getIdentificador() {
        return this.identificador;
    }

    //existe simbolo utilizable
    existe(id: string): boolean {
        let existe_id = false;
        for (let ent: Entorno = this; ent != null; ent = ent.anterior) {
            ent.tabla.forEach(simbolo => {
                if (simbolo.identificador == id) existe_id = true;
            });
        }
        return existe_id; 
    }
    //existe simbolo en entorno actual
    existeEnActual(id: string): boolean {
        let existe_id = false;
        this.tabla.forEach(simbolo => {
            if (simbolo.identificador == id) {
                existe_id = true;
            }
        });
        return existe_id; 
    }

    getSimbolo(id: string): any {

        let simbol_temp = null;

        for (let ent: Entorno = this; ent != null; ent = ent.anterior) {
            ent.tabla.forEach(simbolo => {
                if (simbolo.identificador == id) {
                    simbol_temp = simbolo;
                }
            });
        }
        return simbol_temp;
    }

    reemplazar(id: string, nuevoValor: Simbolo) {
        for (let i = 0; i < this.tabla.length; i++) {
            if (this.tabla[i].identificador == id) {
                this.tabla.splice(i, 1);
                this.agregar(nuevoValor);
            }
        }
        
    }

}