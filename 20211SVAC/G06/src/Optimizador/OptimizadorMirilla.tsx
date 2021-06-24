import {Asignacion} from "../Optimizador/Asignacion";
import {Optimizado} from "../Optimizador/Optimizado";

var CodigoOptimizado;
var ReporteCodigo;
var asigact;
var cont;

export class OptimizadorMirilla{
    listaobj:Array<any>
    textGraphviz:string;
    textC3D:string;
    constructor(){
        this.listaobj = [];
        this.textGraphviz = "";
        this.textC3D = "";
    }

    Optimizar(listaobj:Array<any>) {
        this.listaobj = listaobj;
        this.textGraphviz = "";
        this.textC3D = "";
        ReporteCodigo = [];
        CodigoOptimizado = [];
        for (const key in this.listaobj) {
            if(this.listaobj[key] instanceof Asignacion) {
                asigact = this.listaobj[key];
                if (!this.Regla6_7_8_9() && !this.Regla10_11_12_13() && !this.Regla14() && !this.Regla15() && !this.Regla16()) {
                    CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador1,asigact.signo,asigact.operador2));
                }
            }
        }
        this.GenerarGraphviz();
        this.GenerarResultado();
    }

    Regla1()    {
        return false;
    }

    Regla2()    {
        return false;
    }
    
    Regla3()    {
        return false;
    }

    Regla4()    {
        return false;
    }
    
    Regla5()    {
        return false;
    }
    
    Regla6_7_8_9()    {
        if (asigact.indice === asigact.operador1) {
            if (asigact.operador2 === "0" && asigact.signo === "+") {
                ReporteCodigo.push(new Optimizado("6",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                return true;
            } else if (asigact.signo === "-" && asigact.operador2 === "0") {
                ReporteCodigo.push(new Optimizado("7",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                return true;
            } else if (asigact.signo === "*" && asigact.operador2 === "1") {
                ReporteCodigo.push(new Optimizado("8",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                return true;
            } else if (asigact.signo === "/" && asigact.operador2 === "1") {
                ReporteCodigo.push(new Optimizado("9",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                return true;
            }
            return false;
        } else if (asigact.indice === asigact.operador2) {
            if (asigact.operador1 === "0" && asigact.signo === "+") {
                ReporteCodigo.push(new Optimizado("6",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                return true;
            } else if (asigact.signo === "*" && asigact.operador1 === "1") {
                ReporteCodigo.push(new Optimizado("8",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                return true;
            }
            return false;
        }
        return false;
    }
    
    Regla10_11_12_13()    {
        if (asigact.operador2 === "1") {
            if (asigact.signo === "+") {
                ReporteCodigo.push(new Optimizado("10",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador1,"",""));
                return true;
            } else if (asigact.signo === "-" ) {
                ReporteCodigo.push(new Optimizado("11",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador1,"",""));
                return true;
            } else if (asigact.signo === "*" ) {
                ReporteCodigo.push(new Optimizado("12",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador1,"",""));
                return true;
            } else if (asigact.signo === "/" ) {
                ReporteCodigo.push(new Optimizado("13",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador1,"",""));
                return true;
            }
            return false;
        } else if (asigact.operador1 === "1") {
            if (asigact.signo === "+") {
                ReporteCodigo.push(new Optimizado("10",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador2 + ";"));
                CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador2,"",""));
                return true;
            } else if (asigact.signo === "*" ) {
                ReporteCodigo.push(new Optimizado("12",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador2 + ";"));
                CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador2,"",""));
                return true;
            }
            return false;
        }
        return false;
    }
    
    Regla14()    {
        if (asigact.operador2 === "2" && asigact.signo === "*") {
            ReporteCodigo.push(new Optimizado("14",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + "*" + asigact.operador1 + ";"));
            CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador1,asigact.signo,asigact.operador1));
            return true;
        } else if (asigact.operador1 === "2" && asigact.signo === "*") {
            ReporteCodigo.push(new Optimizado("14",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador2 + "*" + asigact.operador2 + ";"));
            CodigoOptimizado.push(new Asignacion(asigact.indice,asigact.operador2,asigact.signo,asigact.operador2));
            return true;
        }
        return false;
    }
    
    Regla15()    {
        if (asigact.operador2 === "0" && asigact.signo === "*") {
            ReporteCodigo.push(new Optimizado("15",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=0;"));
            CodigoOptimizado.push(new Asignacion(asigact.indice,"0","",""));
            return true;
        } else if (asigact.operador1 === "0" && asigact.signo === "*") {
            ReporteCodigo.push(new Optimizado("15",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=0;"));
            CodigoOptimizado.push(new Asignacion(asigact.indice,"0","",""));
            return true;
        }
        return false;
    }
    
    Regla16()    {
        if (asigact.operador1 === "0" && asigact.signo === "/") {
            ReporteCodigo.push(new Optimizado("16",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=0;"));
            CodigoOptimizado.push(new Asignacion(asigact.indice,"0","",""));
            return true;
        }
        return false;
    }

    GenerarGraphviz() {
        this.textGraphviz = "";
        this.textGraphviz += "node0[shape=record label=\"{Numero";
        for (const key in ReporteCodigo) {
            this.textGraphviz += "|" + cont;
        }
        this.textGraphviz += "}|{Regla";
        for (const key in ReporteCodigo) {
            this.textGraphviz += "|" + ReporteCodigo[key].regla;
        }
        this.textGraphviz += "}|{Original";
        for (const key in ReporteCodigo) {
            this.textGraphviz += "|" + ReporteCodigo[key].original;
        }
        this.textGraphviz += "}|{Optimizado";
        for (const key in ReporteCodigo) {
            this.textGraphviz += "|" + ReporteCodigo[key].optimizado;
        }
        this.textGraphviz += "}\"];";
    }

    GenerarResultado() {
        this.textC3D = "";
        for (const key in CodigoOptimizado) {
            if (CodigoOptimizado[key] instanceof Asignacion) {
                this.textC3D += CodigoOptimizado[key].indice + "=" + CodigoOptimizado[key].operador1 + CodigoOptimizado[key].signo + CodigoOptimizado[key].operador2 + ";\n";
            }
        }
    }

}