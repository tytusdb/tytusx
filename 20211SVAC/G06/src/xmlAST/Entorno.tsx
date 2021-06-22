import { Simbolo } from "./Simbolo";

export class Entorno{
    identificador:string;
    listaSimbolos:Array<Simbolo>;
    texto:string;
    listaEntornos: Array<Entorno>;
    linea: number;
    columna: number;
    pos: number;
    last : number;
    SP:number;


    constructor(id:string, texto:string, linea:number, columna:number, listaSimbolos:Array<Simbolo>, listaE:Array<Entorno>){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaSimbolos = listaSimbolos;
        this.listaEntornos = listaE
        this.pos = -1;
        this.last = -1;
        this.SP = -1;
        this.asignarPosEnts();
        this.asignarPosSimb();
    }
    
    private asignarPosEnts(){
        for (let index = 0; index < this.listaEntornos.length; index++) {
            this.listaEntornos[index].last = this.listaEntornos.length
            this.listaEntornos[index].pos = index;
        }
    }

    private asignarPosSimb(){
        for (let index = 0; index < this.listaSimbolos.length; index++) {
            this.listaSimbolos[index].last = this.listaSimbolos.length;
            this.listaSimbolos[index].pos = index;
        }
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