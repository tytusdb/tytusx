var {Tipo, Colision} = require("../AST/Entorno");
const { Literal } = require("./Expresiones");

export class Igual {

    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos){
        var retorno = []
        
        for (var obj of Objetos ){
            var valIzq = this.izquierdo.getValor(obj.entorno)
            var valDer = this.derecho.getValor(obj.entorno)

            for (var izq of valIzq) {
                var salir = false
                for (var der of valDer){

                    if (
                        Colision[izq.tipo][der.tipo] 
                        &&  izq.valor == der.valor){
                        retorno.push(obj)
                        salir = true
                        break
                    }
                }
                if (salir) break
            }
        }
        return retorno
    }
}

function comparison(izq, op, der) {
    
}

export class Diferente {
    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(){
        var retorno = new Literal(Tipo.ERROR,"@Error@")
        var valIzq = this.izquierdo.getValor()
        var valDer = this.derecho.getValor()

        // validación de tipos
        if (Colision[valIzq.tipo][valDer.tipo]){
            // sí se pueden operar
            retorno = new Literal(Tipo.BOOLEAN, valIzq[0].valor != valDer[0].valor)
        }

        return retorno
    }
}

export class Menor {
    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(){
        var retorno = new Literal(Tipo.ERROR,"@Error@")
        var valIzq = this.izquierdo.getValor()
        var valDer = this.derecho.getValor()

        // validación de tipos
        if (Colision[valIzq.tipo][valDer.tipo]){
            // sí se pueden operar
            retorno = new Literal(Tipo.BOOLEAN, valIzq[0].valor < valDer[0].valor)
        }

        return retorno
    }
}

export class MenorIgual {
    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(){
        var retorno = new Literal(Tipo.ERROR,"@Error@")
        var valIzq = this.izquierdo.getValor()
        var valDer = this.derecho.getValor()

        // validación de tipos
        if (Colision[valIzq.tipo][valDer.tipo]){
            // sí se pueden operar
            retorno = new Literal(Tipo.BOOLEAN, valIzq[0].valor <= valDer[0].valor)
        }

        return retorno
    }
}

export class Mayor {
    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(){
        var retorno = new Literal(Tipo.ERROR,"@Error@")
        var valIzq = this.izquierdo.getValor()
        var valDer = this.derecho.getValor()

        // validación de tipos
        if (Colision[valIzq[0].tipo][valDer[0].tipo]){
            // sí se pueden operar
            retorno = new Literal(Tipo.BOOLEAN, valIzq[0].valor > valDer[0].valor)
        }

        return new Array(retorno)
    }
}

export class MayorIgual {
    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(){
        var retorno = new Literal(Tipo.ERROR,"@Error@")
        var valIzq = this.izquierdo.getValor()
        var valDer = this.derecho.getValor()

        // validación de tipos
        if (Colision[valIzq.tipo][valDer.tipo]){
            // sí se pueden operar
            retorno = new Literal(Tipo.BOOLEAN, valIzq[0].valor >= valDer[0].valor)
        }

        return retorno
    }
}

/*
    /biblioteca/libro[titulo > 5]
    /biblioteca[libro/titulo > 5]
*/