"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ast_1 = require("./xpath/ast/Ast");
const gramatica = require('./grammar/Grammar_xpath');
function ejecutarCodigo(entrada) {
    const instrucciones = gramatica.parse(entrada);
    const AST = new Ast_1.ast(instrucciones);
    console.log(instrucciones);
}
ejecutarCodigo('/123/fff/asdf');
