const Literal = require("../Literal/literal.js");

const And = function ( eIzq , eDer,errorList ,line, column ){
    this.eIzq = eIzq ;
    this.eDer = eDer;
    this.errorList = errorList;
    this.line = line;
    this.column = column;
};


And.prototype.execute = function(Entorno){

    var hijoIzq =  this.eIzq.execute(Entorno);
    var hijoDer  = this.eDer.execute(Entorno);

    if(hijoIzq.getType() === 'boolean'){
        if(hijoDer.getType() === 'boolean'){
            return  new Literal("boolean", 
              hijoIzq.getValor() && hijoDer.getValor(), 
              this.line,this.column) ;   
        }else{
            this.errorList.push({lexema: hijoDer.getValor(), 
                fila:hijoDer.line,
                columna:hijoDer.column,
                tipo:"Semantico",
                desc: `Operador derecho no es de un tipo  valido para && = ${hijoDer.getValor()}`});
                return new Literal("error","Error semantico",hijoDer.getLine(),hijoDer.getColumn());
        }
    
    }
    else{
        this.errorList.push({lexema: hijoIzq.getValor(), 
            fila:hijoIzq.line,
            columna:hijoIzq.column,
            tipo:"Semantico", 
            desc: `Operador derecho no es de un tipo  valido para un && = ${hijoIzq.getValor()}`});
        console.log("tipo izquierdo es invalido ");
        return   new Literal("error","Error semantico",hijoIzq.getLine(),hijoIzq.getColumn());
    }

};

And.prototype.getDot = function(){

    let hash = `Nodo${this.line}${this.column}`; 
    return  `${hash}
             ${hash}[label="and"];
             ${hash} -> ${this.eIzq.getDot()}
             ${hash} -> ${this.eDer.getDot()}`;
};

module.exports = And;