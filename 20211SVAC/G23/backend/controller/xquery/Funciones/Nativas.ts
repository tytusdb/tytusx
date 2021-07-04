import { Contexto } from "../../Contexto";
import { Ambito } from "../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../model/xpath/Enum";
import Expresion from "../../xpath/Expresion/Expresion";

function Nativa(_instr: any, _ambito: Ambito, _contexto: Contexto, _id?: any) {
    let tmp = new Contexto(_contexto);
    let name: Tipos = _instr.name;
    let parametros: Array<any> = _instr.parametros;
    let valores: Array<any> = [];
    for (let i = 0; i < parametros.length; i++) {
        const parametro = parametros[i];
        let contexto = Expresion(parametro, _ambito, tmp, _id);
        if (contexto === null || contexto.error) return contexto;
        if (contexto.constructor.name === "Contexto") {
            contexto = _ambito.extractValue(contexto);
        }
        valores.push(contexto);
    }
    let err = { error: `No se pudo ejecutar correctamente la función ${name}`, tipo: "Semántico", origen: "XQuery", linea: _instr.linea, columna: _instr.columna }
    try {
        let output;
        let tipo;
        switch (name) {
            case Tipos.TO_UPPERCASE:
                output = String(valores[0].valor).toUpperCase();
                tipo = Tipos.STRING;
                break;
            case Tipos.TO_LOWERCASE:
                output = String(valores[0].valor).toLocaleLowerCase();
                tipo = Tipos.STRING;
                break;
            case Tipos.TO_STRING:
                output = String(valores[0].valor);
                tipo = Tipos.STRING;
                break;
            case Tipos.TO_NUMBER:
                output = Number(valores[0].valor);
                tipo = Tipos.NUMBER;
                break;
            case Tipos.SUBSTRING:
                if (valores.length === 3)
                    output = String(valores[0].valor).substring(parseInt(valores[1].valor), parseInt(valores[2].valor));
                else if (valores.length === 2)
                    output = String(valores[0].valor).substring(parseInt(valores[1].valor));
                else return { error: `La cantidad de ${valores.length} parámetros no coinciden con los esperados en la función substring.`, tipo: "Semántico", origen: "XQuery", linea: _instr.linea, columna: _instr.columna }
                tipo = Tipos.STRING;
                break;
            default:
                return null;
        }
        if (!output) return err;
        return {
            valor: output,
            tipo: tipo
        }
    } catch (error) {
        return err;
    }

}

export = Nativa;