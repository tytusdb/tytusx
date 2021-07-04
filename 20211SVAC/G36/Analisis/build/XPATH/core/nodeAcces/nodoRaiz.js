
const NodoRaiz = function ( expresion,errorlist ,line, column ){
    this.exp = expresion ;
    this.error= errorlist;
    this.line = line;
    this.column = column;
}


NodoRaiz.prototype.execute = function(Entorno) {
    let expValor = this.exp.execute(Entorno);
    var valor = [];
    this.recursive(Entorno,valor,expValor.valor);
    return valor; 
}


NodoRaiz.prototype.recursive = function (objeto, lista, id){
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


NodoRaiz.prototype.getDot = function(){

    let hash = `Nodo${this.line}${this.column}`; 
    return  `${hash}
             ${hash}[label="//"];
             ${hash} -> ${this.exp.getDot()}`;
};

module.exports  = NodoRaiz;