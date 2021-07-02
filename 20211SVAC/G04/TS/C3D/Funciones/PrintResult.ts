class PrintResult implements FunctionC3D {
    public generate(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let t: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        let l: number = resultC3D.getNextLabel();

        codigo.push(`void imprimirResultado() {\n`);
        //Recuperando array de entornos
        codigo.push(`\t//Recuperando array de entornos`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t+1} = stack[(int)t${t}];`);

        //Obteniendo informacion del array de entorno
        codigo.push(`\t//Obteniendo informacion del array de entorno`);
        codigo.push(`\tt${t+2} = heap[(int)t${t+1}];`);
        codigo.push(`\tt${t+3} = 1;`);
        codigo.push(`\tt${t+4} = t${t+1} + 1;`);

        //Validando tamaño de array de entornos
        codigo.push(`\t//Validando tamaño de array de entornos`);
        codigo.push(`\tif (t${t+2} > 0) goto L${l};`);
        codigo.push(`\tgoto L${l+1};`);

        //Validando iterador
        codigo.push(`\t//Validando iterador`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t+3} <= t${t+2}) goto L${l+2};`);
        codigo.push(`\tgoto L${l+3};`);


        codigo.push(`\tL${l+2}:`);
        codigo.push(`\tt${t+5} = heap[(int)t${t+4}];`);
        codigo.push(`\tt${t+6} = t${t+5} + 1;`);
        codigo.push(`\tt${t+7} = heap[(int)t${t+6}];`);
        codigo.push(`\tt${t+8} = heap[(int)t${t+7}];`);
        codigo.push(`\tt${t+9} = 1;`);
        codigo.push(`\tt${t+10} = t${t+7} + 1;`);

        //Validando tamaño de tabla
        codigo.push(`\t//Validando tamaño de tabla`);
        codigo.push(`\tif (t${t+8} > 0) goto L${l+4};`);
        codigo.push(`\tgoto L${l+5};`);

        //Validando iterador con tamaño
        codigo.push(`\t//Validando iterador con tamaño`);
        codigo.push(`\tL${l+4}:`);
        codigo.push(`\tif (t${t+9} <= t${t+8}) goto L${l+6};`);
        codigo.push(`\tgoto L${l+7};`);

        //Obteniendo tipo de simbolo
        codigo.push(`\t//Obteniendo tipo de simbolo`);
        codigo.push(`\tL${l+6}:`);
        codigo.push(`\tt${t+11} = heap[(int)t${t+10}];`);
        codigo.push(`\tt${t+12} = t${t+11} + 2;`);
        codigo.push(`\tt${t+13} = heap[(int)t${t+12}];`);

        //Validando el tipo de simbolo
        codigo.push(`\t//Validando el tipo de simbolo`);
        codigo.push(`\tif (t${t+13} == 0) goto L${l+8};`);
        codigo.push(`\tgoto L${l+9};`);

        codigo.push(`\tL${l+8}:`);
        codigo.push(`\tgoto L${l+10};`);

        codigo.push(`\tL${l+9}:`);
        codigo.push(`\tif (t${t+13} == 1) goto L${l+10};`);
        codigo.push(`\tgoto L${l+11};`);

        //Enviando simbolo a funcion toTag
        codigo.push(`\t//Enviando simbolo a funcion toTag`);
        codigo.push(`\tL${l+10}:`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t+14} = P + 1;`);
        codigo.push(`\tstack[(int)t${t+14}] = t${t+11};`);
        codigo.push(`\ttoTag();`);
        codigo.push(`\tt${t+15} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);

        //No es un nodo
        codigo.push(`\t//No es un nodo`);
        codigo.push(`\tL${l+11}:`);
        codigo.push(`\tt${t+9} = t${t+9} + 1;`);
        codigo.push(`\tt${t+10} = t${t+10} + 1;`);
        codigo.push(`\tgoto L${l+4};`);

        //Fin recorrido de tabla
        codigo.push(`\t//Fin recorrido de tabla`);
        codigo.push(`\tL${l+7}:`);
        codigo.push(`\tL${l+5}:`);
        codigo.push(`\tt${t+3} = t${t+3} + 1;`);
        codigo.push(`\tt${t+4} = t${t+4} + 1;`);
        codigo.push(`\tgoto L${l};`);

        //Fin recorrido entornos
        codigo.push(`\t//Fin recorrido entornos`);
        codigo.push(`\tL${l+3}:`);
        codigo.push(`\tL${l+1}:`);
        codigo.push(`\tstack[(int)P] = 11111;`);
        codigo.push(`\treturn;\n}`);

        resultC3D.setNextTemp(t+16);
        resultC3D.setNextLabel(l+12);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}