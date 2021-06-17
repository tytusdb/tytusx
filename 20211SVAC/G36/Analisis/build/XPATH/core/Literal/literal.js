

const Literal = function(type , valor , line , column) {
    this.type = type;
    this.valor = valor;
    this.line = line;
    this.column = column ;
}


Literal.prototype.getValor = function() {
    return this.valor;
};

Literal.prototype.getLine = function(){
    return this.line;
};

Literal.prototype.getColumn = function(){
    return this.column;
}

Literal.prototype.getType = function() {
    return this.type;
};

Literal.prototype.execute = function(Entorno) {
    return this;
}

Literal.prototype.getDot = function(){

   let hash = `Nodo${this.getLine()}${this.getColumn()}`; 

   return  `${hash}
            ${hash} [label="${this.getValor()}"];`;

};


module.exports = Literal;

