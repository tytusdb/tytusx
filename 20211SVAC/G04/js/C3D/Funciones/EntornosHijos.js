class EntornosHijos {
    generate(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let t = resultC3D.getNextTemp();
        let l = resultC3D.getNextLabel();
        codigo.push(`void entornosHijos() {\n`);
        //Recuperando array de entornos
        codigo.push(`\t//Recuperando array de entornos`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t + 1} = stack[(int)t${t}];`);
        //Accediendo al entorno actual
        codigo.push(`\t//Accediendo al entorno actual`);
        codigo.push(`\tt${t + 2} = heap[(int)t${t + 1}];`);
        codigo.push(`\tt${t + 3} = 1;`);
        codigo.push(`\tt${t + 4} = t${t + 1} + 1;\n`);
        //Creacion de array de nuevos entornos
        codigo.push(`\t//Creacion de array de nuevos entornos`);
        codigo.push(`\tt${t + 5} = H;`); //Nuevo array de entornos
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\tt${t + 6} = 0;`); //Contador de tamaño de array
        //Validacion de tamaño de array entornos
        codigo.push(`\t//Validacion de tamaño de array entornos`);
        codigo.push(`\tif (t${t + 2} > 0) goto L${l};`);
        codigo.push(`\tgoto L${l + 1};\n`);
        //Etiqueta para recorrer entornos
        codigo.push(`\t//Etiqueta para recorrer entornos`);
        codigo.push(`\tL${l}:`);
        codigo.push(`\tif (t${t + 3} <= t${t + 2}) goto L${l + 2};`);
        codigo.push(`\tgoto L${l + 3};\n`);
        //Accediendo a tabla
        codigo.push(`\tL${l + 2}:`);
        codigo.push(`\tt${t + 7} = heap[(int)t${t + 4}];`);
        codigo.push(`\tt${t + 8} = t${t + 7} + 1;`);
        codigo.push(`\tt${t + 9} = heap[(int)t${t + 8}];`);
        codigo.push(`\tt${t + 10} = heap[(int)t${t + 9}];`);
        codigo.push(`\tt${t + 11} = 1;`);
        codigo.push(`\tt${t + 12} = t${t + 9} + 1;`);
        //Validando tamaño de tabla
        codigo.push(`\t//Validando tamaño de tabla`);
        codigo.push(`\tif (t${t + 10} > 0) goto L${l + 4};`);
        codigo.push(`\tgoto L${l + 5};`);
        //Validando iterador con tamaño
        codigo.push(`\t//Validando iterador con tamaño`);
        codigo.push(`\tL${l + 4}:`);
        codigo.push(`\tif (t${t + 11} <= t${t + 10}) goto L${l + 6};`);
        codigo.push(`\tgoto L${l + 7};`);
        //Obteniendo tipo de simbolo
        codigo.push(`\t//Obteniendo tipo de simbolo`);
        codigo.push(`\tL${l + 6}:`);
        codigo.push(`\tt${t + 13} = heap[(int)t${t + 12}];`);
        codigo.push(`\tt${t + 14} = t${t + 13} + 2;`);
        codigo.push(`\tt${t + 15} = heap[(int)t${t + 14}];`);
        //Validando el tipo de simbolo
        codigo.push(`\t//Validando el tipo de simbolo`);
        codigo.push(`\tif (t${t + 15} == 0) goto L${l + 8};`);
        codigo.push(`\tgoto L${l + 9};`);
        codigo.push(`\tL${l + 8}:`);
        codigo.push(`\tgoto L${l + 10};`);
        codigo.push(`\tL${l + 9}:`);
        codigo.push(`\tif (t${t + 15} == 1) goto L${l + 10};`);
        codigo.push(`\tgoto L${l + 11};`);
        //Obteniendo entorno y agregangolo a nuevos entornos
        codigo.push(`\t//Obteniendo entorno y agregangolo a nuevos entornos`);
        codigo.push(`\tL${l + 10}:`);
        codigo.push(`\tt${t + 16} = t${t + 13} + 4;`);
        codigo.push(`\tt${t + 17} = heap[(int)t${t + 16}];`);
        codigo.push(`\theap[(int)H] = t${t + 17};`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\tt${t + 6} = t${t + 6} + 1;`);
        //No es nodo
        codigo.push(`\tL${l + 11}:`);
        codigo.push(`\tt${t + 11} = t${t + 11} + 1;`);
        codigo.push(`\tt${t + 12} = t${t + 12} + 1;`);
        codigo.push(`\tgoto L${l + 4};`);
        //Fin recorrido tabla
        codigo.push(`\tL${l + 7}:`);
        //Tabla vacia
        codigo.push(`\tL${l + 5}:`);
        codigo.push(`\tt${t + 3} = t${t + 3} + 1;`);
        codigo.push(`\tt${t + 4} = t${t + 4} + 1;`);
        codigo.push(`\tgoto L${l};`);
        //Fin recorrido entornos
        codigo.push(`\tL${l + 3}:`);
        //Setear tamaño de nuevo array de entornos
        codigo.push(`\theap[(int)t${t + 5}] = t${t + 6};`);
        //Entornos vacios
        codigo.push(`\tL${l + 1}:`);
        codigo.push(`\tstack[(int)P] = t${t + 5};`);
        codigo.push(`\treturn;\n}`);
        resultC3D.setNextTemp(t + 16);
        resultC3D.setNextLabel(l + 12);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
