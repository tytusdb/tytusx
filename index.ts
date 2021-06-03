import { AST } from "./AST/AST";
import { Entorno } from "./AST/Entorno";
import { Instruccion } from "./Interfaces/Instruccion";

const gramatica = require('./Gramatica/gramatica');

function ejecutarCodigo(entrada:string){
    const instrucciones = gramatica.parse(entrada);

    const entornoGlobal:Entorno = new Entorno(null);
    const ast:AST = new AST(instrucciones);

    instrucciones.forEach((element:Instruccion) => {
        element.ejecutar(entornoGlobal,ast);
    });
}

ejecutarCodigo(`
    print(1);
    print(true);
    print("hola mundo");
`);