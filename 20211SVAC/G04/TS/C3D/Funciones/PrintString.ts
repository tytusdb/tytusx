class PrintString implements FunctionC3D {
    public generate(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let t: number = resultC3D.getNextTemp();
        let l: number = resultC3D.getNextLabel();

        codigo.push(`void printString() {\n`);

        //Recuperando referencia a string
        codigo.push(`\t//Recuperando referencia a string`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t+1} = stack[(int)t${t}];`);

        codigo.push(`\tt${t+2} = heap[(int)t${t+1}];`);

        //Validando fin de candena
        codigo.push(`\t//Validando fin de cadena`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t+2} != -1) goto L${l+1};`);
        codigo.push(`\tgoto L${l+2};`);

        //Imprimir caracter actual
        codigo.push(`\t//Imprimir caracter actual`);
        codigo.push(`\tL${l+1}:`);
        codigo.push(`\tprintf("%c", (char)t${t+2});`);
        codigo.push(`\tt${t+1} = t${t+1} + 1;`);
        codigo.push(`\tt${t+2} = heap[(int)t${t+1}];`);
        codigo.push(`\tgoto L${l};`);

        //Fin impresion de id
        codigo.push(`\t//Fin impresion de id`);
        codigo.push(`\tL${l+2}:`);

        codigo.push(`\treturn;\n}`);

        resultC3D.setNextTemp(t+3);
        resultC3D.setNextLabel(l+3);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}