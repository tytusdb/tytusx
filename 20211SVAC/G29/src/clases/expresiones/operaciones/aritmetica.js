import { tipo } from "src/clases/ast/tipo";
import Function from "src/clases/instrucciones/xquery/function";
import { InsertarError } from "src/reports/ReportController";
export default class aritmetica {
    constructor(e1, operador, e2, linea, columna, expU) {
        this.e1 = e1;
        this.operador = operador;
        this.e2 = e2;
        this.linea = linea;
        this.columna = columna;
        this.expU = expU;
    }
    getTipo(ent, arbol) {
        return this.tipo_;
    }
    getValor(ent, arbol) {
        let val1;
        let val2;
        let valU;
        if (this.expU) {
            valU = this.e1.getValor(ent, arbol);
        }
        else {
            if (this.e1 instanceof Function && this.e2 instanceof Function) {
                val1 = this.e1.ejecutar(ent, arbol);
                val2 = this.e2.ejecutar(ent, arbol);
            }
            else if (this.e1 instanceof Function) {
                val1 = this.e1.ejecutar(ent, arbol);
                val2 = this.e2.getValor(ent, arbol);
            }
            else if (this.e2 instanceof Function) {
                val1 = this.e1.getValor(ent, arbol);
                val2 = this.e2.ejecutar(ent, arbol);
            }
            else {
                val1 = this.e1.getValor(ent, arbol);
                val2 = this.e2.getValor(ent, arbol);
            }
        }
        switch (this.operador) {
            case "+":
                if (typeof val1 === 'number') {
                    if (typeof val2 === 'number') {
                        this.tipo_ == tipo.DOUBLE;
                        return val1 + val2;
                    }
                    else if (typeof val2 === 'string') {
                        this.tipo_ = tipo.STRING;
                        return val1 + val2;
                    }
                    else {
                        InsertarError("Semantico", `Error: ${val1} + ${val2} no es valido`, "xpath", this.linea, this.columna);
                    }
                }
                else if (typeof val1 === 'string') {
                    if (typeof val2 === 'number') {
                        this.tipo_ = tipo.STRING;
                        return val1 + val2;
                    }
                    else if (typeof val2 === 'string') {
                        this.tipo_ = tipo.STRING;
                        return val1 + val2;
                    }
                    else {
                        InsertarError("Semantico", `Error: ${val1} + ${val2} no es valido`, "xpath", this.linea, this.columna);
                    }
                }
                else {
                    //Error
                }
                break;
            case "-":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.DOUBLE;
                    return val1 - val2;
                }
                else {
                    InsertarError("Semantico", `Error: ${val1} - ${val2} no es valido`, "xpath", this.linea, this.columna);
                }
                break;
            case "*":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.DOUBLE;
                    return val1 * val2;
                }
                else {
                    InsertarError("Semantico", `Error: ${val1} * ${val2} no es valido`, "xpath", this.linea, this.columna);
                }
                break;
            case "/":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.DOUBLE;
                    return val1 / val2;
                }
                else {
                    InsertarError("Semantico", `Error: ${val1} / ${val2} no es valido`, "xpath", this.linea, this.columna);
                }
                break;
            case "%":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.INT;
                    return val1 % val2;
                }
                else {
                    InsertarError("Semantico", `Error: ${val1} % ${val2} no es valido`, "xpath", this.linea, this.columna);
                }
                break;
            case "UNARIO":
                if (typeof valU === 'number') {
                    this.tipo_ = tipo.DOUBLE;
                    return -valU;
                }
                else {
                    InsertarError("Semantico", `Error: - ${valU} no es valido`, "xpath", this.linea, this.columna);
                }
                break;
            default:
                break;
        }
        return null;
    }
    traducir(ent, c3d) {
        let result = { "id": -1, "val": -1 };
        let t1 = this.e1.traducir(ent, c3d);
        let t2 = this.e2.traducir(ent, c3d);
        let v1 = { "id": t1, "val": c3d.temp[t1] };
        let v2 = { "id": t2, "val": c3d.temp[t2] };
        switch (this.operador) {
            case "UNARIO":
                result = { "id": c3d.generateTemp(), "val": -v1.val };
                c3d.main += `\tt${result.id} = -t${t1};\n`;
                break;
            case "+":
                result = { "id": c3d.generateTemp(), "val": v1.val + v2.val };
                c3d.main += `\tt${result.id} = t${t1} + t${t2};\n`;
                break;
            case "-":
                result = { "id": c3d.generateTemp(), "val": v1.val - v2.val };
                c3d.main += `\tt${result.id} = t${t1} - t${t2};\n`;
                break;
            case "*":
                result = { "id": c3d.generateTemp(), "val": v1.val * v2.val };
                c3d.main += `\tt${result.id} = t${t1} * t${t2};\n`;
                break;
            case "/":
                result = { "id": c3d.generateTemp(), "val": v1.val / v2.val };
                c3d.main += `\tt${result.id} = t${t1} / t${t2};\n`;
                break;
            case "%":
                result = { "id": c3d.generateTemp(), "val": v1.val % v2.val };
                c3d.main += `\tt${result.id} = t${t1} % t${t2};\n`;
                break;
            default:
                break;
        }
        c3d.temp[result.id] = result.val;
        return result.id;
    }
}
//# sourceMappingURL=aritmetica.js.map