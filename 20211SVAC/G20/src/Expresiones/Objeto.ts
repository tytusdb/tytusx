import { Atributo } from "./Atributo";

export enum Etiqueta {
    UNICA,
    DOBLE,
    HEADER
}

export class Objeto {
    identificador: string;
    texto: string;
    listaAtributos: Array<Atributo>;
    listaObjetos: Array<Objeto>;
    linea: number;
    columna: number;
    etiqueta: Etiqueta;

    textWithoutSpecial: string;

    constructor(id: string, texto: string, linea: number, columna: number, listaAtributos: Array<Atributo>, listaO: Array<Objeto>, etiqueta:Etiqueta) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO
        this.etiqueta = etiqueta;

        this.textWithoutSpecial = this.setCaracteresEspeciales(texto);
    }

    setCaracteresEspeciales(valor: string) {
        let value = valor.split("&lt;").join("<");
        value = value.split("&gt;").join(">");
        value = value.split("&amp;").join("&");
        value = value.split("&apos;").join("'");
        value = value.split("&quot;").join('"');
        return value;
    }
}