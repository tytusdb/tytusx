class ToTag {
    generate(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let t = resultC3D.getNextTemp();
        let l = resultC3D.getNextLabel();
        codigo.push(`void toTag() {`);
        //Recuperando simbolo
        codigo.push(`\n\t//Recuperando simbolo`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t + 1} = stack[(int)t${t}];`);
        //Obteniendo tipo de simbolo
        codigo.push(`\n\t//Obteniendo tipo de simbolo`);
        codigo.push(`\tt${t + 2} = t${t + 1} + 2;`);
        codigo.push(`\tt${t + 3} = heap[(int)t${t + 2}];`);
        //Validando tipo de simbolo
        codigo.push(`\n\t//Validando tipo de simbolo`);
        codigo.push(`\tif (t${t + 3} == 1) goto L${l};`);
        codigo.push(`\tgoto L${l + 1};`);
        //Impresion de etiqueta de apertura
        codigo.push(`\n\t//Impresion de etiqueta de apertura`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tprintf("%c", (char)60);`);
        codigo.push(`\tt${t + 4} = heap[(int)t${t + 1}];`);
        codigo.push(`\tdouble temp = t${t + 4};`);
        //Imprimiendo id simbolo
        codigo.push(`\n\t//Imprimiendo id simbolo`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 5} = P + 1;`);
        codigo.push(`\tstack[(int)t${t + 5}] = t${t + 4};`);
        codigo.push(`\tprintString();`);
        codigo.push(`\tt${t + 6} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        //Imprimiendo atributos
        codigo.push(`\n\t//Imprimiendo atributos`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 7} = P + 1;`);
        codigo.push(`\tt${t + 8} = t${t + 1} + 3;`);
        codigo.push(`\tt${t + 9} = heap[(int)t${t + 8}];`);
        codigo.push(`\tstack[(int)t${t + 7}] = t${t + 9};`);
        codigo.push(`\tprintAttribs();`);
        codigo.push(`\tt${t + 10} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        codigo.push(`\tprintf("%c", (char)62);`);
        //Imprimiendo texto de etiqueta
        codigo.push(`\n\t//Imprimiendo texto de etiqueta`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 11} = P + 1;`);
        codigo.push(`\tt${t + 12} = t${t + 1} + 1;`);
        codigo.push(`\tt${t + 13} = heap[(int)t${t + 12}];`);
        codigo.push(`\tstack[(int)t${t + 11}] = t${t + 13};`);
        codigo.push(`\tprintString();`);
        codigo.push(`\tt${t + 14} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        //Imprimiendo hijos
        codigo.push(`\n\t//Imprimiendo hijos`);
        codigo.push(`\tt${t + 15} = t${t + 1} + 4;`);
        codigo.push(`\tt${t + 16} = heap[(int)t${t + 15}];`);
        codigo.push(`\tt${t + 17} = t${t + 16} + 1;`);
        codigo.push(`\tt${t + 18} = heap[(int)t${t + 17}];`);
        codigo.push(`\tdouble t${t + 19} = heap[(int)t${t + 18}];`);
        codigo.push(`\tdouble t${t + 20} = 1;`);
        codigo.push(`\tdouble t${t + 21} = t${t + 18} + 1;`);
        //Validando tamaño de tabla
        codigo.push(`\t//Validando tamaño de tabla`);
        codigo.push(`\tif (t${t + 19} > 0) goto L${l + 2};`);
        codigo.push(`\tgoto L${l + 3};`);
        //Validando iterador con tamaño
        codigo.push(`\t//Validando iterador con tamaño`);
        codigo.push(`\tL${l + 2}:`);
        //codigo.push(`\tprintf("if: %f < %f\\n", (float)t${t+20}, (float)t${t+19});`);
        codigo.push(`\tif (t${t + 20} <= t${t + 19}) goto L${l + 4};`);
        codigo.push(`\tgoto L${l + 5};`);
        //Obteniendo tipo de simbolo
        codigo.push(`\t//Obteniendo tipo de simbolo`);
        codigo.push(`\tL${l + 4}:`);
        codigo.push(`\tt${t + 22} = heap[(int)t${t + 21}];`);
        codigo.push(`\tt${t + 23} = t${t + 22} + 2;`);
        codigo.push(`\tt${t + 24} = heap[(int)t${t + 23}];`);
        //Validando el tipo de simbolo
        codigo.push(`\t//Validando el tipo de simbolo`);
        codigo.push(`\tif (t${t + 24} == 0) goto L${l + 6};`);
        codigo.push(`\tgoto L${l + 7};`);
        codigo.push(`\tL${l + 6}:`);
        codigo.push(`\tgoto L${l + 8};`);
        codigo.push(`\tL${l + 7}:`);
        codigo.push(`\tif (t${t + 24} == 1) goto L${l + 8};`);
        codigo.push(`\tgoto L${l + 9};`);
        //Enviando simbolo a funcion toTag
        codigo.push(`\t//Enviando simbolo a funcion toTag`);
        codigo.push(`\tL${l + 8}:`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 25} = P + 1;`);
        //codigo.push(`\tprintf("simbolo: %f - %f\\n", (float)t${t+21}, (float)t${t+22});`);
        codigo.push(`\tstack[(int)t${t + 25}] = t${t + 22};`);
        //codigo.push(`\tprintf("\\n");`);
        codigo.push(`\ttoTag();`);
        codigo.push(`\tt${t + 26} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        //No es un nodo
        codigo.push(`\t//No es un nodo`);
        codigo.push(`\tL${l + 9}:`);
        codigo.push(`\tt${t + 20} = t${t + 20} + 1;`);
        codigo.push(`\tt${t + 21} = t${t + 21} + 1;`);
        //codigo.push(`\tprintf("\\nAumentando iterador simbolo");`);
        codigo.push(`\tgoto L${l + 2};`);
        //Fin recorrido de tabla
        codigo.push(`\t//Fin recorrido de tabla`);
        codigo.push(`\tL${l + 5}:`);
        codigo.push(`\tL${l + 3}:`);
        //Impresion de etiqueta de cierre
        codigo.push(`\n\t//Impresion de etiqueta de cierre`);
        codigo.push(`\tprintf("%c", (char)60);`);
        codigo.push(`\tprintf("%c", (char)47);`);
        //Imprimiendo id simbolo
        codigo.push(`\n\t//Imprimiendo id simbolo`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 27} = P + 1;`);
        codigo.push(`\tstack[(int)t${t + 27}] = temp;`);
        codigo.push(`\tprintString();`);
        codigo.push(`\tt${t + 28} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        codigo.push(`\tprintf("%c", (char)62);`);
        codigo.push(`\tprintf("%c",(char)10);`);
        codigo.push(`\tgoto L${l + 10};`);
        codigo.push(`\n\t//Etiqueta autocerrada`);
        codigo.push(`\tL${l + 1}:`);
        codigo.push(`\tprintf("%c", (char)60);`);
        codigo.push(`\tt${t + 29} = heap[(int)t${t + 1}];`);
        //codigo.push(`\t temp = t${t+4};`);
        //Imprimiendo id simbolo
        codigo.push(`\n\t//Imprimiendo id simbolo`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 30} = P + 1;`);
        codigo.push(`\tstack[(int)t${t + 30}] = t${t + 29};`);
        codigo.push(`\tprintString();`);
        codigo.push(`\tt${t + 31} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        //Imprimiendo atributos
        codigo.push(`\n\t//Imprimiendo atributos`);
        codigo.push(`\tP = P + 2;`);
        codigo.push(`\tt${t + 32} = P + 1;`);
        codigo.push(`\tt${t + 33} = t${t + 1} + 3;`);
        codigo.push(`\tt${t + 34} = heap[(int)t${t + 33}];`);
        codigo.push(`\tstack[(int)t${t + 32}] = t${t + 34};`);
        codigo.push(`\tprintAttribs();`);
        codigo.push(`\tt${t + 35} = stack[(int)P];`);
        codigo.push(`\tP = P - 2;`);
        codigo.push(`\tprintf("%c", (char)47);`);
        codigo.push(`\tprintf("%c", (char)62);`);
        codigo.push(`\tL${l + 10}:`);
        codigo.push(`\tstack[(int)P] = 22222;`);
        codigo.push(`\treturn;\n}`);
        resultC3D.setNextTemp(t + 36);
        resultC3D.setNextLabel(l + 11);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
