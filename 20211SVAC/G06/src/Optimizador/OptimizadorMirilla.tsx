import {Asignacion} from "../Optimizador/Asignacion";
import {Condicional} from "../Optimizador/Condicional";
import {Optimizado} from "../Optimizador/Optimizado";

var asigact;
var val1 = 0;
var val2 = 0;

export class OptimizadorMirilla{
    textGraphviz:string;
    Resultado:string;
    ReporteCodigo:Array<Optimizado>;
    NuevoVal:string;
    constructor(){
        this.textGraphviz = "";
        this.Resultado = "";
        this.ReporteCodigo = [];
        this.NuevoVal = "";
    }

    Optimizar(Objeto:any) {
        asigact = Objeto;
        if(Objeto instanceof Asignacion) {
            if (!this.Regla6_7_8_9() && !this.Regla10_11_12_13() && !this.Regla14() && !this.Regla15() && !this.Regla16()) {
                return Objeto.indice + " = " + Objeto.operador1 + " " + Objeto.signo + " " + Objeto.operador2 + ";\n";
            } else {
                return this.NuevoVal;
            }
        } else if (typeof Objeto === 'string') {
            this.Regla1();
            return this.NuevoVal;
        } else if (Objeto instanceof Condicional)   {
            if (!this.Regla3()) {
                return "if("+asigact.operando1+asigact.comparacion+asigact.operando2+") ";
            } else {
                return this.NuevoVal;
            }
        }
    }

    Reset() {
        asigact = "";
        this.NuevoVal = "";
        this.ReporteCodigo = [];
    }

    Regla1()    {
        this.ReporteCodigo.push(new Optimizado("1",asigact,"Se elimina la instruccion"));
        this.NuevoVal = "";
        return false;
    }

    Regla2()    {
        return false;
    }
    
