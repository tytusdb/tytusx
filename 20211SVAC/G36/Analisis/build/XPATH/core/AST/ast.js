
const AST = function(expresion) {
    this.expresion = expresion;
    this.simbolTable = undefined ;
    this.errores = undefined;
    this.res = {
        "xPathResult" : "",
        "astGraph" : "",
        "errors" : ""
    }
    

};


AST.prototype.execute = function(xml){

    let DotCode = '';
    this.simbolTable = xml;   
    this.res.xPathResult = this.expresion.execute(this.simbolTable);
    this.res.astGraph = `
    digraph astXpath {
    Root
    Root[label="AST"];
    Root -> ${this.expresion.getDot()}
    }`;    
    return this;
}

module.exports = AST;