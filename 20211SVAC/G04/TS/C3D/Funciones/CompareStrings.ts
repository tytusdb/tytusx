class CompareStrings implements FunctionC3D {

    public generate(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let t: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        let l: number = resultC3D.getNextLabel();

        codigo.push(`\n\t//C3D funcion para comparar strings`);
        codigo.push('void compararStrings() {\n');
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t+1} = stack[(int)t${t}];`);
        codigo.push(`\tt${t} = t${t} + 1;`);
        codigo.push(`\tt${t+2} = stack[(int)t${t}];\n`);
        codigo.push(`\t//fin recuperacion de parametros\n`);
        codigo.push(`\tt${t+3} = heap[(int)t${t+1}];\n`);
        codigo.push(`\tif(t${t+3} == 42) goto L${l+1};`);
        codigo.push(`\tgoto L${l};`);
        codigo.push(`\tL${l+1}:\ngoto L${l+5};`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tt${t+3} = heap[(int)t${t+1}];`);
        codigo.push(`\tt${t+4} = heap[(int)t${t+2}];`);
        codigo.push(`\tif(t${t+3} == t${t+4}) goto L${l+2};`);
        codigo.push(`\tgoto L${l+3};\n`);

        codigo.push(`\tL${l+2}:\n`);
        codigo.push(`\tif(t${t+3} != -1) goto L${l+4};`);
        codigo.push(`\tgoto L${l+5};\n`);

        codigo.push(`\tL${l+4}:`);
        codigo.push(`\tt${t+1} = t${t+1} + 1;`);
        codigo.push(`\tt${t+2} = t${t+2} + 1;`);
        codigo.push(`\tgoto L${l};\n`);

        codigo.push(`\tL${l+3}:`);
        codigo.push(`\tstack[(int)P] = 0;`);
        codigo.push(`\treturn;\n`);

        codigo.push(`\tL${l+5}:`);
        codigo.push(`\tstack[(int)P] = 1;`);
        codigo.push(`\treturn;\n}`);
        resultC3D.setNextTemp(t+4);
        resultC3D.setNextLabel(l+4);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}