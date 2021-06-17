import { Expresion } from "../Expresion";
import { Literal } from "../Literal";

export class Resta extends Expresion {
    //public tipo: any; //Desbloquear si es interfaz
    //public valor: any;    //Desbloquear si es interfaz
    //public linea: number; //Desbloquear si es interfaz
    //public columna: number;   //Desbloquear si es interfaz
    
    public operacion: string;
    public hI: Expresion;
    public hD: Expresion;

    public constructor(izq: Expresion, der: Expresion, l: number, c: number) {
        super();    //Bloquear si es interfaz
        this.operacion = '-';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    
    copiarValor(): Expresion {
        return new Resta(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    }

    getValor(entorno: any): Expresion {
        var res:Literal = new Literal(69,'@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);

        if(e1.tipo == 0) {
            if(e2.tipo == 0) {
                res.tipo = 0;
                res.valor = parseInt(e1.valor.toString()) - parseInt(e2.valor.toString());
                return res;
            } else if(e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseInt(e1.valor.toString()) - parseFloat(e2.valor.toString());
                return res;
            } else {
                //ERROR: tipo2 no es valido para las restas
            }
        } else if(e1.tipo == 1) {
            if(e2.tipo == 0) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) - parseInt(e2.valor.toString());
                return res;
            } else if(e2.tipo == 1) {
                res.tipo = 1;
                res.valor = parseFloat(e1.valor.toString()) - parseFloat(e2.valor.toString());
                return res;
            } else {
                //ERROR: tipo2 no es valido para las restas
            }
        } else {
            //ERROR: tipo1 no es valido para las restas
        }

        return res;
    }
}