class RecorrerConsultas implements FunctionC3D {
    public generate(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let t: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        let l: number = resultC3D.getNextLabel();

        codigo.push(`\n//C3D para recorrer cosultas`);
        codigo.push(`void recorrerConsultas() {\n`);

        //Recuperando parametros
        codigo.push(`\t//Recuperando parametros`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t+1} = stack[(int)t${t}];`);
        codigo.push(`\tt${t} = t${t} + 1;`);
        codigo.push(`\tt${t+2} = stack[(int)t${t}];\n`);

        //Obteniendo tamaño de consultas
        codigo.push(`\t//Obteniendo tamaño de consultas`);
        codigo.push(`\tt${t+3} = heap[(int)t${t+1}];`);
        codigo.push(`\tt${t+4} = 1;`);
        codigo.push(`\tt${t+5} = t${t+1} + 1;`);

        //Validando tamaño de array consultas
        codigo.push(`\t//Validando tamaño de array consultas`);
        codigo.push(`\tif (t${t+3} > 0) goto L${l};`);
        codigo.push(`\tgoto L${l+1};\n`);

        //Recorrer consultas
        codigo.push(`\t//Recorrer consultas`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t+4} <= t${t+3}) goto L${l+2};`);
        codigo.push(`\tgoto L${l+3};\n`);

        //Accediendo a primera consulta
        codigo.push(`\t//Accediendo a primera consulta`);
        codigo.push(`\tL${l+2}:`);
        codigo.push(`\tt${t+7} = heap[(int)t${t+5}];`);
        codigo.push(`\tt${t+8} = heap[(int)t${t+7}];`);
        codigo.push(`\tt${t+9} = t${t+7} + 1;`);
        codigo.push(`\tt${t+10} = heap[(int)t${t+9}];\n`);

        //Validando tipo de consulta
        codigo.push(`\t//Validando tipo de consulta`);
        codigo.push(`\tif (t${t+8} == 1) goto L${l+4};`);
        codigo.push(`\tgoto L${l+5};\n`);

        //Enviando parametros a consultaSmple()
        codigo.push(`\t//Enviando parametros a consultaSmple()`);
        codigo.push(`\tL${l+4}:`);
        codigo.push(`\tP = P + 3;`);
        codigo.push(`\tt${t+11} = P + 1;`);
        codigo.push(`\tstack[(int)t${t+11}] = t${t+2};`);
        codigo.push(`\tt${t+11} = t${t+11} + 1;`);
        codigo.push(`\tstack[(int)t${t+11}] = t${t+10};`);
        codigo.push(`\tconsultaSimple();`);
        codigo.push(`\tt${t+12} = stack[(int)P];`);
        codigo.push(`\tP = P - 3;`);
        codigo.push(`\tt${t+2} = t${t+12};`);

        codigo.push(`\tL${l+5}:`);
        codigo.push(`\tL${l+3}:`);
        codigo.push(`\tL${l+1}:`);
        codigo.push(`\tstack[(int)P] = t${t+2};`);
        codigo.push(`\treturn;\n}`);

        resultC3D.setNextTemp(t+13);
        resultC3D.setNextLabel(l+6);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}