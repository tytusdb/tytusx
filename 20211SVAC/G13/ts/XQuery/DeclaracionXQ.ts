import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { SimboloXQ } from "../Entorno/SimboloXQ";
import { EnumTipo, TipoXQ } from "../Entorno/TipoXQ";
//var Entorno = require("../../../AST/Entorno");

export class DeclaracionXQ extends InstruccionXQ {
    tipo?:TipoXQ;
    id:string;
    valor?:ExpresionXQ;

    constructor(id:string, v:ExpresionXQ, l:number, c:number) {
        super();
        this.id = id;
        this.valor = v;
        this.linea = l;
        this.columna = c;
    }

    setTipo(t: TipoXQ) {
        this.tipo = t;
    }
    
    ejecutar(ent: EntornoXQ): Object {
        if(this.valor != null && this.valor != undefined) {
            let res:ExpresionXQ = this.valor.getValor(ent);
            let sim:SimboloXQ;

            if(this.tipo == null || this.tipo == undefined) {
                if(res.tipo.tipo != EnumTipo.error && res.tipo.tipo != EnumTipo.tvoid &&
                    res.tipo.tipo != EnumTipo.nulo && res.tipo.tipo != EnumTipo.defecto &&
                    res.tipo.tipo != EnumTipo.funcion
                ) {
                    this.tipo = res.tipo;
                    //if(this.tipo.tipo == EnumTipo.XPath) {
                        //let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                        //var retXP = res.valor.Ejecutar(xmlG.valor);
                        ////var st = Entorno.conInicial(retXP);

                        //sim = new SimboloXQ(this.tipo, retXP);
                    //} else {
                        sim = new SimboloXQ(this.tipo, res.valor);
                    //}
                    ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                } else {
                    console.log('ERROR: no se puede asignar a una variable un error');
                }
            } else {
                switch (this.tipo.tipo) {
                    case EnumTipo.entero:
                        if (res.tipo.tipo == EnumTipo.entero) {
                            sim = new SimboloXQ(this.tipo, res.valor);
                            ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                        } else {
                            console.log(`ERROR: no se puede asignar a un entero un ${res.tipo.tipo}`);
                        }
                        break;
                    case EnumTipo.caracter:
                        if (res.tipo.tipo == EnumTipo.caracter) {
                            sim = new SimboloXQ(this.tipo, res.valor);
                            ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                        } else {
                            console.log(`ERROR: no se puede asignar a un caracter un ${res.tipo.tipo}`);
                        }
                        break;
                    case EnumTipo.booleano:
                        if (res.tipo.tipo == EnumTipo.booleano) {
                            sim = new SimboloXQ(this.tipo, res.valor);
                            ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                        } else {
                            console.log(`ERROR: no se puede asignar a un booleano un ${res.tipo.tipo}`);
                        }
                        break;
                    case EnumTipo.doble:
                        if (res.tipo.tipo == EnumTipo.doble) {
                            sim = new SimboloXQ(this.tipo, res.valor);
                            ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                        } else {
                            console.log(`ERROR: no se puede asignar a un doble un ${res.tipo.tipo}`);
                        }
                        break;
                    case EnumTipo.cadena:
                        if (res.tipo.tipo == EnumTipo.cadena) {
                            sim = new SimboloXQ(this.tipo, res.valor);
                            ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                        } else {
                            console.log(`ERROR: no se puede asignar a un string un ${res.tipo.tipo}`);
                        }
                        break;
                    case EnumTipo.XPath:
                        if (res.tipo.tipo == EnumTipo.XPath) {
                            let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                            var retXP = res.valor.Ejecutar(xmlG.valor);
                            //var st = Entorno.conInicial(retXP);

                            sim = new SimboloXQ(this.tipo, retXP);
                            ent.insertar(this.id, sim, this.linea, this.columna, "La variable");
                        } else {
                            console.log(`ERROR: no se puede asignar a un XPath un ${res.tipo.tipo}`);
                        }
                        break;
                }
            }
        } else {
            if(this.tipo == null || this.tipo == undefined) {
                ent.insertar(this.id, new SimboloXQ(new TipoXQ(EnumTipo.defecto), ""), this.linea, this.columna, "La variable");
            } else {
                switch (this.tipo.tipo) {
                    case EnumTipo.entero:
                        ent.insertar(this.id, new SimboloXQ(this.tipo, 0), this.linea, this.columna, 'La variable');
                        break;
                    case EnumTipo.caracter:
                        ent.insertar(this.id, new SimboloXQ(this.tipo, '\0'), this.linea, this.columna, 'La variable');
                        break;
                    case EnumTipo.booleano:
                        ent.insertar(this.id, new SimboloXQ(this.tipo, false), this.linea, this.columna, 'La variable');
                        break;
                    case EnumTipo.doble:
                        ent.insertar(this.id, new SimboloXQ(this.tipo, 0.0), this.linea, this.columna, 'La variable');
                        break;
                    case EnumTipo.cadena:
                        ent.insertar(this.id, new SimboloXQ(this.tipo, ""), this.linea, this.columna, 'La variable');
                        break;
                    case EnumTipo.XPath:
                        ent.insertar(this.id, new SimboloXQ(this.tipo, []), this.linea, this.columna, 'La variable');
                        break;
                }
            }
        }

        return null;
    }
}