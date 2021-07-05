import { Tipos } from "../xpath/Enum"

export class XQObjeto {

    nuevoFor(_cuerpoDec: Array<any>, _instrucciones: any, _linea: number, _columna: number) {
        return {
            cuerpo: _cuerpoDec,
            instrucciones: _instrucciones,
            tipo: Tipos.FOR_LOOP,
            linea: _linea,
            columna: _columna
        }
    }

    nuevaVariable(_variable: any, _linea: number, _columna: number) {
        return {
            variable: _variable,
            tipo: Tipos.VARIABLE,
            linea: _linea,
            columna: _columna
        }
    }

    nuevaExpresion(_variable: any, _valor: any, _linea: number, _columna: number) {
        return {
            variable: _variable,
            valor: _valor,
            tipo: Tipos.ASIGNACION,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoLet(_varName: any, _valor: any, _linea: number, _columna: number) {
        return {
            id: _varName, // $x, $y, $z
            valor: _valor, /* (1 to 5) || (substring($booktitle,1,4)) || ($p * $d) div 100 */
            tipo: Tipos.LET_CLAUSE,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoWhere(_condiciones: Array<any>, _linea: number, _columna: number) {
        return {
            condiciones: _condiciones,
            tipo: Tipos.WHERE_CONDITION,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoOrderBy(_orders: Array<any>, _linea: number, _columna: number) {
        return {
            ordenes: _orders,
            tipo: Tipos.ORDER_BY_CLAUSE,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoReturn(_expresion: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            tipo: Tipos.RETURN_STATEMENT,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoValor(_valor: any, _tipo: Tipos, _linea: number, _columna: number) { // 1, "hola"
        return {
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    }

    nuevaDeclaracion(_variables: any, _at: any, _iterators: any, _linea: number, _columna: number) { // (1 to 10)
        return {
            variable: _variables,
            atKey: _at, // at $i <- i es un contador
            iterators: _iterators, /* (1 to 5) || (1,2,3,4,5) || (2) || book/author */
            tipo: Tipos.DECLARACION,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoIntervalo(_valor1: any, _valor2: any, _linea: number, _columna: number) { // (1 to 10)
        return {
            valor1: _valor1,
            valor2: _valor2,
            tipo: Tipos.INTERVALO,
            linea: _linea,
            columna: _columna
        }
    }

    nuevosValores(_valores: Array<any>, _linea: number, _columna: number) { // (1,2,3,4,5)
        return {
            valores: _valores,
            tipo: Tipos.VALORES,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoContenido(_valor: string, _linea: number, _columna: number) { // > content <
        return {
            contenido: _valor,
            tipo: Tipos.CONTENIDO,
            linea: _linea,
            columna: _columna
        }
    }

    nuevaInyeccion(_path: any, _onlyData: boolean, _linea: number, _columna: number) { // > content <
        return {
            path: _path,
            onlyData: _onlyData,
            tipo: Tipos.INYECCION,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoHTML(_id_open: any, _atributos: any, _contenido: any, _id_close: any, _linea: number, _columna: number) { // > content <
        return {
            id_open: _id_open,
            id_close: _id_close,
            atributos: _atributos,
            value: _contenido,
            tipo: Tipos.HTML,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoIf_Then_Else(_condicionIf: any, _instruccionesThen: any, _instruccionesElse: any, _linea: number, _columna: number) {
        return {
            condicionIf: _condicionIf,
            instruccionesThen: _instruccionesThen,
            instruccionesElse: _instruccionesElse,
            tipo: Tipos.IF_THEN_ELSE,
            linea: _linea,
            columna: _columna
        }
    }

    nuevoParametro(_id: any, _tipado: Tipos, _linea: number, _columna: number) {
        return {
            id: _id,
            tipado: _tipado,
            linea: _linea,
            columna: _columna
        }
    }

    nuevaFuncion(_name: string, _parametros: Array<any>, _tipado: Tipos, _instrucciones: any, _linea: number, _columna: number) {
        return {
            name: _name,
            parametros: _parametros,
            tipado: _tipado,
            instrucciones: _instrucciones,
            tipo: Tipos.DECLARACION_FUNCION,
            linea: _linea,
            columna: _columna
        }
    }

    nuevaLlamada(_name: string, _parametros: Array<any>, _linea: number, _columna: number) {
        return {
            name: _name,
            parametros: _parametros,
            tipo: Tipos.LLAMADA_FUNCION,
            linea: _linea,
            columna: _columna
        }
    }

    llamadaNativa(_name: string, _parametros: Array<any>, _linea: number, _columna: number) {
        return {
            name: _name,
            parametros: _parametros,
            tipo: Tipos.LLAMADA_NATIVA,
            linea: _linea,
            columna: _columna
        }
    }

}