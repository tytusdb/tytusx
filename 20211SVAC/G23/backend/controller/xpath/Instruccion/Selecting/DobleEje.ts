import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import Expresion from "../../Expresion/Expresion";
import { Predicate } from "./Predicate";
import Axis from "./Axis/Axis";
import { Contexto } from "../../../Contexto";
import { Variable } from "../../../../model/xml/Ambito/Variable";

function DobleEje(_instruccion: any, _ambito: Ambito, _contexto: Contexto, id?: any): Contexto {
    let _404 = "No se encontraron elementos.";
    if (Array.isArray(_contexto))
        _contexto = _contexto[0];
    let expresion = Expresion(_instruccion, _ambito, _contexto, id);
    if (expresion === null || expresion.error) return expresion;
    if (expresion.contextFromVar && _contexto.cadena === Tipos.NONE) _contexto = expresion.contextFromVar;
    let predicate = _instruccion.predicate;
    let root: Contexto = new Contexto();
    if (expresion.tipo === Tipos.ELEMENTOS || expresion.tipo === Tipos.ASTERISCO) {
        root = getAllSymbolFromCurrent(expresion.valor, _contexto, _ambito, predicate, id);
    }
    else if (expresion.tipo === Tipos.ATRIBUTOS) {
        root = getAllSymbolFromCurrent({ id: expresion.valor, tipo: "@" }, _contexto, _ambito, predicate, id);
        if (root.atributos.length === 0) root.notFound = _404;
    }
    else if (expresion.tipo === Tipos.FUNCION_NODE) {
        root = getAllSymbolFromCurrent(expresion.valor, _contexto, _ambito, predicate, id);
        if (root.nodos.length === 0) root.notFound = _404;
    }
    else if (expresion.tipo === Tipos.FUNCION_TEXT) {
        root = getAllSymbolFromCurrent(expresion.valor, _contexto, _ambito, predicate, id);
        if (root.texto.length === 0) root.notFound = _404;
    }
    else if (expresion.tipo === Tipos.SELECT_AXIS) {
        root = Axis.GetAxis(expresion.axisname, expresion.nodetest, expresion.predicate, _contexto, _ambito, true, id);
        return root;
    }
    else {
        root.error = { error: "Expresión no válida.", tipo: "Semántico", origen: "Query", linea: _instruccion.linea, columna: _instruccion.columna };
    }
    if (root === null || root.error || root.getLength() === 0) root.notFound = _404;
    return root;
}

function getAllSymbolFromCurrent(_nodename: any, _contexto: Contexto, _ambito: Ambito, _condicion: any, id?: any): Contexto {
    if (_contexto.getLength() > 0)
        return getFromCurrent(_nodename, _contexto, _ambito, _condicion);
    else {
        _contexto.error = { error: "Instrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
        return _contexto;
    }
}

function getFromCurrent(_id: any, _contexto: Contexto, _ambito: Ambito, _condicion: any, id?: any): Contexto {
    let retorno = new Contexto();
    if (id) {
        retorno.variable = new Variable(id, Tipos.VARIABLE);
    }
    // Selecciona únicamente el texto contenido en el nodo y todos sus descendientes
    if (_id === "text()") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            retorno.texto = _ambito.searchAnyText(element, retorno.texto);
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.texto = filter.filterElements(retorno.texto);
        }
        retorno.cadena = Tipos.TEXTOS;
        return retorno;
    }
    // Selecciona todos los descencientes (elementos y/o texto)
    else if (_id === "node()") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            retorno.nodos = _ambito.nodesFunction(_ambito.tablaSimbolos[0], retorno.nodos);
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.nodos = filter.filterElements(retorno.nodos);
        }
        retorno.cadena = Tipos.COMBINADO;
        return retorno;
    }
    // Selecciona todos los atributos a partir del contexto
    else if (_id.tipo === "@") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            retorno.atributos = _ambito.searchAnyAttributes(_id.id, element, retorno.atributos);
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.atributos = filter.filterElements(retorno.atributos);
        }
        retorno.cadena = Tipos.ATRIBUTOS;
        return retorno;
    }
    // Selecciona el padre
    else if (_id === "..") {
        retorno = _contexto;
        retorno.elementos.push(_ambito.tablaSimbolos[0]);
        retorno.removeDuplicates();
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.elementos = filter.filterElements(retorno.elementos);
        }
        retorno.cadena = Tipos.ELEMENTOS;
        return retorno;
    }
    // Selecciona el nodo actual
    else if (_id === ".") {
        retorno = _contexto;
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.elementos = filter.filterElements(retorno.elementos);
        }
        /* retorno.cadena = Tipos.ELEMENTOS; */
        return retorno;
    }
    // Selecciona todos los descendientes con el id o en el caso que sea //*
    else {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            if (element.childs)
                element.childs.forEach(child => {
                    retorno.elementos = _ambito.searchNodes(_id, child, retorno.elementos);
                });
        }
    }
    if (_condicion) {
        let filter = new Predicate(_condicion, _ambito, retorno);
        retorno.elementos = filter.filterElements(retorno.elementos);
    }
    retorno.cadena = Tipos.ELEMENTOS;
    return retorno;
}

export =  DobleEje;