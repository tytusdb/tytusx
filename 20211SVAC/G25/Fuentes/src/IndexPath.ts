/*import { AST_XPATH } from "./xpath/ast/AST_XPATH";*

const gramatica = require('../grammar/Grammar_xpath');*/

function ejecutarCodigo(entrada:string){
    const instrucciones = gramatica.parse(entrada);
    
    const AST:AST_XPATH = new AST_XPATH(instrucciones);
    console.log(AST);
    
  }

ejecutarCodigo('//biblioteca/libro/autor');