function PP(entrada) {
    let entradaSeparada = entrada.split(/\n/);
    let tokenVar1 = "";
    let tokenVar2 = "";
    let tokenEti1 = "";
    let tokenEti2 = "";
    let auxEntrada = "";
    let salida = "";
    for(let i = 0; i < entradaSeparada.length; i++) {
        if(entradaSeparada[i] != "") {
            if(entradaSeparada[i].match(/\s*[i][f]\s*[(]\s*[0-9]+\s*[!<>=]{1,2}\s*[0-9]+\s*[)]\s*[g][o][t][o]\s*[lL][0-9]+[;]/)) {
                auxEntrada = entradaSeparada[i].replace(/\s/g, '');
                auxEntrada = auxEntrada.replace(/\s*[i][f]\s*[(]/, '')
                                       .replace(/\s*[)]\s*[g][o][t][o]\s*[lL][0-9]+[;]/, '');
                if(eval(auxEntrada)) {
                    // regla 3
                    auxEntrada = entradaSeparada[i].replace(/\s*[i][f]\s*[(]\s*[0-9]+\s*[!<>=]{1,2}\s*[0-9]+\s*[)]\s*/, '') + "\n";
                    i = i + 1;
                    reporteOptimizador.push({linea: i+1, regla: "regla 3", eliminado: entradaSeparada[i], agregado: auxEntrada});
                    salida += "// regla 3\n"
                } else {
                    // regla 4
                    auxEntrada = entradaSeparada[i+1] + "\n";
                    i = i + 1;
                    reporteOptimizador.push({linea: i+1, regla: "regla 4", eliminado: entradaSeparada[i], agregado: auxEntrada});
                    salida += "// regla 4\n"
                }
            }
        }
        if(auxEntrada == "") {
            salida += entradaSeparada[i] + "\n";
        } else {
            salida += "  " + auxEntrada;
            auxEntrada = "";
        }
    }
    return salida;
}

function segundaPasada(entrada) {
    let entradaSeparada = entrada.split(/\n/);
    let tokenVar1 = "";
    let tokenVar2 = "";
    let tokenEti1 = "";
    let tokenEti2 = "";
    let auxEntrada = "";
    let salida = "";
    for(let i = 0; i < entradaSeparada.length; i++) {
        if(entradaSeparada[i] != "") {
            if(entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[+]\s*[0]\s*[;]/)) {
                // regla 6 y 10
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("+")[0];
                if(tokenVar1 == tokenVar2) {
                    // regla 6
                    salida += "// regla 6\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 6", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[+]\s*[0]\s*[;]/, "");
                } else {
                    // regla 10
                    salida += "// regla 10\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 10", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[+]\s*[0]\s*/, "")});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[+]\s*[0]\s*/, "");
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[-]\s*[0]\s*[;]/)) {
                // regla 7 y 11
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("-")[0];
                if(tokenVar1 == tokenVar2) {
                    // regla 7
                    salida += "// regla 7\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 7", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[-]\s*[0]\s*[;]/, "");
                } else {
                    // regla 11
                    salida += "// regla 11\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 11", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[-]\s*[0]\s*/, "")});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[-]\s*[0]\s*/, "");
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[1]\s*[;]/)) {
                // regla 8 y 12
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("*")[0];
                if(tokenVar1 == tokenVar2) {
                    // regla 8
                    salida += "// regla 8\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 8", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[1]\s*[;]/, "");
                } else {
                    // regla 12
                    salida += "// regla 12\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 12", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[*]\s*[1]\s*/, "")});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[*]\s*[1]\s*/, "");
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[\/]\s*[1]\s*[;]/)) {
                // regla 9 y 13
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("/")[0];
                if(tokenVar1 == tokenVar2) {
                    // regla 9
                    salida += "// regla 9\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 9", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[\/]\s*[1]\s*[;]/, "");
                } else {
                    // regla 13
                    salida += "// regla 13\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 13", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[\/]\s*[1]\s*/, tokenVar2)});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[\/]\s*[1]\s*/, tokenVar2);
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[2]\s*[;]/)) {
                // regla 14
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("*")[0];
                salida += "// regla 14\n";
                reporteOptimizador.push({linea: i+1, regla: "regla 14", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[2]\s*/, tokenVar2 + "+" + tokenVar2)});
                entradaSeparada[i] = entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[2]\s*/, tokenVar2 + "+" + tokenVar2);
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[0]\s*[;]/)) {
                // regla 15
                salida += "// regla 15\n";
                reporteOptimizador.push({linea: i+1, regla: "regla 15", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[0]\s*/, " 0")});
                entradaSeparada[i] = entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[0]\s*/, " 0");
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[0]\s*[\/]\s*[Tt][0-9]+\s*[;]/)) {
                // regla 16
                salida += "// regla 16\n";
                reporteOptimizador.push({linea: i+1, regla: "regla 16", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[0]\s*[\/]\s*[Tt][0-9]+\s*/, " 0")});
                entradaSeparada[i] = entradaSeparada[i].replace(/\s*[0]\s*[\/]\s*[Tt][0-9]+\s*/, " 0");
            } else if (entradaSeparada[i].match(/[g][o][t][o]\s*[lL][0-9]+[;]/)) {
                // regla 1
                let aux = entradaSeparada[i].replace(/\s/g, '');
                tokenEti1 = aux.replace("goto","").replace(";","");
                let eliminados = "";
                for(let x = i; x < entradaSeparada.length; x++) {
                    if(entradaSeparada[x].match(/[lL][0-9]+\s*[:]\s*/)) {
                        tokenEti2 = entradaSeparada[x].replace(/\s/g, '').replace(":", "");
                        if(tokenEti2 == tokenEti1) {
                            salida += "// regla 1\n";
                            auxEntrada = entradaSeparada[i] + "\n" + entradaSeparada[x] + "\n";
                            reporteOptimizador.push({linea: i+1, regla: "regla 1", eliminado: eliminados, agregado: auxEntrada});
                            i = x;
                            break;
                        } else {
                            break;
                        }
                    }
                    eliminados += entradaSeparada[x] + "\n";
                }
            }
        }
        if(auxEntrada == "") {
            salida += entradaSeparada[i] + "\n";
        } else {
            salida += auxEntrada;
            auxEntrada = "";
        }
    }

    return salida;
}