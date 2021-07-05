class C3DController {
    constructor() {
        this.info = new Array();
    }
    getInfo() {
        return this.info;
    }
    setInfo(info) {
        this.info = info;
    }
    generateC3DXquery(code, main, t) {
        let codigo = new Array();
        codigo.push("/*------HEADER------*/");
        codigo.push("#include <stdio.h>");
        codigo.push("#include <math.h>");
        codigo.push("double heap[30101999];");
        codigo.push("double stack[30101999];");
        codigo.push("double P;");
        codigo.push("double H;");
        let aux = new Array();
        aux.push("double");
        for (let i = 0; i < t; i++) {
            aux.push(` t${i}`);
            aux.push(",");
        }
        aux.pop();
        aux.push(";");
        codigo.push(aux.join(""));
        codigo.push(code);
        codigo.push("\n/*-----MAIN-----*/");
        codigo.push("void main() {");
        codigo.push("\tP = 0; H = 0;");
        codigo.push(main);
        codigo.push(`printf("%f", (float)t${t - 1});`);
        codigo.push("\treturn;");
        codigo.push("}");
        return codigo.join("\n");
    }
    generateC3D(result, matrizConsultas, entorno, matrizEntornos) {
        let areSimple = true;
        matrizConsultas.forEach(cs => {
            cs.forEach(c => {
                if (c.getType() != TipoConsulta.SIMPLE || c.getHasPredicado()) {
                    areSimple = false;
                }
            });
        });
        if (areSimple) {
            result = this.generarC3DConsultas(result, matrizConsultas);
            result = this.generarArrayEntC3D(result, entorno);
            let cP = this.info.find(e => e.name == "consultas").sp;
            let eP = this.info.find(e => e.name == "entornos").sp;
            result = FunctionRepository.generate(TipoFuncion.ANALIZAR, result, cP, eP);
        }
        else {
            matrizEntornos.forEach(ents => {
                result = this.generateC3DArrayEnt(result, ents);
            });
        }
        let resultFunciones = new C3DResult([""], 0, result.getNextTemp(), result.getNextLabel(), null);
        resultFunciones = FunctionRepository.generate(TipoFuncion.COMPARE, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.SIMPLE, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.ENNT_HIJOS, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.RECORRER, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.PRINT_S, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.PRINT_AT, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.TO_TAG, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.PRINT_R, resultFunciones);
        let codigo = new Array();
        codigo.push("/*------HEADER------*/");
        codigo.push("#include <stdio.h>");
        codigo.push("#include <math.h>");
        codigo.push("double heap[30101999];");
        codigo.push("double stack[30101999];");
        codigo.push("double P;");
        codigo.push("double H;");
        let aux = new Array();
        aux.push("double");
        for (let i = 0; i < resultFunciones.getNextTemp(); i++) {
            aux.push(` t${i}`);
            aux.push(",");
        }
        aux.pop();
        aux.push(";");
        codigo.push(aux.join(""));
        resultFunciones.getCodigo().forEach(l => codigo.push(l));
        codigo.push("\n/*-----MAIN-----*/");
        codigo.push("void main() {");
        codigo.push("\tP = 0; H = 0;");
        result.getCodigo().forEach(l => codigo.push(l));
        codigo.push("\treturn;");
        codigo.push("}");
        return codigo.join("\n");
    }
    generateC3DArrayEnt(resultC3D, entornos) {
        entornos.forEach(e => {
            resultC3D = e.generateC3D(resultC3D, "resultado");
        });
        let codigo = resultC3D.getCodigo();
        let t = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        codigo.push(`\t\n//Generando array de entornos;`);
        codigo.push(`\tt${t} = H;`);
        codigo.push(`\tt${t + 1} = t${t} + 1;`);
        codigo.push(`\theap[(int)H] = ${entornos.length};`);
        codigo.push(`\tH = H + ${entornos.length + 1};`);
        let tTemp = t + 2;
        entornos.forEach(e => {
            codigo.push(`\tt${tTemp} = stack[(int)${e.getStackPointer()}];`);
            codigo.push(`\theap[(int)t${t + 1}] = t${tTemp};`);
            codigo.push(`\tt${t + 1} = t${t + 1} + 1;`);
            tTemp++;
        });
        codigo.push(`\tstack[(int)${p}] = t${t};`);
        //Imprimir resultado
        codigo.push(`\t//Imprimir resultado`);
        codigo.push(`\tP = P + ${p + 1};`);
        codigo.push(`\tt${tTemp} = P + 1;`);
        codigo.push(`\tstack[(int)t${tTemp}] = t${t};`);
        codigo.push(`\timprimirResultado();`);
        codigo.push(`\tt${tTemp + 1} = stack[(int)P];`);
        codigo.push(`\tP = P - ${p + 1};`);
        codigo.push(`\tprintf("%c",(char)10);`);
        codigo.push(`\tprintf("%c",(char)10);`);
        resultC3D.setNextTemp(tTemp + 2);
        resultC3D.setSp(p + 1);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
    generarC3DConsultas(result, matriz) {
        matriz.forEach(cs => {
            cs.forEach(c => {
                result = c.generateC3D(result);
            });
        });
        let codigo = result.getCodigo();
        let i = result.getNextTemp();
        let p = result.getSp();
        this.info.push({ name: "consultas", sp: p });
        codigo.push(`\n\t//C3D Matriz de consultas`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i} + 1;`);
        codigo.push(`\theap[(int)H] = ${matriz.length};`);
        codigo.push(`\tH = H + ${matriz.length + 1};`);
        let iTemp = i + 2;
        matriz.forEach(cs => {
            codigo.push(`\tt${iTemp} = H;`);
            codigo.push(`\tt${iTemp + 1} = t${iTemp} + 1;`);
            codigo.push(`\theap[(int)H] = ${cs.length};`);
            codigo.push(`\tH = H + ${cs.length + 1};`);
            cs.forEach(c => {
                codigo.push(`\tt${iTemp + 2} = stack[(int)${c.getStackPointer()}];`);
                codigo.push(`\theap[(int)t${iTemp + 1}] = t${iTemp + 2};`);
                codigo.push(`\tt${iTemp + 1} = t${iTemp + 1} + 1;`);
            });
            codigo.push(`\theap[(int)t${i + 1}] = t${iTemp};`);
            codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
            iTemp += 3;
        });
        codigo.push(`\tstack[(int)${p++}] = t${i};`);
        result.setNextTemp(iTemp);
        result.setSp(p);
        result.setCodigo(codigo);
        return result;
    }
    generarArrayEntC3D(resultC3D, entorno) {
        let codigo = resultC3D.getCodigo();
        let i = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        this.info.push({ name: "entornos", sp: p });
        codigo.push(`\n\t//C3D Arreglo de entornos inicial`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i} + 1;`);
        codigo.push(`\theap[(int)H] = 1;`);
        codigo.push(`\tH = H + 2;`);
        codigo.push(`\n\tt${i + 2} = stack[(int)${entorno.getStackPointer()}];`);
        codigo.push(`\theap[(int)t${i + 1}] = t${i + 2};`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        codigo.push(`\tstack[(int)${p++}] = t${i};`);
        resultC3D.setNextTemp(i + 3);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
