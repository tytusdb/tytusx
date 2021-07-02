import { Ambito } from "../../model/xml/Ambito/Ambito";
import Expresion from "../xpath/Expresion/Expresion";
import { Contexto } from "../Contexto";

function IfConditional(_condicion: any, _instruccionesThen: Array<any>, _instruccionesElse: Array<any>, _ambito: Ambito, _contexto: Contexto, id?: any) {
    let tmp = new Contexto(_contexto);
    let condicion: Array<Contexto> = Expresion(_condicion, _ambito, tmp, id);
    // console.log(_condicion)
    if (condicion && condicion[0].getLength() > 0) {
        let instrucciones = Expresion(_instruccionesThen, _ambito, condicion[0], id);
        return instrucciones;
    }
    else {
        let instrucciones = Expresion(_instruccionesElse, _ambito, _contexto, id);
        return instrucciones;
    }
}

export = IfConditional;