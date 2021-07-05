import { ExpresionXQ } from "../Arbol/ExpresionXQ";
import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { SimboloXQ } from "../Entorno/SimboloXQ";
import { EnumTipo } from "../Entorno/TipoXQ";

export class AsignacionXQ extends InstruccionXQ {
    id:string;
    valor:ExpresionXQ;
    acceso?:ExpresionXQ;

    constructor(id:string, l:number, c:number, v:ExpresionXQ) {
        super();
        this.id = id;
        this.linea = l;
        this.columna = c;
        this.valor = v;
    }

    ejecutar(ent: EntornoXQ): Object {
        let sim:SimboloXQ = ent.buscar(this.id, this.linea, this.columna, 'La variable');
        if(sim != null && sim != undefined) {
            let res:ExpresionXQ = this.valor.getValor(ent);

            switch (sim.tipo.tipo) {
                case EnumTipo.defecto:
                    if(res.tipo.tipo != EnumTipo.error && res.tipo.tipo != EnumTipo.tvoid &&
                        res.tipo.tipo != EnumTipo.nulo && res.tipo.tipo != EnumTipo.defecto &&
                        res.tipo.tipo != EnumTipo.funcion
                    ) {
                        sim.tipo = res.tipo;
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case EnumTipo.entero:
                    if (res.tipo.tipo == EnumTipo.entero) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case EnumTipo.doble:
                    if (res.tipo.tipo == EnumTipo.doble) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case EnumTipo.caracter:
                    if (res.tipo.tipo == EnumTipo.caracter) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case EnumTipo.cadena:
                    if (res.tipo.tipo == EnumTipo.cadena) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case EnumTipo.booleano:
                    if (res.tipo.tipo == EnumTipo.booleano) {
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
                case EnumTipo.XPath:
                    if (res.tipo.tipo == EnumTipo.XPath) {
                        //let xmlG = ent.buscar("#XML#", this.linea, this.columna, 'El objeto XML');
                        //var retXP = res.valor.Ejecutar(xmlG.valor);
                        //var st = Entorno.conInicial(retXP);
                        sim.valor = res.valor;
                        return null;
                    }
                    break;
            }
            console.log('Error al asignar tipos a la variable \'' + this.id + '\'');
            //ERRORES
        }

        return null;
    }
}