import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { NativaXQuery } from "../Traduccion/TranslateXQuery";
export class DeclaracionFor {
    constructor(tipo, identificador, consultas, linea, columna, at, desde, hasta, listaEnteros) {
        this.linea = linea;
        this.columna = columna;
        this.listaEnteros = listaEnteros;
        this.tipo = tipo;
        this.identificador = identificador;
        this.consultas = consultas;
        this.desde = desde;
        this.hasta = hasta;
        this.at = at;
    }
    getCodigo3Dir(XQueryEnt, xmlEnt, traductorXPath, traductorXQuery) {
        let code = "";
        switch (this.tipo) {
            case TipoFor.NORMAL:
                //Declarar temp donde voy a guardar $id en el stack
                let temporal = 'tq' + traductorXQuery.contT;
                code += '\n\t' + temporal + " = HQ;\n";
                traductorXQuery.contT++;
                //Obtener la consulta.
                if (this.consultas != null) {
                    this.consultas.forEach((con) => {
                        let resp = con.ejecutar(xmlEnt);
                        let id = XQueryEnt.obtenerSimbolo(this.identificador);
                        id.setPosicion(traductorXQuery.contSQ);
                        traductorXQuery.contSQ++;
                        //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
                        code += '\tXQHeap[(int)HQ] = -13;\n';
                        code += '\t HQ = HQ + 1;\n';
                        resp.forEach((s) => {
                            if (!(typeof s === "string")) {
                                //Es una lista de simbolos.
                                code += "\t/*--- TRASLADANDO " + s.nombre + " HACIA EL HEAP DEL XQUERY --- */\n";
                                code += '\t H = stack[(int)' + s.posicion + ']; \n';
                                //H tiene la posicion del heap (xml) donde inicia el simbolo.
                                //2. Llamar a funcion para que escribe el simbolo en el heap del xpath.
                                code += '\tfromHeapToXQHeap();\n';
                                if (traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.FROMHEAPTOXQHEAP) === -1) {
                                    //Agregar a la lista de funciones que se utilizaran.
                                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.FROMHEAPTOXQHEAP);
                                }
                            }
                            else {
                                //Es cadena...
                                code += traductorXQuery.StringToHeap(s, this.identificador);
                            }
                        });
                        //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
                        code += '\tXQHeap[(int)HQ] = -13;\n';
                        code += '\t HQ = HQ + 1;\n';
                        code += '\t/*--- GUARDAR EN STACK DE XQUERY --*/\n';
                        code += '\t\nXQStack[(int)SQ] = ' + temporal + ';\n';
                        code += '\tSQ = SQ + 1;\n';
                    });
                }
                break;
        }
        return code;
    }
    getTipo() {
        return this.tipo;
    }
    TipoToString() {
        switch (this.tipo) {
            case TipoFor.NORMAL:
                return "Normal";
            case TipoFor.ITERATIVO:
                return "Iterativo";
            case TipoFor.AT:
                return "At";
        }
    }
    ejecutar(XQueryEnt, xmlEnt) {
        let listaSimbolos = [];
        let newSimb;
        switch (this.tipo) {
            case TipoFor.NORMAL:
                //ej: $x in /bookstore/book/asd
                console.log("for Normal");
                if (this.consultas != null) {
                    this.consultas.forEach((consulta) => {
                        listaSimbolos = listaSimbolos.concat(consulta.ejecutar(xmlEnt));
                    });
                }
                //A la variable $x (identificador) asignarle estos simbolos.
                newSimb = new Simbolo(Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                break;
            case TipoFor.ITERATIVO:
                //ej: $x in (3 to 5) o $x in (3, 4, 10, 200, 2, 1)
                if (this.desde && this.hasta != null) {
                    for (let i = this.desde; i <= this.hasta; i++) {
                        listaSimbolos.push(i);
                    }
                    let newSimb = new Simbolo(Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                    XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                }
                else if (this.listaEnteros != undefined) {
                    let newSimb = new Simbolo(Tipo.XQ_VAR, this.identificador, this.listaEnteros, this.linea, this.columna);
                    XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                }
                break;
            case TipoFor.AT:
                //ej: $x at $i in /bookstore/book/asd <-- $i, counts the iteration.
                let contador = 0;
                if (this.consultas != null) {
                    this.consultas.forEach((consulta) => {
                        let resp = consulta.ejecutar(xmlEnt);
                        contador += resp.length;
                        listaSimbolos = listaSimbolos.concat(resp);
                    });
                }
                //A la variable '$i' asignarle la longitud de mis consultas de resultado.
                let simbI = new Simbolo(Tipo.XQ_NUMB, this.identificador, contador, this.linea, this.columna);
                //A la variable $x (identificador) asignarle estos simbolos.
                newSimb = new Simbolo(Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                break;
        }
    }
}
export var TipoFor;
(function (TipoFor) {
    TipoFor[TipoFor["NORMAL"] = 0] = "NORMAL";
    TipoFor[TipoFor["ITERATIVO"] = 1] = "ITERATIVO";
    TipoFor[TipoFor["AT"] = 2] = "AT";
})(TipoFor || (TipoFor = {}));
