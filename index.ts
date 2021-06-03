//import { Ast } from "./Estructuras/Ast/Ast";
//import { Ast } from "./Estructuras/Ast/NodoAst";
//import { Entorno } from "./AST/Entorno";
//import {  } from "./Interfaces/Instruccion";

const gramatica = require('./Gramatica/gramatica');
const estructuras1 = require('./Estructuras/Ast/NodoAst');
const estructuras2 = require('./Estructuras/Ast/Ast');

function ejecutarCodigo(entrada:string){
    //const instrucciones = gramatica.parse(entrada);
    gramatica.parse(entrada);

    //const entornoGlobal:Entorno = new Entorno(null);
    //const ast:AST = new AST(instrucciones);

    /*
    instrucciones.forEach((element:Instruccion) => {
        element.ejecutar(entornoGlobal,ast);
    });
    */
}

ejecutarCodigo(`
<bookstore>
<book>
  <title lang = "en">Harry d</title>
  <author>Rowling</author>
  <year>2005</year>
  <price>29.99</price>
</book>
</bookstore>
`);