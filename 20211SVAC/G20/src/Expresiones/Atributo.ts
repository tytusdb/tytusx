export enum Comilla {
    SIMPLE,
    DOBLE
}

export class Atributo {
    identificador: string;
    valor: string;
    linea: number;
    columna: number;
    comilla: Comilla;

    textWithoutSpecial: string;

    constructor(id: string, valor: string, linea: number, columna: number, comilla: Comilla) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.comilla = comilla;

        this.textWithoutSpecial = this.setCaracteresEspeciales(valor);
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