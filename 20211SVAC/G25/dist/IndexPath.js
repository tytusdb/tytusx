"use strict";
/*import { AST_XPATH } from "./xpath/ast/AST_XPATH";*

const gramatica = require('../grammar/Grammar_xpath');*/
function ejecutarCodigo(entrada) {
    const instrucciones = gramatica.parse(entrada);
    const AST = new AST_XPATH(instrucciones);
    console.log(AST);
}
ejecutarCodigo('//biblioteca/libro/autor');
