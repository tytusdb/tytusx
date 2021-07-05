import { Contexto } from "../../Contexto";
import { Ambito } from "../../../model/xml/Ambito/Ambito";
import Expresion from "../../xpath/Expresion/Expresion";
import { Variable } from "../../../model/xml/Ambito/Variable";

function Exec(_instr: any, _ambito: Ambito, _contexto: Contexto) {
    let name: string = _instr.name;
    let parametros: Array<any> = _instr.parametros;
    // Buscar la función, asignar los nuevos parámetros y ejecutarla.
    let funcion = _ambito.getFunction(name);
    if (parametros.length !== funcion?.parametros.length)
        return { error: 'El número de parámetros debe coincidir con la cantidad de parámetros de la función', linea: _instr.linea, columna: _instr.columna, origen: "XQuery", tipo: "Semántico" };

    // Declaración de parámetros
    for (let i = 0; i < parametros.length; i++) {
        const parametro = parametros[i];
        const val = Expresion(parametros[i], _ambito, _contexto)
        // console.log(val, 87878)
        if (parametro) {
            let newVar = new Variable(funcion.parametros[i].id, funcion.parametros[i].tipado, parametro.linea, parametro.columna);
            newVar.setValue(val);
            _ambito.addVariable(newVar);
        }
    }
    // Ejecutar código
    const Bloque_XQuery = require("../Bloque_XQuery");
    let _bloque = Bloque_XQuery.getIterators(funcion.sentencias, _ambito, _contexto);
    // console.log(_bloque);
    return _bloque;

}

export = Exec;