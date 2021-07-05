class PrintAttribs implements FunctionC3D {
    public generate(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let t: number = resultC3D.getNextTemp();
        let l: number = resultC3D.getNextLabel();

        codigo.push(`void printAttribs() {\n`);
        //Recuperando referencia a atributos
        codigo.push(`\n\t//Recuperando referencia a atributos`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t+1} = stack[(int)t${t}];`);

        //Tamaño de atributos
        codigo.push(`\n\t//Tamaño de atributos;`);
        codigo.push(`\tt${t+2} = heap[(int)t${t+1}];`);
        codigo.push(`\tt${t+3} = 1;`);
        codigo.push(`\tt${t+4} = t${t+1} + 1;`);

        //Validando tamaño
        codigo.push(`\n\t//Validando tamaño;`);
        codigo.push(`\tif (t${t+2} > 0) goto L${l};`);
        codigo.push(`\tgoto L${l+1};`);

        //Validando iterador
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t+3} <= t${t+2}) goto L${l+2};`);
        codigo.push(`\tgoto L${l+3};`);

        //Obteniendo datos de atributo
        codigo.push(`\tL${l+2}:`);
        codigo.push(`\tt${t+5} = heap[(int)t${t+4}];`);
        codigo.push(`\tt${t+6} = heap[(int)t${t+5}];`);

        //Imprimiendo nombre parametro
        codigo.push(`\n\t//Imprimiendo nombre parametro`);
        codigo.push(`\tprintf("%c", (char)32);`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t+7} = P + 1;`);
        codigo.push(`\tstack[(int)t${t+7}] = t${t+6};`);
        codigo.push(`\tprintString();`);
        codigo.push(`\tt${t+8} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        codigo.push(`\tprintf("%c", (char)61);`);

        //Imprimiendo valor parametro
        codigo.push(`\n\t//Imprimiendo valor parametro`);
        codigo.push(`\tprintf("%c", (char)34);`);
        codigo.push(`\tt${t+9} = t${t+5} + 1;`);
        codigo.push(`\tt${t+10} = heap[(int)t${t+9}];`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t+11} = P + 1;`);
        codigo.push(`\tstack[(int)t${t+11}] = t${t+10};`);
        codigo.push(`\tprintString();`);
        codigo.push(`\tt${t+12} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        codigo.push(`\tprintf("%c", (char)34);`);

        //Aumentando iterador y atributo
        codigo.push(`\n\t//Aumentando iterador y atributo`);
        codigo.push(`\tt${t+3} = t${t+3} + 1;`);
        codigo.push(`\tt${t+4} = t${t+4} + 1;`);
        codigo.push(`\tgoto L${l};`);

        //Fin recorrido de atributos
        codigo.push(`\tL${l+3}:`);

        //Atributos vacios
        codigo.push(`\tL${l+1}:`);
        codigo.push(`\tstack[(int)P] = 33333;`);
        codigo.push(`\treturn;\n}`);

        resultC3D.setNextTemp(t+13);
        resultC3D.setNextLabel(l+2);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}