import { Ambito } from "../../../../model/xml/Ambito/Ambito";
import { Atributo } from "../../../../model/xml/Atributo";
import { Tipos } from "../../../../model/xpath/Enum";
import { Contexto } from "../../../Contexto";
import Expresion from "../../Expresion/Expresion";

export class Predicate {

    predicado: Array<any>;
    contexto: Contexto;
    ambito: Ambito;

    constructor(_predicado: Array<any>, _ambito: Ambito, _contexto: Contexto) {
        this.predicado = _predicado;
        this.contexto = _contexto;
        this.ambito = _ambito;
    }

    filterElements(_resultado: Array<any>) {
        let expresion: any;
        for (let i = 0; i < this.predicado.length; i++) {
            const e = this.predicado[i]; // En caso de tener varios predicados seguidos
            // console.log(e, "Predicado")
            let condicion = e.condicion;
            if (Array.isArray(e.condicion)) condicion = e.condicion[0];
            // console.log(condicion, "Predicado")
            expresion = Expresion(condicion, this.ambito, this.contexto, this.contexto.variable?.id);
            // console.log(expresion, "Expresion predicado")
            if (expresion.error) return expresion;
            if (expresion.tipo === Tipos.NUMBER) {
                let index = parseInt(expresion.valor) - 1;
                if (index < 0 || index >= _resultado.length)
                    _resultado = [];
                else
                    _resultado = [_resultado[index]];
            }
            else if (expresion.tipo === Tipos.ATRIBUTOS) {
                this.contexto.elementos = [];
                _resultado.forEach(element => {
                    if (element.attributes)
                        for (let i = 0; i < element.attributes.length; i++) {
                            const attribute: Atributo = element.attributes[i];
                            if (expresion.atributo) { // Es una comparación
                                if (expresion.desigualdad) { // (<,<=,>,>=)
                                    if (expresion.atributo == attribute.id && this.operarDesigualdad(expresion.desigualdad, expresion.condicion, attribute.value)) {
                                        this.contexto.elementos.push(element);
                                        break;
                                    }
                                }
                                else if (expresion.exclude) { // (!=)
                                    if (expresion.atributo == attribute.id && expresion.condicion != attribute.value) {
                                        this.contexto.elementos.push(element);
                                        break;
                                    }
                                }
                                else if (expresion.atributo == attribute.id && expresion.condicion == attribute.value) { // (==)
                                    this.contexto.elementos.push(element);
                                    break;
                                }
                            }
                            else if (expresion.valor == attribute.id || expresion.valor == "*") { // No compara valor, sólo apila
                                this.contexto.elementos.push(element);
                                break;
                            }
                        }
                });
                return this.contexto.elementos;
            }
            else if (expresion.tipo === Tipos.FUNCION_TEXT) {
                this.contexto.elementos = [];
                for (let i = 0; i < _resultado.length; i++) {
                    const element = _resultado[i];
                    let text = element.value;
                    if (text) {
                        if (expresion.exclude) {
                            if (text != expresion.condicion) // text() != 'x'
                                this.contexto.elementos.push(element);
                        }
                        else if (text == expresion.condicion) // text() == 'x'
                            this.contexto.elementos.push(element);
                    }
                }
                return this.contexto.elementos;
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
            else if (expresion.tipo === Tipos.ELEMENTOS && expresion.e1 && expresion.e2) {
                const e1 = expresion.e1;
                const e2 = expresion.e2;
                let condition: boolean = false;
                let tmp = [];
                for (let i = 0; i < this.contexto.elementos.length; i++) {
                    const element = this.contexto.elementos[i];
                    if (element.attributes) { // Hace match con un atributo
                        for (let j = 0; j < element.attributes.length; j++) {
                            const attribute = element.attributes[j];
                            condition = this.verificarDesigualdad(expresion.desigualdad, attribute.id, e1, attribute.value, e2);
                            if (condition) {
                                tmp.push(element);
                                break; // Sale del ciclo de atributos para pasar al siguiente elemento
                            }
                        }
                    }
                    if (element.childs) { // Hace match con algún hijo
                        for (let j = 0; j < element.childs.length; j++) {
                            const child = element.childs[j];
                            condition = this.verificarDesigualdad(expresion.desigualdad, child.id_open, e1, child.value, e2);
                            if (condition) {
                                tmp.push(element);
                                break;
                            }
                        }
                    }
                    // Hace match con el elemento
                    condition = this.verificarDesigualdad(expresion.desigualdad, element.id_open, e1, element.value, e2);
                    if (condition)
                        tmp.push(element);
                }
                _resultado = tmp;
            }
            else if (expresion.tipo === Tipos.LOGICA_OR || expresion.tipo === Tipos.LOGICA_AND) {
                _resultado = expresion.elementos;
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
            else if (Array.isArray(expresion)) {
                this.contexto.elementos = [];
                expresion.forEach((context: Contexto) => {
                    this.contexto.elementos = this.contexto.elementos.concat(context.elementos);
                });
                return this.contexto.elementos;
            }
        }
        if (this.contexto.atributos.length > 0)
            this.contexto.atributos = _resultado;
        else if (this.contexto.texto.length > 0)
            this.contexto.texto = _resultado;
        else if (this.contexto.nodos.length > 0)
            this.contexto.nodos = _resultado;
        else
            this.contexto.elementos = _resultado;
        return _resultado;
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

    verificarDesigualdad(_tipo: Tipos, v1: any, e1: any, v2: any, e2: any): boolean {
        switch (_tipo) {
            case Tipos.RELACIONAL_MAYOR:
                return (v1 == e1 && v2 > e2);
            case Tipos.RELACIONAL_MAYORIGUAL:
                return (v1 == e1 && v2 >= e2);
            case Tipos.RELACIONAL_MENOR:
                return (v1 == e1 && v2 < e2);
            case Tipos.RELACIONAL_MENORIGUAL:
                return (v1 == e1 && v2 <= e2);
            case Tipos.RELACIONAL_IGUAL:
                return (v1 == e1 && v2 == e2);
            case Tipos.RELACIONAL_DIFERENTE:
                return (v1 == e1 && v2 != e2);
            default:
                return false;
        }
    }

}