    Regla3()    {
        try {
            val1 = parseInt(asigact.operando1);
            val2 = parseInt(asigact.operando2);
            if(asigact.comparacion === "==") {
                if (asigact.operando1 === asigact.operando2) {
                    this.ReporteCodigo.push(new Optimizado("3","if("+asigact.operando1+asigact.comparacion+asigact.operando2+")","Se elimina la instruccion"));
                    this.NuevoVal = "";
                    return true;
                }
                return false;
            } else if (asigact.comparacion === "!=") {
                if (asigact.operando1 !== asigact.operando2) {
                    this.ReporteCodigo.push(new Optimizado("3","if("+asigact.operando1+asigact.comparacion+asigact.operando2+")","Se elimina la instruccion"));
                    this.NuevoVal = "";
                    return true;
                }
                return false;
            } else if (asigact.comparacion === ">=") {
                if (asigact.operando1 >= asigact.operando2) {
                    this.ReporteCodigo.push(new Optimizado("3","if("+asigact.operando1+asigact.comparacion+asigact.operando2+")","Se elimina la instruccion"));
                    this.NuevoVal = "";
                    return true;
                }
                return false;
            } else if (asigact.comparacion === "<=") {
                if (asigact.operando1 <= asigact.operando2) {
                    this.ReporteCodigo.push(new Optimizado("3","if("+asigact.operando1+asigact.comparacion+asigact.operando2+")","Se elimina la instruccion"));
                    this.NuevoVal = "";
                    return true;
                }
                return false;
            } else if (asigact.comparacion === "<") {
                if (asigact.operando1 < asigact.operando2) {
                    this.ReporteCodigo.push(new Optimizado("3","if("+asigact.operando1+asigact.comparacion+asigact.operando2+")","Se elimina la instruccion"));
                    this.NuevoVal = "";
                    return true;
                }
                return false;
            } else if (asigact.comparacion === ">") {
                if (asigact.operando1 > asigact.operando2) {
                    this.ReporteCodigo.push(new Optimizado("3","if("+asigact.operando1+asigact.comparacion+asigact.operando2+")","Se elimina la instruccion"));
                    this.NuevoVal = "";
                    return true;
                }
                return false;
            }
            return false;
        } catch (error) {
            return false;
        }
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
                this.ReporteCodigo.push(new Optimizado("6",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                this.NuevoVal = "";
                return true;
            } else if (asigact.signo === "-" && asigact.operador2 === "0") {
                this.ReporteCodigo.push(new Optimizado("7",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                this.NuevoVal = "";
                return true;
            } else if (asigact.signo === "*" && asigact.operador2 === "1") {
                this.ReporteCodigo.push(new Optimizado("8",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                this.NuevoVal = "";
                return true;
            } else if (asigact.signo === "/" && asigact.operador2 === "1") {
                this.ReporteCodigo.push(new Optimizado("9",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                this.NuevoVal = "";
                return true;
            }
            return false;
        } else if (asigact.indice === asigact.operador2) {
            if (asigact.operador1 === "0" && asigact.signo === "+") {
                this.ReporteCodigo.push(new Optimizado("6",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                this.NuevoVal = "";
                return true;
            } else if (asigact.signo === "*" && asigact.operador1 === "1") {
                this.ReporteCodigo.push(new Optimizado("8",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,"Se elimina la instruccion"));
                this.NuevoVal = "";
                return true;
            }
            return false;
        }
        return false;
    }
    
    Regla10_11_12_13()    {
        if (asigact.operador2 === "0" && asigact.operador1 !== asigact.indice) {
            if (asigact.signo === "+") {
                this.ReporteCodigo.push(new Optimizado("10",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                this.NuevoVal = asigact.indice + " = " + asigact.operador1 + ";\n";
                return true;
            } else if (asigact.signo === "-" ) {
                this.ReporteCodigo.push(new Optimizado("11",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                this.NuevoVal = asigact.indice + " = " + asigact.operador1 + ";\n";
                return true;
            } 
            return false;
        } else if (asigact.operador1 === "0" && asigact.operador2 !== asigact.indice) {
            if (asigact.signo === "+") {
                this.ReporteCodigo.push(new Optimizado("10",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador2 + ";"));
                this.NuevoVal = asigact.indice + " = " + asigact.operador2 + ";\n";
                return true;
            } 
            return false;
        } else if (asigact.operador2 === "1" && asigact.operador1 !== asigact.indice) {
            if (asigact.signo === "*" ) {
                this.ReporteCodigo.push(new Optimizado("12",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                this.NuevoVal = asigact.indice + " = " + asigact.operador1 + ";\n";
                return true;
            } else if (asigact.signo === "/" ) {
                this.ReporteCodigo.push(new Optimizado("13",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + ";"));
                this.NuevoVal = asigact.indice + " = " + asigact.operador1 + ";\n";
                return true;
            }
        } else if (asigact.operador1 === "1" && asigact.operador2 !== asigact.indice) {
            if (asigact.signo === "*" ) {
                this.ReporteCodigo.push(new Optimizado("12",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador2 + ";"));
                this.NuevoVal = asigact.indice + " = " + asigact.operador2 + ";\n";
                return true;
            }
            return false;
        }
        return false;
    }
    
    Regla14()    {
        if (asigact.operador2 === "2" && asigact.signo === "*") {
            this.ReporteCodigo.push(new Optimizado("14",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador1 + "*" + asigact.operador1 + ";"));
            this.NuevoVal = asigact.indice + " = " + asigact.operador1 + " " + asigact.signo + " " + asigact.operador1 + ";\n";
            return true;
        } else if (asigact.operador1 === "2" && asigact.signo === "*") {
            this.ReporteCodigo.push(new Optimizado("14",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=" + asigact.operador2 + "*" + asigact.operador2 + ";"));
            this.NuevoVal = asigact.indice + " = " + asigact.operador2 + " " + asigact.signo + " " + asigact.operador2 + ";\n";
            return true;
        }
        return false;
    }
    
    Regla15()    {
        if (asigact.operador2 === "0" && asigact.signo === "*") {
            this.ReporteCodigo.push(new Optimizado("15",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=0;"));
            this.NuevoVal = asigact.indice + " = 0;\n";
            return true;
        } else if (asigact.operador1 === "0" && asigact.signo === "*") {
            this.ReporteCodigo.push(new Optimizado("15",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=0;"));
            this.NuevoVal = asigact.indice + " = 0;\n";
            return true;
        }
        return false;
    }
    
    Regla16()    {
        if (asigact.operador1 === "0" && asigact.signo === "/") {
            this.ReporteCodigo.push(new Optimizado("16",asigact.indice + "=" + asigact.operador1 + asigact.signo + asigact.operador2,asigact.indice + "=0;"));
            this.NuevoVal = asigact.indice + " = 0;\n";
            return true;
        }
        return false;
    }

    GenerarGraphviz() {
        console.log(this.ReporteCodigo);
        this.textGraphviz = "";
        this.textGraphviz += "node0[shape=record label=\"{Numero";
        for (const key in this.ReporteCodigo) {
            this.textGraphviz += "|" + key;
        }
        this.textGraphviz += "}|{Regla";
        for (const key in this.ReporteCodigo) {
            this.textGraphviz += "|" + this.ReporteCodigo[key].regla;
        }
        this.textGraphviz += "}|{Original";
        for (const key in this.ReporteCodigo) {
            this.textGraphviz += "|" + this.ReporteCodigo[key].original;
        }
        this.textGraphviz += "}|{Optimizado";
        for (const key in this.ReporteCodigo) {
            this.textGraphviz += "|" + this.ReporteCodigo[key].optimizado;
        }
        this.textGraphviz += "}\"];";
    }

}



