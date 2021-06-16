class Nodo {

    
    constructor(tipo, valor,hijos=[]) {
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = hijos;
    }

    agregarHijo(hijo) {
        this.hijos.push(hijo);
    }

}

