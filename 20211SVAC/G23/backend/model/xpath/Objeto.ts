import { Tipos } from './Enum';

export class Objeto {

    newValue(_valor: string, _tipo: Tipos, _linea: number, _columna: number) {
        return {
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    }

    newOperation(_opIzq: any, _opDer: any, _tipo: Tipos, _linea: number, _columna: number) {
        return {
            opIzq: _opIzq,
            opDer: _opDer,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    }

    newNodename(_nodename: string, _linea: number, _columna: number) {
        return {
            nodename: _nodename,
            tipo: Tipos.NODENAME,
            linea: _linea,
            columna: _columna
        }
    }

    newAxis(_expresion: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            tipo: Tipos.SELECT_FROM_ROOT,
            linea: _linea,
            columna: _columna
        }
    }

    newDoubleAxis(_expresion: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            tipo: Tipos.SELECT_FROM_CURRENT,
            linea: _linea,
            columna: _columna
        }
    }

    newCurrent(_expresion: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            tipo: Tipos.SELECT_CURRENT,
            linea: _linea,
            columna: _columna
        }
    }

    newParent(_expresion: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            tipo: Tipos.SELECT_PARENT,
            linea: _linea,
            columna: _columna
        }
    }

    newAttribute(_expresion: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            tipo: Tipos.SELECT_ATTRIBUTES,
            linea: _linea,
            columna: _columna
        }
    }

    newAxisObject(_axisname: Tipos, _nodetest: any, _linea: number, _columna: number) {
        return {
            axisname: _axisname,
            nodetest: _nodetest,
            tipo: Tipos.SELECT_AXIS,
            linea: _linea,
            columna: _columna
        }
    }

    newPredicate(_condicion: any, _linea: number, _columna: number) {
        return {
            condicion: _condicion,
            tipo: Tipos.PREDICATE,
            linea: _linea,
            columna: _columna
        }
    }

    newExpression(_expresion: any, _predicate: any, _linea: number, _columna: number) {
        return {
            expresion: _expresion,
            predicate: _predicate,
            tipo: Tipos.EXPRESION,
            linea: _linea,
            columna: _columna
        }
    }

}