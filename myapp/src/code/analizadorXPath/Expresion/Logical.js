var Entorno = require("../AST/Entorno")
const { Literal } = require("./Expresiones")
//Funcion para el Or entre booleanos
class ExpOr
{
    constructor(izquierdo,derecho)
    {
        this.izquierdo=izquierdo;
        this.derecho=derecho;
    }
    
    getValor()
    {
        var valIzq = this.izquierdo.getValor();
        var valDer = this.derecho.getValor();

        if(valIzq.tipo == Entorno.Tipo.ERROR || valDer.tipo==Entorno.Tipo.ERROR){
            return new Literal(Entorno.Tipo.ERROR,"@Error@");
        }
        return valIzq.valor || valDer.valor
    }
}

class ExpAnd 
{
    constructor(izquierdo,derecho)
    {
        this.izquierdo=izquierdo;
        this.derecho=derecho;
    }

    getValor()
    {
        var valIzq = this.izquierdo.getValor();
        var valDer = this.derecho.getValor();

        if(valIzq.tipo == Entorno.Tipo.ERROR || valDer.tipo==Entorno.Tipo.ERROR){
            return new Literal(Entorno.Tipo.ERROR,"@Error@");
        }
        return valIzq.valor && valDer.valor
    }
}

exports.ExpOr=ExpOr;
exports.ExpAnd=ExpAnd;