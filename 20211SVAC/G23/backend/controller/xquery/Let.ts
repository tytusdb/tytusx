import { Ambito } from "../../model/xml/Ambito/Ambito";
import { Contexto } from "../Contexto";
import { Tipos } from "../../model/xpath/Enum";
import { Variable } from "../../model/xml/Ambito/Variable";

function LetClause(_id: any, _valor: any, _ambito: Ambito, _contexto: Contexto, id?: any) {
    const Expresion = require("../xpath/Expresion/Expresion");
    let tmp = new Contexto(_contexto);
    let variable = new Variable(_id.variable, Tipos.VARIABLE, _id.linea, _id.columna);
    let contexto = Expresion(_valor, _ambito, tmp, id);
    if (contexto) {
        variable.setValue(contexto);
        tmp.addVariable(variable);
    }
    // console.log(variable, 3333333);
}

export = LetClause;