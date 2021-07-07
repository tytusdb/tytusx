import { Ambito } from "../../model/xml/Ambito/Ambito";
import Expresion from "../xpath/Expresion/Expresion";
import { Contexto } from "../Contexto";
import { Tipos } from "../../model/xpath/Enum";

function IfConditional(_condicion: any, _instruccionesThen: Array<any>, _instruccionesElse: Array<any>, _ambito: Ambito, _contexto: Contexto, id?: any) {
    let tmp = new Contexto(_contexto);
    let condicion: any = Expresion(_condicion, _ambito, tmp, id);
    if (condicion === null || condicion.error) return condicion;
    let cumple = cumpleCondicion(condicion[0], _contexto);
    if (cumple) {
        cumple.tablaVariables = _contexto.tablaVariables;
        let instrucciones = Expresion(_instruccionesThen, _ambito, cumple, id);
        // console.log(instrucciones, 3383838338)
        return instrucciones;
    }
    else {
        let instrucciones = Expresion(_instruccionesElse, _ambito, _contexto, id);
        // console.log(instrucciones, 3383838338)
        return instrucciones;
    }
}

function cumpleCondicion(_condicion: any, _tmp: Contexto): Contexto | null {
    if (_condicion.constructor.name === "Contexto") {
        if (_condicion.getLength() > 0) return _condicion;
        else return null;
    }
    else if (_condicion.valor === true && _condicion.tipo === Tipos.BOOLEANO) return _tmp;
    else return null;
}

export = IfConditional;