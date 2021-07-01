class Nodo {

    
    constructor(tipo, valor,hojas=[]) {
        this.valor = valor;
        this.tipo = tipo;
        this.hojas = hojas;
    }

    addHoja(hoja) {
        this.hojas.push(hoja);
    }

}

