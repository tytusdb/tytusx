class AnalizarXpath {
    generate(resultC3D, cP, eP) {
        let codigo = resultC3D.getCodigo();
        let t = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        let l = resultC3D.getNextLabel();
        codigo.push(`\n//C3D analizar Xpath`);
        codigo.push(`\tP = P + ${p};`);
        codigo.push(`\tt${t} = P + 1;`);
        codigo.push(`\tt${t + 1} = stack[(int)${cP}];`);
        codigo.push(`\tstack[(int)t${t}] = t${t + 1};`);
        codigo.push(`\tt${t} = t${t} + 1;`);
        codigo.push(`\tt${t + 2} = stack[(int)${eP}];`);
        codigo.push(`\tstack[(int)t${t}] = t${t + 2};`);
        codigo.push(`\trecorrerConsultas();`);
        codigo.push(`\tt${t + 3} = stack[(int)P];`);
        codigo.push(`\tP = P - ${p};`);
        codigo.push("for (int i = 0; i < 100; i++) {\n" +
            "	    t5 = heap[(int)i];\n" +
            "	    printf(\"%d\\t- %f\\n\", i, (float)t5);\n" +
            "	}\n" +
            "	printf(\"\\n\");\n" +
            "	for (int i = 0; i < 25; i++) {\n" +
            "	    t5 = stack[(int)i];\n" +
            "	    printf(\"%d\\t- %f\\n\", i, (float)t5);\n" +
            "	}");
        codigo.push(`\t//Imprimir resultado`);
        codigo.push(`\tP = P + ${p};`);
        codigo.push(`\tt${t + 4} = P + 1;`);
        codigo.push(`\tstack[(int)t${t + 4}] = t${t + 3};`);
        codigo.push(`\timprimirResultado();`);
        codigo.push(`\tt${t + 5} = stack[(int)P];`);
        codigo.push(`\tP = P - ${p};`);
        resultC3D.setNextTemp(t + 6);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
