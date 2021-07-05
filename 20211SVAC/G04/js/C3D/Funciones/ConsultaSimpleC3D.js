class ConsultaSimpleC3D {
    generate(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let t = resultC3D.getNextTemp();
        let l = resultC3D.getNextLabel();
        codigo.push(`\n\t//C3D funcion para consulta simple`);
        codigo.push(`void consultaSimple() {\n`);
        //Obteniendo parametros
        codigo.push(`\t//Obteniendo parametros`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t + 1} = stack[(int)t${t}];`);
        codigo.push(`\tt${t} = t${t} + 1;`);
        codigo.push(`\tt${t + 2} = stack[(int)t${t}];\n`);
        //Accediendo al entorno actual
        codigo.push(`\t//Accediendo al entorno actual`);
        codigo.push(`\tt${t + 3} = heap[(int)t${t + 1}];`);
        codigo.push(`\tt${t + 4} = 1;`);
        codigo.push(`\tt${t + 5} = t${t + 1} + 1;\n`);
        //Creacion de array de nuevos entornos
        codigo.push(`\t//Creacion de array de nuevos entornos`);
        codigo.push(`\tt${t + 6} = H;`);
        codigo.push(`\tt${t + 7} = t${t + 6} + 1;`);
        codigo.push(`\theap[(int)t${t + 6}] = t${t + 3};`);
        codigo.push(`\tt${t + 8} = t${t + 3} + 1;`);
        codigo.push(`\tH = H + t${t + 8};`);
        codigo.push(`\tt${t + 9} = 0;\n`);
        //Validacion de tamaño de array entornos
        codigo.push(`\t//Validacion de tamaño de array entornos`);
        codigo.push(`\tif (t${t + 3} > 0) goto L${l};`);
        codigo.push(`\tgoto L${l + 1};\n`);
        //Etiqueta para recorrer entornos
        codigo.push(`\t//Etiqueta para recorrer entornos`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t + 4} <= t${t + 3}) goto L${l + 2};`);
        codigo.push(`\tgoto L${l + 3};\n`);
        //Accediendo a tabla
        codigo.push(`\t//Accediendo a tabla`);
        codigo.push(`\tL${l + 2}:`);
        codigo.push(`\tt${t + 10} = heap[(int)t${t + 5}];`);
        codigo.push(`\tt${t + 11} = t${t + 10} + 1;`);
        codigo.push(`\tt${t + 12} = heap[(int)t${t + 11}];`);
        codigo.push(`\tt${t + 13} = heap[(int)t${t + 12}];`);
        codigo.push(`\tt${t + 14} = 1;`);
        codigo.push(`\tt${t + 15} = t${t + 12} + 1;`);
        //Creacion de nuevo entorno
        codigo.push(`\t//Creacion de nuevo entorno`);
        codigo.push(`\tt${t + 16} = H;`);
        codigo.push(`\tt${t + 17} = t${t + 16};`);
        codigo.push(`\tH = H + 2;`);
        codigo.push(`\tt${t + 18} = heap[(int)t${t + 10}];`);
        codigo.push(`\theap[(int)t${t + 17}] = t${t + 18};`);
        codigo.push(`\tt${t + 17} = t${t + 17} + 1;`);
        codigo.push(`\tt${t + 19} = H;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\tt${t + 20} = 0;\n`);
        //Validacion de tamaño de tabla
        codigo.push(`\t//Validacion de tamaño de tabla`);
        codigo.push(`\tif (t${t + 13} > 0) goto L${l + 4};`);
        codigo.push(`\tgoto L${l + 5};\n`);
        //Etiqueta para recorrer tabla
        codigo.push(`\t//Etiqueta para recorrer tabla`);
        codigo.push(`\tL${l + 4}:`);
        codigo.push(`\tif (t${t + 14} <= t${t + 13}) goto L${l + 6};`);
        codigo.push(`\tgoto L${l + 7};\n`);
        //Accediendo a simbolo actual
        codigo.push(`\t//Accediendo a simbolo actual`);
        codigo.push(`\tL${l + 6}:`);
        codigo.push(`\tt${t + 21} = heap[(int)t${t + 15}];`);
        codigo.push(`\tt${t + 22} = t${t + 21} + 2;`);
        codigo.push(`\tt${t + 23} = heap[(int)t${t + 22}];\n`);
        //Validacion del tipo de simbolo
        codigo.push(`\t//Validacion del tipo de simbolo`);
        codigo.push(`\tif(t${t + 23} == 0) goto L${l + 9};`);
        codigo.push(`\tgoto L${l + 10};\n`);
        codigo.push(`\tL${l + 9}:`);
        codigo.push(`\tgoto L${l + 8};\n`);
        codigo.push(`\tL${l + 10}:`);
        codigo.push(`\tif (t${t + 23} == 1) goto L${l + 8};`);
        codigo.push(`\tgoto L${l + 11};\n`);
        //Enviando parametros a funcion compararStrings
        codigo.push(`\t//Enviando parametros a funcion compararStrings`);
        codigo.push(`\tL${l + 8}:`);
        codigo.push(`\tP = P + 3;`);
        codigo.push(`\tt${t + 24} = P + 1;`);
        codigo.push(`\tstack[(int)t${t + 24}] = t${t + 2};`);
        codigo.push(`\tt${t + 24} = t${t + 24} + 1;`);
        codigo.push(`\tt${t + 25} = heap[(int)t${t + 21}];`);
        codigo.push(`\tstack[(int)t${t + 24}] = t${t + 25};`);
        codigo.push(`\tcompararStrings();`);
        codigo.push(`\tt${t + 26} = stack[(int)P];`);
        codigo.push(`\tP = P - 3;\n`);
        //Validando si las cadenas nos iguales
        codigo.push(`\t//Validando si las cadenas nos iguales`);
        codigo.push(`\tif (t${t + 26} == 1) goto L${l + 12};`);
        codigo.push(`\tgoto L${l + 13};\n`);
        //Agregando simbolo a entorno
        codigo.push(`\t//Agregando simbolo a entorno`);
        codigo.push(`\tL${l + 12}:`);
        codigo.push(`\theap[(int)H] = t${t + 21};`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\tt${t + 20} = t${t + 20} + 1;\n`);
        codigo.push(`\tL${l + 13}:`);
        codigo.push(`\tL${l + 11}:`);
        codigo.push(`\tt${t + 14} = t${t + 14} + 1;`);
        codigo.push(`\tt${t + 15} = t${t + 15} + 1;`);
        codigo.push(`\tgoto L${l + 4};\n`);
        //Fin de recorrido de la tabla
        codigo.push(`\t//Fin de recorrido de la tabla`);
        codigo.push(`\tL${l + 7}:`);
        codigo.push(`\theap[(int)t${t + 19}] = t${t + 20};`);
        codigo.push(`\theap[(int)t${t + 17}] = t${t + 19};\n`);
        //Validacion si hay simbolos en el entorno nuevo
        codigo.push(`\t//Validacion si hay simbolos en el entorno nuevo`);
        codigo.push(`\tif (t${t + 20} > 0) goto L${l + 14};`);
        codigo.push(`\tgoto L${l + 15};\n`);
        //Agregar nuevo entorno a array de entornos
        codigo.push(`\t//Agregar nuevo entorno a array de entornos`);
        codigo.push(`\tL${l + 14}:`);
        codigo.push(`\theap[(int)t${t + 7}] = t${t + 16};`);
        codigo.push(`\tt${t + 7} = t${t + 7} + 1;`);
        codigo.push(`\tt${t + 9} = t${t + 9} + 1;\n`);
        codigo.push(`\tL${l + 15}:`);
        codigo.push(`\tL${l + 5}:`);
        codigo.push(`\tt${t + 4} = t${t + 4} + 1;`);
        codigo.push(`\tt${t + 5} = t${t + 5} + 1;`);
        codigo.push(`\tgoto L${l};\n`);
        //Fin recorrido entornos
        codigo.push(`\t//Fin recorrido entornos`);
        codigo.push(`\tL${l + 3}:`);
        codigo.push(`\theap[(int)t${t + 6}] = t${t + 9};`);
        //Entornos vacios
        codigo.push(`\t//Entornos vacios`);
        codigo.push(`\tL${l + 1}:`);
        codigo.push(`\tstack[(int)P] = t${t + 6};`);
        codigo.push(`\treturn;\n}`);
        resultC3D.setNextTemp(t + 27);
        resultC3D.setNextLabel(l + 16);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
