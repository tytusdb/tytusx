import { Simbolo } from "./Simbolo";

export class Entorno{
    identificador:string;
    listaSimbolos:Array<Simbolo>;
    texto:string;
    listaEntornos: Array<Entorno>;
    linea: number;
    columna: number;
    pos: number;
    last : boolean;

    constructor(id:string, texto:string, linea:number, columna:number, listaSimbolos:Array<Simbolo>, listaE:Array<Entorno>, last:boolean){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaSimbolos = listaSimbolos;
        this.listaEntornos = listaE
        this.pos = -1;
        this.last = last; 
    }
    
    public setPos(pos: number){
        this.pos= pos;
    }

    public setLast(last: boolean){
        this.last= last;
    }

    public getAtributos(idAtrubito: string) : Simbolo[] {

        var L_atrubitos : Simbolo[] = []; //          

        for (const Simbolo of this.listaSimbolos) {
            
            if (Simbolo.identificador === idAtrubito){
                L_atrubitos.push(Simbolo)
            }
        }

        return L_atrubitos;
    }

    public getAtributo(idAtrubito: string) : Simbolo | null{

        for (const Simbolo of this.listaSimbolos) {
            if (Simbolo.identificador === idAtrubito){
                return Simbolo;
            }
        }
        
        return null;
    }


}