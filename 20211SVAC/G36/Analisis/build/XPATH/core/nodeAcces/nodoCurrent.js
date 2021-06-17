const Literal = require("../Literal/literal");


const NodoCurrent = function ( expresion,errorlist ,line, column ){
    this.exp = expresion ;
    this.error= errorlist;
    this.line = line;
    this.column = column;
}


NodoCurrent.prototype.execute = function(Entorno) {
    let expValor = this.exp.execute(Entorno);
    var valor = [];
    this.recursive(Entorno,valor,expValor.valor);
    return (valor.length > 0) ? valor : new Literal("error", "no exite este nodo en el actual documento", this.line,this.column);  
}


NodoCurrent.prototype.recursive = function (objeto, lista, id){
    if(objeto.entorno!=undefined || objeto.entorno!=null){
      objeto.entorno.ambito.forEach(element => {
        this.recursive(element,lista,id);
        if(element.nombre == id && element.tipo !=2){
          lista.push(element);
        }
      });
  }
  else{
    if(objeto.nombre == id && objeto.tipo !=2){
      lista.push(objeto);
    }
  }
};


module.exports  = NodoCurrent;