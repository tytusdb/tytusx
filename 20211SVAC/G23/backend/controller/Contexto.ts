import { Element } from "../model/xml/Element";
import { Atributo } from "../model/xml/Atributo";
import { Tipos } from "../model/xpath/Enum";
import { Variable } from "../model/xml/Ambito/Variable";

export class Contexto {

    elementos: Array<Element>;
    atributos: Array<Atributo>;
    texto: Array<string>;
    nodos: Array<any>;
    cadena: Tipos;
    error: any;
    notFound: any;

    // Numéricos
    items: Array<number>;

    // XQuery Vars
    variable?: Variable;
    atCounter?: Variable;

    tablaVariables: Array<Variable>;

    constructor(_context?: Contexto, _variables?: Array<Variable>) {
        if (_context) {
            this.elementos = _context.elementos;
            this.atributos = _context.atributos;
            this.texto = _context.texto;
            this.nodos = _context.nodos;
            this.cadena = _context.cadena;
            this.items = _context.items;
            if (_context.variable) this.variable = _context.variable;
            if (_context.atCounter) this.atCounter = _context.atCounter;
            this.tablaVariables = _context.tablaVariables;
        }
        else {
            this.elementos = [];
            this.atributos = [];
            this.texto = [];
            this.nodos = [];
            this.items = [];
            this.cadena = Tipos.NONE;
            this.tablaVariables = [];
        }
        if (_variables) {
            this.tablaVariables = _variables;
        }
        this.error = this.notFound = null;
    }

    addVariable(_variable: Variable) {
        let exists = this.existeVariable(_variable.id);
        if (exists !== -1) {
            this.tablaVariables[exists] = _variable;
        }
        else {
            this.tablaVariables.unshift(_variable);
        }
    }

    existeVariable(_id: string): number {
        for (let i = 0; i < this.tablaVariables.length; i++) {
            const variable = this.tablaVariables[i];
            if (_id == variable.id && (variable.contexto || variable.valor))
                return i;
        }
        return -1;
    }

    getVar(_id: string): Variable | null {
        for (let i = 0; i < this.tablaVariables.length; i++) {
            const variable = this.tablaVariables[i];
            if (_id == variable.id && (variable.contexto || variable.valor))
                return variable;
        }
        return null;
    }

    pushElement(_v: Element) {
        this.elementos.push(_v);
    }

    pushAttribute(_v: Atributo) {
        this.atributos.push(_v);
    }

    pushText(_v: string) {
        this.texto.push(_v);
    }

    pushNode(_v: any) {
        this.nodos.push(_v);
    }

    pushItem(_v: number) {
        this.items.push(_v);
    }

    removeDuplicates() { // Elimina duplicados
        if (this.elementos.length > 0) {
            this.elementos = this.elementos.filter((v, i, a) => a.findIndex(t => (t.line === v.line && t.column === v.column)) === i);
        }
    }

    removeDadDuplicates(): Array<any> {
        this.removeDuplicates();
        if (this.atributos.length > 0)
            this.atributos = this.atributos.filter((v, i, a) => a.findIndex(t => (t.line === v.line)) === i);
        this.elementos = this.elementos.filter((v, i, a) => a.findIndex(t => (t.father.line === v.father.line && t.father.column === v.father.column)) === i);
        return this.getArray();
    }

    /* addArray(_array: Array<any>) {
        if (this.atributos.length > 0)
            this.atributos = _array;
        else if (this.elementos.length > 0)
            this.elementos = _array;
        else if (this.texto.length > 0)
            this.texto = _array;
        else if (this.nodos.length > 0)
            this.nodos = _array;
    } */

    getLength(): number {
        if (this.items.length > 0)
            return this.items.length;
        if (this.atributos.length > 0)
            return this.atributos.length;
        if (this.elementos.length > 0)
            return this.elementos.length;
        if (this.texto.length > 0)
            return this.texto.length;
        if (this.nodos.length > 0)
            return this.nodos.length;
        return 0;
    }

    getArray(): Array<any> {
        if (this.atributos.length > 0)
            return this.atributos;
        if (this.elementos.length > 0)
            return this.elementos;
        if (this.texto.length > 0)
            return this.texto;
        if (this.nodos.length > 0)
            return this.nodos;
        return [];
    }

    public set setCadena(v: Tipos) {
        this.cadena = v;
    }

    public set setElements(v: Array<Element>) {
        this.elementos = v;
    }

    public set setAttributes(v: Array<Atributo>) {
        this.atributos = v;
    }

    public set setTexto(v: Array<string>) {
        this.texto = v;
    }

    public set setNodos(v: Array<any>) {
        this.nodos = v;
    }

}
