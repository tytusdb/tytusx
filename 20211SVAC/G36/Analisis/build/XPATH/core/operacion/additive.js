const Literal = require("../Literal/literal.js");


const Additive = function ( sign,eIzq , eDer,errorList ,line, column ){
    this.sign = sign;
    this.eIzq = eIzq ;
    this.eDer = eDer;
    this.errorList = errorList;
    this.line = line;
    this.column = column;
}

Additive.prototype.execute = function(Entorno){

    var hijoizq =  this.eIzq.execute(Entorno);
    var hijoder  = this.eDer.execute(Entorno);
    if( hijoizq.getType() === 'int'){
        if( hijoder.getType() === 'int'){
            return  new Literal("int", 
                        (this.sign === "+") ?
                         hijoizq.getValor() + hijoder.getValor() :
                          hijoizq.getValor() - hijoder.getValor(), 
                          this.line,this.column) ;
        }
        else if (hijoizq.getType() === 'decimal'){
            return  new Literal("decimal", 
                        (this.sign === "+") ?
                        hijoizq.getValor() + hijoder.getValor() :
                        hijoizq.getValor() - hijoder.getValor(), 
                          this.line,this.column);     
        }
        else{
           this.errorList.push({lexema: hijoder.getValor(), 
                                fila:hijoder.line,
                                columna:hijoder.column,
                                tipo:"Semantico",
                                desc: `Operador derecho no es de un tipo no valido = ${hijoder.getValor()}`});
            return new Literal("error","Error semantico",hijoder.getLine(),hijoder.getColumn());
        }   
    }
    else if(hijoizq.getType() == 'decimal'){
        if( hijoizq.getType() === 'decimal' ||  hijoder.getType() === 'int')
            return  new Literal("decimal", (this.sign === "+") ?
            hijoizq.getValor() + hijoder.getValor() :
            hijoizq.getValor() - hijoder.getValor(), 
                        this.line,this.column);
         else {
            this.errorList.push({lexema: hijoder.getValor(), 
                                fila:hijoder.line,
                                columna:hijoder.column,
                                tipo:"Semantico", 
                                desc: `Operador derecho no es de un tipo no valido = ${hijoder.getValor()}`});
             return new Literal("error","Error semantico",hijoder.getLine(),hijoder.getColumn());
         }  
    }
    else{
        this.errorList.push({lexema: hijoizq.getValor(), 
            fila:hijoizq.line,
            columna:hijoizq.column,
            tipo:"Semantico", 
            desc: `Operador derecho no es de un tipo no valido = ${hijoizq.getValor()}`});
        console.log("tipo izquierdo es invalido ");
        return   new Literal("error","Error semantico",hijoizq.getLine(),hijoizq.getColumn());
    }
}

Additive.prototype.getDot = function(){

    let hash = `Nodo${this.line}${this.column}`; 
    return  `${hash}
             ${hash}[label="${this.sign}"];
             ${hash} -> ${this.eIzq.getDot()}
             ${hash} -> ${this.eDer.getDot()}`;
};

module.exports = Additive;