import { InstruccionXQ } from "../Arbol/InstruccionXQ";
import { EntornoXQ } from "../Entorno/Entorno";
import { SimboloXQ } from "../Entorno/SimboloXQ";
import { EnumTipo, TipoXQ } from "../Entorno/TipoXQ";
import { BloqueXQ } from "../Instrucciones/Bloque";
import { ParametroXQ } from "./ParametroXQ";

export class FuncionXQ extends InstruccionXQ {
    tipo:TipoXQ;
    nombre:string;
    listaP:[ParametroXQ];
    listaI:BloqueXQ;

    constructor(n:string, lp:[ParametroXQ], b:BloqueXQ, l:number, c:number) {
        super();
        this.nombre = n;
        this.listaP = lp;
        this.listaI = b;
        this.linea = l;
        this.columna = c;
        this.tipo = new TipoXQ(EnumTipo.tvoid);
    }
    
    setTipo(t:TipoXQ) {
        this.tipo = t;
    }

    ejecutar(ent: EntornoXQ): Object {
        let auxNombre:string = '$' + this.nombre;
        this.listaP.forEach(param => {
            auxNombre += '_' + param.tipo.tipo;
        });
        
        let sim:SimboloXQ = new SimboloXQ(this.tipo, this);
        ent.insertar(auxNombre, sim, this.linea, this.columna, 'La funcion');
        
        return null;
    }
}