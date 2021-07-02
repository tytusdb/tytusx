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
    generateC3D(result, matriz, entorno) {
        result = this.generarC3DConsultas(result, matriz);
        result = this.generarArrayEntC3D(result, entorno);
        let cP = this.info.find(e => e.name == "consultas").sp;
        let eP = this.info.find(e => e.name == "entornos").sp;
        result = FunctionRepository.generate(TipoFuncion.ANALIZAR, result, cP, eP);
        let resultFunciones = new C3DResult([""], 0, result.getNextTemp(), result.getNextLabel(), null);
        resultFunciones = FunctionRepository.generate(TipoFuncion.COMPARE, resultFunciones);
        resultFunciones = FunctionRepository.generate(TipoFuncion.SIMPLE, resultFunciones);
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
    generarC3DConsultas(result, matriz) {
        matriz[0].forEach(c => {
            result = c.generateC3D(result);
        });
        let codigo = result.getCodigo();
        let i = result.getNextTemp();
        let p = result.getSp();
        this.info.push({ name: "consultas", sp: p });
        codigo.push(`\n\t//C3D Arreglo de consultas`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i} + 1;`);
        codigo.push(`\theap[(int)H] = ${matriz[0].length};`);
        codigo.push(`\tH = H + ${matriz[0].length + 1};`);
        let iTemp = i + 1;
        matriz[0].forEach(c => {
            codigo.push(`\n\tt${iTemp + 1} = stack[(int)${c.getStackPointer()}];`);
            codigo.push(`\theap[(int)t${i + 1}] = t${iTemp + 1};`);
            codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
            iTemp++;
        });
        iTemp++;
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
