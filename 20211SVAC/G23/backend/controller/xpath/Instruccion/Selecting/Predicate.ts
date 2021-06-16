import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Atributo } from "../../../../model/xml/Atributo";
import { Element } from "../../../../model/xml/Element";
import { Tipos } from "../../../../model/xpath/Enum";
import Expresion from "../../Expresion/Expresion";

export class Predicate {

    predicado: Array<any>;
    contexto: Array<Element>;
    ambito: Ambito;

    constructor(_predicado: Array<any>, _ambito: Ambito, _contexto: Array<Element>) {
        this.predicado = _predicado;
        this.contexto = _contexto;
        this.ambito = _ambito;
    }

    public set setContext(v: Array<Element>) {
        this.contexto = v;
    }

    filterElements(_resultado: Array<any>) {
        let expresion: any;
        for (let i = 0; i < this.predicado.length; i++) {
            const e = this.predicado[i]; // En caso de tener varios predicados seguidos
            console.log(e, "Predicado")
            expresion = Expresion(e.condicion, this.ambito, this.contexto);
            console.log(expresion, "Expresion predicado")
            if (expresion.error) return expresion;
            if (expresion.tipo === Tipos.NUMBER) {
                let index = parseInt(expresion.valor) - 1;
                if (index < 0 || index >= _resultado.length)
                    _resultado = [];
                else
                    _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Tipos.ATRIBUTOS) {
                let tmp: Array<Element> = [];
                this.contexto = [];
                _resultado.forEach(element => {
                    if (element.attributes)
                        for (let i = 0; i < element.attributes.length; i++) {
                            const attribute: Atributo = element.attributes[i];
                            if (expresion.atributo) { // Es una comparación
                                if (expresion.desigualdad) { // (<,<=,>,>=)
                                    if (expresion.atributo == attribute.id && this.operarDesigualdad(expresion.desigualdad, expresion.condicion, attribute.value)) {
                                        tmp.push(element);
                                        this.contexto.push(element);
                                        break;
                                    }
                                }
                                else if (expresion.exclude) { // (!=)
                                    if (expresion.atributo == attribute.id && expresion.condicion != attribute.value) {
                                        tmp.push(element);
                                        this.contexto.push(element);
                                        break;
                                    }
                                }
                                else if (expresion.atributo == attribute.id && expresion.condicion == attribute.value) { // (==)
                                    tmp.push(element);
                                    this.contexto.push(element);
                                    break;
                                }
                            }
                            else if (expresion.valor == attribute.id || expresion.valor == "*") { // No compara valor, sólo apila
                                tmp.push(element);
                                this.contexto.push(element);
                                break;
                            }
                        }
                });
                _resultado = tmp;
                return _resultado;
            }
            else if (expresion.tipo === Tipos.FUNCION_TEXT) {
                this.contexto = [];
                for (let i = 0; i < _resultado.length; i++) {
                    const element = _resultado[i];
                    let text = element.value;
                    if (text) {
                        if (expresion.exclude) {
                            if (text != expresion.condicion) // text() != 'x'
                                this.contexto.push(element);
                        }
                        else if (text == expresion.condicion) // text() == 'x'
                            this.contexto.push(element);
                    }
                }
                return this.contexto;
            }
            else if (expresion.tipo === Tipos.FUNCION_LAST) {
                let index = _resultado.length - 1;
                _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Tipos.FUNCION_POSITION) {
                return _resultado;
            }
            else if (expresion.tipo === Tipos.RELACIONAL_MENORIGUAL || expresion.tipo === Tipos.RELACIONAL_MENOR) {
                let index = parseInt(expresion.valor) - 1;
                if (index >= _resultado.length) index = _resultado.length - 1;
                let tmp = [];
                for (let i = index; i <= _resultado.length && i >= 0; i--) {
                    const element = _resultado[i];
                    tmp.push(element);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Tipos.RELACIONAL_MAYORIGUAL || expresion.tipo === Tipos.RELACIONAL_MAYOR) {
                let index = parseInt(expresion.valor) - 1;
                if (index >= _resultado.length) { _resultado = []; return _resultado; }
                if (index <= 0) index = 0;
                let tmp = [];
                for (let i = index; i < _resultado.length; i++) {
                    const element = _resultado[i];
                    tmp.push(element);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Tipos.RELACIONAL_IGUAL || expresion.tipo === Tipos.RELACIONAL_DIFERENTE) {
                let flag: boolean = expresion.valor;
                if (!flag)
                    _resultado = [];
            }
            else if (expresion.tipo === Tipos.EXCLUDE) {
                let index = parseInt(expresion.valor) - 1;
                if (index >= 0 && index < _resultado.length) {
                    let tmp = [];
                    for (let i = 0; i < _resultado.length; i++) {
                        const element = _resultado[i];
                        if (i != index) tmp.push(element);
                    }
                    _resultado = tmp;
                }
            }
        }
        this.contexto = _resultado;
        return this.contexto;
    }

    operarDesigualdad(_tipo: Tipos, _condicion: any, _valor: any): boolean {
        switch (_tipo) {
            case Tipos.RELACIONAL_MAYOR:
                return _valor > _condicion;
            case Tipos.RELACIONAL_MAYORIGUAL:
                return _valor >= _condicion;
            case Tipos.RELACIONAL_MENOR:
                return _valor < _condicion;
            case Tipos.RELACIONAL_MENORIGUAL:
                return _valor <= _condicion;
            default:
                return false;
        }
    }

}