class AnalizarXpath implements FunctionC3D {
    public generate(resultC3D: C3DResult, cP: number, eP: number): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let t: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        let l: number = resultC3D.getNextLabel();

        codigo.push(`\n//C3D analizar Xpath`);
        codigo.push(`\tt${t} = stack[(int)${cP}];`);
        codigo.push(`\tt${t+1} = heap[(int)t${t}];`);
        codigo.push(`\tt${t+2} = 1;`);
        codigo.push(`\tt${t+3} = t${t} + 1;`);

        //Validando tamaño de matriz de consultas
        codigo.push(`\t//Validando tamaño de array consultas`);
        codigo.push(`\tif (t${t+1} > 0) goto L${l};`);
        codigo.push(`\tgoto L${l+1};\n`);

        //Recorrer consultas
        codigo.push(`\t//Recorrer consultas`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t+2} <= t${t+1}) goto L${l+2};`);
        codigo.push(`\tgoto L${l+3};\n`);

        codigo.push(`\tL${l+2}:`);
        codigo.push(`\tP = P + ${p};`);
        codigo.push(`\tt${t+4} = P + 1;`);
        codigo.push(`\tt${t+5} = heap[(int)t${t+3}];`);
        codigo.push(`\tstack[(int)t${t+4}] = t${t+5};`);
        codigo.push(`\tt${t+4} = t${t+4} + 1;`);
        codigo.push(`\tt${t+6} = stack[(int)${eP}];`);
        codigo.push(`\tstack[(int)t${t+4}] = t${t+6};`);
        codigo.push(`\trecorrerConsultas();`);
        codigo.push(`\tt${t+7} = stack[(int)P];`);
        codigo.push(`\tP = P - ${p};`);

        codigo.push(`\t//Imprimir resultado`);
        codigo.push(`\tP = P + ${p};`);
        codigo.push(`\tt${t+8} = P + 1;`);
        codigo.push(`\tstack[(int)t${t+8}] = t${t+7};`);
        codigo.push(`\timprimirResultado();`);
        codigo.push(`\tt${t+9} = stack[(int)P];`);
        codigo.push(`\tP = P - ${p};`);
        codigo.push(`\tprintf("%c",(char)10);`)
        codigo.push(`\tprintf("%c",(char)10);`)

        //Aumentando iterador de consultas
        codigo.push(`\tt${t+2} = t${t+2} + 1;`);
        codigo.push(`\tt${t+3} = t${t+3} + 1;`);
        codigo.push(`\tgoto L${l};`);

        codigo.push(`\tL${l+3}:`);
        codigo.push(`\tL${l+1}:`);

        resultC3D.setNextTemp(t+6);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}