"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaS = void 0;
class TablaS {
    constructor() {
        this.tabla = [];
    }
    agregar(identificador, valor, ambito, tipo, rol, tam, direccion) {
        this.tabla.push([identificador, valor, ambito, tipo, rol, tam, direccion]);
    }
    concatenar(nueva) {
        this.tabla = this.tabla.concat(nueva);
    }
    mod_size(identificador, tam) {
        this.tabla.forEach(element => {
            if (element[0] === identificador && element[4] === 'Función') {
                let tama = tam + element[5];
                element[5] = tama;
            }
        });
    }
}
exports.TablaS = TablaS;
