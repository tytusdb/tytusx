import { Entorno } from '../AST/Entorno';
import { Simbolo } from '../AST/Simbolo';
import { Tipo } from '../AST/Tipo';
export class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaO, isUnica) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.isUnica = isUnica;
    }
    ejecutar(entorno) {
        let local = new Entorno(this.identificador, entorno, entorno.global);
        local.agregarSimbolo('Etiqueta unica', new Simbolo(Tipo.ETIQUETA_UNIQUE, 'Etiqueta unica', this.isUnica, this.linea, this.columna));
        this.listaAtributos.forEach((elem) => {
            elem.ejecutar(local);
        });
        this.listaObjetos.forEach((obj) => {
            obj.ejecutar(local);
        });
        if (this.texto !== '')
            local.agregarSimbolo('Texto', new Simbolo(Tipo.STRING, 'Texto', this.texto, this.linea, this.columna));
        entorno.agregarSimbolo(this.identificador, new Simbolo(this.isUnica ? Tipo.ETIQUETA_UNIQUE : Tipo.ETIQUETA, this.identificador, local, this.linea, this.columna));
    }
}
