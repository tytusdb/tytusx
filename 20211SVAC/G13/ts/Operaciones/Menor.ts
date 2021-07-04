import { Expresion } from "../Expresion";
import { Literal } from "../Literal";

export class Menor extends Expresion {
    //public tipo: any; //Desbloquear si es interfaz
    //public valor: any;    //Desbloquear si es interfaz
    //public linea: number; //Desbloquear si es interfaz
    //public columna: number;   //Desbloquear si es interfaz
    
    public operacion: string;
    public hI: Expresion;
    public hD: Expresion;

    public constructor(izq: Expresion, der: Expresion, l: number, c: number) {
        super();    //Bloquear si es interfaz
        this.operacion = '+';
        this.hI = izq;
        this.hD = der;
        this.linea = l;
        this.columna = c;
    }
    
    copiarValor(): Expresion {
        return new Menor(this.hI.copiarValor(), this.hD.copiarValor(), this.linea, this.columna);
    }
    
    public getValor(entorno: any): Expresion {
        var res:Literal = new Literal(69,'@ERROR@', this.linea, this.columna);
        var e1 = this.hI.getValor(entorno);
        var e2 = this.hD.getValor(entorno);

        if (e1.tipo == 6 && e1.valor == 'position()') {
            //Verificar que el otro sea nuemro
            if (e2.tipo == 0 || e2.tipo == 1) {
                var result = [];
                for (var i = 1; i < e2.valor; i++) {
                    result.push(entorno[0][i-1]);
                }
                if (result.length > 0) {
                    res.tipo = 100;
                    res.valor = result;
                    return res;
                }
            }
            else {
                //ERROR: tipo2 no compatible para position()
            }
        }
        else if (e2.tipo == 6 && e2.valor == 'position()') {
            if (e1.tipo == 0 || e1.tipo == 1) {
                var result = [];
                for (var i = parseInt(e1.valor.toString()) + 1; i < entorno[0].length + 1; i++) {
                    result.push(entorno[0][i-1]);
                }
                if (result.length > 0) {
                    res.tipo = 100;
                    res.valor = result;
                    return res;
                }
            }
            else {
                //ERROR: tipo2 no compatible para position()
            }
        }
        else {
            //ERROR: tipo1 no es valido para las sumas
        }
        
        return res;
    }
}