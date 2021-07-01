import { Expresion, Instruccion } from "../modelos";

export class Literal extends Expresion{
    constructor(tipo, valor){
        super()
        this.tipo = tipo
        this.valor = valor
    }

    optimizar(){
        var retorno = new Literal(this.tipo, this.valor)
        this.esCero = this.valor == '0'
        return retorno
    }

    tresd(){
        return this.valor
    }
}

export class Id extends Expresion{
    constructor(id){
        super()
        this.id = id
    }

    optimizar(){
        return new Id(this.id)
    }

    tresd(){
        return this.id
    }
}

export class Casteo extends Expresion{
    constructor(tipo, expresion){
        super()
        this.tipo = tipo
        this.expresion = expresion
    }

    optimizar(){
        var res = this.expresion.optimizar()
        if (res instanceof Literal){
            res.tipo = this.tipo
        }
        return res 
    }

    tresd(){
        var tresdExp = this.expresion.tresd()
        return `(${this.tipo}) ${tresdExp}`
    }
}

export class Arreglo extends Expresion{
    constructor(id, posicion){
        super()
        this.id = id
        this.posicion = posicion
    }

    optimizar(){
        return this
    }

    tresd(){
        var tresdPos = this.posicion.tresd()
        return `${this.id}[${tresdPos}]`   
    }
}

export class Comparacion extends Expresion{
    constructor(izq, op, der){
        super()
        this.izq = izq
        this.op = op
        this.der = der
    }

    optimizar(){
        var retIzq  = this.izq.optimizar()
        var retDer = this.der.optimizar()

        if (retIzq instanceof Literal && retDer instanceof Literal){
            // la condición está hecha de constantes
            // podemos identificar si siempre es verdadera o falsa
            var comparado = this.comparar(retIzq, this.op,retDer)
            if (comparado){
                // siempre es verdadero
                this.esSiempreTrue = true
            }else {
                this.esSiempreFalse = true
            }
        }

        return this
    }

    comparar(izq, op, der){
        var retorno = false

        switch(op){
            case '>':
                retorno = izq.valor > der.valor 
            break;
            case '>=':
                retorno = izq.valor >= der.valor
            break;
            case '<':
                retorno = izq.valor < der.valor
            break;
            case '<=':
                retorno = izq.valor <= der.valor
            break;
            case '==':
                retorno = izq.valor == der.valor
            break;
            case '!=':
                retorno = izq.valor != der.valor
            break;
        }

        return retorno
    }

    obtenerNegativa(){
        var newOp = this.op
        switch(this.op){
            case '>':
                newOp = '<=' 
            break;
            case '>=':
                newOp = '<'
            break;
            case '<':
                newOp = '>='
            break;
            case '<=':
                newOp = '>'
            break;
            case '==':
                newOp = '!='
            break;
            case '!=':
                newOp = '=='
            break;
        }

        this.op = newOp
        var retorno = this.optimizar()
        return retorno
    }

    tresd(){
        var tizq = this.izq.tresd()
        var tder = this.der.tresd()
        
        return `${tizq}${this.op}${tder}`
    }
}

export class Aritmetico extends Expresion{
    constructor(izq, op, der){
        super()
        this.izq = izq
        this.op = op
        this.der = der
    }

    optimizar(){
        // suma cero
        var retorno = this
        var valIzq = this.izq.optimizar()
        var valDer = this.der.optimizar()
        switch(this.op){
            case '+': // regla 12
            case '-': // regla 13
                if (valIzq.valor == 0 ){
                    // 0 + 5 -> 5
                    if (valDer instanceof Literal){
                        retorno = new Literal(valDer.tipo, valDer.valor)
                    }

                    // 0 + id
                    if (valDer instanceof Id){
                        retorno = new Id(valDer.id)
                    }
                }else if (valDer.valor == 0){
                    // 5 + 0 -> 5
                    if (valIzq instanceof Literal){
                        retorno = new Literal(valIzq.tipo, valIzq.valor)
                    }

                    // id + 5
                    if (valIzq instanceof Id){
                        retorno = new Id(valIzq.id)
                    }
                }
            break;
            case '*': // regla 14 ; regla 16 ; regla 17
                
                if (valIzq.valor == 0 || valDer.valor == 0){
                    // 0 * id|5 ; id|5 * 0 -> 0
                    retorno = new Literal('', '0')
                }
            
                if (valIzq.valor == 1 ){
                    // 1 * 5 -> 5
                    if (valDer instanceof Literal){
                        retorno = new Literal(valDer.tipo, valDer.valor)
                    }

                    // 1 * id
                    if (valDer instanceof Id){
                        retorno = new Id(valDer.id)
                    }
                }else if (valDer.valor == 1){
                    // 5 * 1 -> 5
                    if (valIzq instanceof Literal){
                        retorno = new Literal(valIzq.tipo, valIzq.valor)
                    }

                    // id *  1
                    if (valIzq instanceof Id){
                        retorno = new Id(valIzq.id)
                    }
                }

                if (valIzq.valor == 2){
                    // 2 * 5|id -> 5 + 5 | id + id
                    retorno = new Aritmetico(this.der, '+', this.der)
                }else if (valDer.valor == 2){
                    // 5|id * 2 -> 5 + 5 | id + id
                    retorno = new Aritmetico(this.izq, '+', this.izq)
                }
            break;
            case '/': // regla 15 ; regla 18
                if (valIzq.valor == 0){
                    // 0 / 1|id -> 0
                    retorno = new Literal('','0')
                    break
                }
            
                if (valDer.valor == 1){
                    // 5 / 1 -> 5
                    if (valIzq instanceof Literal){
                        retorno = new Literal(valIzq.tipo, valIzq.valor)
                    }

                    // id /  1 -> id
                    if (valIzq instanceof Id){
                        retorno = new Id(valIzq.id)
                    }
                }
            break;
            
        }

        return retorno
    }

    tresd(){
        var tizq = this.izq.tresd()
        var tder = this.der.tresd()
        
        return `${tizq}${this.op}${tder}`
    }
}

export class Unario extends Expresion{
    constructor(op, izq){
        super()
        this.op = op
        this.izq = izq
    }

    optimizar(){
        return this
    }

    tresd(){
        var tizq = this.izq.tresd()
        
        return `${this.op}${tizq}`
    }
}