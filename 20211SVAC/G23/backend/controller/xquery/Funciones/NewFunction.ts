import { Contexto } from "../../Contexto";
import { Ambito } from "../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../model/xpath/Enum";
import { Funcion } from "../../Funcion";

function NewFunction(_instr: any, _ambito: Ambito, _contexto: Contexto) {
    let name: string = _instr.name;
    let parametros: Array<any> = _instr.parametros;
    let tipado: Tipos = _instr.tipado;
    let sentencias: Array<any> = _instr.instrucciones;

    _ambito.addFunction(new Funcion(name, parametros, sentencias, tipado, _instr.linea, _instr.columna));
}

export = NewFunction;