const  AST = require('./AST.js');
const parser =require('./gramatica');
var texto="";
function AnalisisXPath(texto){
    var analisis=  parser.parse(texto.toString()); 
    var Raiz = new AST();
    var CodigoGraphvizRecuperado= Raiz.RecorrerAST(analisis.diagramaAST);
    Raiz.LimpiarVariableGraph();
    console.log(CodigoGraphvizRecuperado);


    
    return {objeto:analisis,DotAst:CodigoGraphvizRecuperado,msj:'Analisis Ascendente XPath finalizado.'};

}
//AnalisisXPath('//bookstore[7+3 or 4*3 or price=12] | //racknack//braith//caicul[7+3 and price>32 or price=12]| //totis//chel[7+3 and price>32 or price=12]');

function recorrer(nodo){
    
    return this.texto;
}


module.exports = { AnalizarAsc: AnalisisXPath};





