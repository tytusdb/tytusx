import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TraduceXML } from "../Traduccion/TraduceXML";
import { TranslateXPath } from "../Traduccion/TranslateXPath";
import { NativaXQuery, TranslateXQuery } from "../Traduccion/TranslateXQuery";
import { Consulta } from "../XPath/Consulta";

export class DeclaracionFor implements InstruccionXQuery{
    linea: number;
    columna: number;
    tipo: TipoFor;
    identificador: string;
    consultas: Array<Consulta> | null;
    desde: number | undefined; 
    hasta: number  | undefined;
    listaEnteros: Array<Number> | undefined;
    at: string | undefined;
    constructor(tipo: TipoFor, identificador: string, consultas: Array<Consulta>, linea: number, columna: number, at?: string|undefined, desde?:number, hasta?:number, listaEnteros?: Array<Number>){
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

    getCodigo3Dir(XQueryEnt: Entorno, xmlEnt: Entorno, traductorXPath: TranslateXPath, traductorXQuery: TranslateXQuery): string{
        let code = "";

        switch(this.tipo){
            case TipoFor.NORMAL:
                //Declarar temp donde voy a guardar $id en el stack
                let temporal = 'tq'+traductorXQuery.contT;
                code += '\n\t'+temporal+" = HQ;\n";
                traductorXQuery.contT++;
                //Obtener la consulta.
                if(this.consultas != null){
                    this.consultas.forEach((con: Consulta) => {
                        let resp = con.ejecutar(xmlEnt);
                        let id: Simbolo = XQueryEnt.obtenerSimbolo(this.identificador);
                        id.setPosicion(traductorXQuery.contSQ);
                        traductorXQuery.contSQ++;
                        //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
                        code += '\tXQHeap[(int)HQ] = -13;\n';   
                        code += '\t HQ = HQ + 1;\n';                
                        resp.forEach((s: any) => {
                            if(!(typeof s === "string")){
                                //Es una lista de simbolos.
                                code += "\t/*--- TRASLADANDO "+s.nombre+" HACIA EL HEAP DEL XQUERY --- */\n"                                
                                code  += '\t H = stack[(int)'+s.posicion+']; \n';
                                //H tiene la posicion del heap (xml) donde inicia el simbolo.
                                //2. Llamar a funcion para que escribe el simbolo en el heap del xpath.
                                code += '\tfromHeapToXQHeap();\n'
                                if(traductorXQuery.funcionesUtilizadas.indexOf(NativaXQuery.FROMHEAPTOXQHEAP) === -1){
                                    //Agregar a la lista de funciones que se utilizaran.
                                    traductorXQuery.funcionesUtilizadas.push(NativaXQuery.FROMHEAPTOXQHEAP);
                                }                                

                            }else{
                                //Es cadena...
                                code += traductorXQuery.StringToHeap(s, this.identificador)
                            }
                        })
                        //2.5 Poner un -13 de referencia para saber donde inicia  y termina este simbolo del XQUERY
                        code += '\tXQHeap[(int)HQ] = -13;\n';   
                        code += '\t HQ = HQ + 1;\n';  
                        code += '\t/*--- GUARDAR EN STACK DE XQUERY --*/\n'
                        code += '\t\nXQStack[(int)SQ] = '+temporal+';\n'
                        code += '\tSQ = SQ + 1;\n'                                                
                    });
            }
                break;
        }
        return code;
    }

    getTipo(): TipoFor{
        return this.tipo;
    }

    TipoToString(): String{
        switch(this.tipo){
            case TipoFor.NORMAL:
                return "Normal";
            case TipoFor.ITERATIVO:
                return "Iterativo";
            case TipoFor.AT:
                return "At";
        }
    }

    ejecutar(XQueryEnt: Entorno, xmlEnt: Entorno){
        let listaSimbolos: Array<any> = [];
        let newSimb: Simbolo;
        switch(this.tipo){
            case TipoFor.NORMAL:
                //ej: $x in /bookstore/book/asd
                console.log("for Normal");
                if(this.consultas != null){
                    this.consultas.forEach((consulta: Consulta) => {
                        listaSimbolos = listaSimbolos.concat(consulta.ejecutar(xmlEnt))
                    });
                 }
                 //A la variable $x (identificador) asignarle estos simbolos.
                 newSimb = new Simbolo(Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);
                
                 XQueryEnt.agregarSimbolo(this.identificador, newSimb);
                 
                break;
            case TipoFor.ITERATIVO:
                //ej: $x in (3 to 5) o $x in (3, 4, 10, 200, 2, 1)
                if(this.desde && this.hasta != null){
                    for(let i = this.desde; i <= this.hasta; i++){
                        listaSimbolos.push(i);
                    }
                    let newSimb: Simbolo = new Simbolo(Tipo.XQ_VAR, this.identificador, listaSimbolos, this.linea, this.columna);                    
                    XQueryEnt.agregarSimbolo(this.identificador, newSimb);                    
                }else if(this.listaEnteros != undefined){
                    let newSimb: Simbolo = new Simbolo(Tipo.XQ_VAR, this.identificador, this.listaEnteros, this.linea, this.columna);                    
                    XQueryEnt.agregarSimbolo(this.identificador, newSimb);                     
                }
                
                break;
            case TipoFor.AT:
                //ej: $x at $i in /bookstore/book/asd <-- $i, counts the iteration.
                let contador = 0;
                if(this.consultas != null){
                    this.consultas.forEach((consulta: Consulta) => {
                        let resp = consulta.ejecutar(xmlEnt);
                        contador += resp.length;
                        listaSimbolos = listaSimbolos.concat(resp)
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

export enum TipoFor{
    NORMAL,
    ITERATIVO,
    AT
}