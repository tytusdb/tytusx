import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Tipos } from "../../../../model/xpath/Enum";
import Expresion from "../../Expresion/Expresion";
import { Element } from "../../../../model/xml/Element";
import { Atributo } from "../../../../model/xml/Atributo";
import { Predicate } from "./Predicate";
import Axis from "./Axis/Axis";
import { Contexto } from "../../../Contexto";
import { Variable } from "../../../../model/xml/Ambito/Variable";

function Eje(_instruccion: any, _ambito: Ambito, _contexto: Contexto, id?: any): Contexto {
    let _404 = "No se encontraron elementos.";
    if (Array.isArray(_contexto))
        _contexto = _contexto[0];
    let expresion = Expresion(_instruccion, _ambito, _contexto, id);
    // console.log(_instruccion, expresion, 2222222222)
    if (expresion === null || expresion.error) return expresion;
    if (expresion.contextFromVar && _contexto.cadena === Tipos.NONE) _contexto = expresion.contextFromVar;
    let predicate = _instruccion.predicate;
    let root: Contexto = new Contexto();
    if (expresion.tipo === Tipos.ELEMENTOS || expresion.tipo === Tipos.ASTERISCO) {
        root = getSymbolFromRoot(expresion.valor, _contexto, _ambito, predicate, id);
    }
    else if (expresion.tipo === Tipos.ATRIBUTOS) {
        root = getSymbolFromRoot({ id: expresion.valor, tipo: "@" }, _contexto, _ambito, predicate, id);
        if (root.atributos.length === 0) root.notFound = _404;
    }
    else if (expresion.tipo === Tipos.FUNCION_NODE) {
        root = getSymbolFromRoot(expresion.valor, _contexto, _ambito, predicate, id);
        if (root.nodos.length === 0) root.notFound = _404;
    }
    else if (expresion.tipo === Tipos.FUNCION_TEXT) {
        root = getSymbolFromRoot(expresion.valor, _contexto, _ambito, predicate, id);
        if (root.texto.length === 0) root.notFound = _404;
    }
    else if (expresion.tipo === Tipos.SELECT_AXIS) {
        root = Axis.GetAxis(expresion.axisname, expresion.nodetest, expresion.predicate, _contexto, _ambito, false, id);
        return root;
    }
    else {
        return expresion;
        // root.error = { error: "Expresión no válida.", tipo: "Semántico", origen: "Query", linea: _instruccion.linea, columna: _instruccion.columna };
    }
    if (root === null || root.error || root.getLength() === 0) root.notFound = _404;
    return root;
}

function getSymbolFromRoot(_nodename: any, _contexto: Contexto, _ambito: Ambito, _condicion: any, id?: any): Contexto {
    if (_contexto.getLength() > 0)
        return getFromCurrent(_nodename, _contexto, _ambito, _condicion, id);
    else {
        _contexto.error = { error: "Instrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
        return _contexto;
    }
}

// Desde el ámbito actual
function getFromCurrent(_id: any, _contexto: Contexto, _ambito: Ambito, _condicion: any, id?: any): Contexto {
    let retorno = new Contexto();
    if (id) {
        retorno.variable = new Variable(id, Tipos.VARIABLE);
    }
    // Selecciona el texto contenido únicamente en el nodo
    if (_id === "text()") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            if (element.value) {
                retorno.pushText(element.value);
            }
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.texto = filter.filterElements(retorno.texto);
        }
        retorno.cadena = Tipos.TEXTOS;
        return retorno;
    }
    // Selecciona todos los hijos (elementos o texto)
    else if (_id === "node()") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            if (element.childs)
                element.childs.forEach(child => {
                    retorno.nodos.push({ elementos: child });
                });
            else if (element.value)
                retorno.nodos.push({ textos: element.value });
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.nodos = filter.filterElements(retorno.nodos);
        }
        retorno.cadena = Tipos.COMBINADO;
        return retorno;
    }
    // Selecciona todos los hijos (elementos)
    else if (_id === "*") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            if (element.childs) {
                element.childs.forEach(child => {
                    retorno.elementos.push(child);
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
    // Selecciona los atributos
    else if (_id.tipo === "@") {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            if (element.attributes)
                element.attributes.forEach((attribute: Atributo) => {
                    if ((_id.id == attribute.id) || (_id.id === "*")) { // En caso de que sea un @id | @*
                        retorno.atributos.push(attribute);
                    }
                });
        }
        if (_condicion) {
            let filter = new Predicate(_condicion, _ambito, retorno);
            retorno.atributos = filter.filterElements(retorno.atributos);
        }
        retorno.cadena = Tipos.ATRIBUTOS;
        return retorno;
    }
    // Selecciona el padre
    else if (_id === "..") { // Manejar el regreso de atributos a su padre como la etiqueta misma !
        if (_contexto.atributos.length > 0) {
            for (let i = 0; i < _contexto.atributos.length; i++) {
                const attribute = _contexto.atributos[i];
                retorno.elementos = _ambito.searchDadFromAttribute(_ambito.tablaSimbolos[0], attribute, retorno.elementos);
            }
        }
        else if (_contexto.texto.length > 0) {
            for (let i = 0; i < _contexto.texto.length; i++) {
                const text = _contexto.texto[i];
                retorno.elementos = _ambito.searchDadFromText(_ambito.tablaSimbolos[0], text, retorno.elementos);
            }
        }
        else if (_contexto.nodos.length > 0) {
            for (let i = 0; i < _contexto.nodos.length; i++) {
                const node = _contexto.nodos[i].elementos;
                if (node)
                    retorno.elementos = _ambito.searchDadFromNode(_ambito.tablaSimbolos[0], node, retorno.elementos);
            }
        }
        else {
            for (let i = 0; i < _contexto.elementos.length; i++) {
                const dad = _contexto.elementos[i].father;
                if (dad)
                    retorno.elementos = _ambito.searchDad(_ambito.tablaSimbolos[0], dad.id, dad.line, dad.column, retorno.elementos);
            }
        }
        // retorno.elementos = [...new Set(retorno.elementos)];
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
    // Búsqueda en los hijos por id
    else {
        for (let i = 0; i < _contexto.elementos.length; i++) {
            const element = _contexto.elementos[i];
            if (element.childs) {
                element.childs.forEach((child: Element) => {
                    retorno.elementos = _ambito.searchSingleNode(_id, child, retorno.elementos);
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
}

export = Eje;