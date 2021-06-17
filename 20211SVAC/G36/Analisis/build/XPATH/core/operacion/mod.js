const Literal = require("../Literal/literal.js");


const Mod = function ( eIzq , eDer,errorList ,line, column ){
    this.eIzq = eIzq ;
    this.eDer = eDer;
    this.errorList = errorList;
    this.line = line;
    this.column = column;
}



Mod.prototype.execute = function(Entorno){
    var hijoIzq =  this.eIzq.execute(Entorno);
    var hijoDer  = this.eDer.execute(Entorno);
    if( hijoIzq.getType() === 'int'){
        if( hijoDer.getType() === 'int'){
            return  new Literal("int", parseInt(hijoIzq.getValor() % hijoDer.getValor()) ,this.line,this.column) ;
        }
        else if (hijoIzq.getType() === 'decimal'){
            return  new Literal("decimal", 
                        hijoIzq.getValor() % hijoDer.getValor() ,                      
                          this.line,this.column);     
        }
        else{
           this.errorList.push({lexema: hijoDer.getValor(), 
                                fila:hijoDer.line,
                                columna:hijoDer.column,
                                tipo:"Semantico",
                                desc: `Operador derecho no es de un tipo no valido = ${hijoDer.getValor()}`});
            return new Literal("error","Error semantico",hijoDer.getLine(),hijoDer.getColumn());
        }   
    }
    else if(hijoIzq.getType() == 'decimal'){
        if( hijoIzq.getType() === 'decimal' ||  hijoDer.getType() === 'int')
            return  new Literal("decimal",
                        hijoIzq.getValor() % hijoDer.getValor() ,
                        this.line,this.column);
         else {
            this.errorList.push({lexema: hijoDer.getValor(), 
                                fila:hijoDer.line,
                                columna:hijoDer.column,
                                tipo:"Semantico", 
                                desc: `Operador derecho no es de un tipo no valido = ${hijoDer.getValor()}`});
             return new Literal("error","Error semantico",hijoDer.getLine(),hijoDer.getColumn());
         }  
    }
    else{
        this.errorList.push({lexema: hijoIzq.getValor(), 
            fila:hijoIzq.line,
            columna:hijoIzq.column,
            tipo:"Semantico", 
            desc: `Operador derecho no es de un tipo no valido = ${hijoIzq.getValor()}`});
        console.log("tipo izquierdo es invalido ");
        return   new Literal("error","Error semantico",hijoIzq.getLine(),hijoIzq.getColumn());;
    }

};


Mod.prototype.getDot = function(){

    let hash = `Nodo${this.line}${this.column}`; 
    return  `${hash}
             ${hash}[label="Mod"];
             ${hash} -> ${this.eIzq.getDot()}
             ${hash} -> ${this.eDer.getDot()}`;
};


module.exports = Mod;