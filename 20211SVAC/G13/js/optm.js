let reporteOptimizador = [];

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
                    //  3
                    auxEntrada = entradaSeparada[i].replace(/\s*[i][f]\s*[(]\s*[0-9]+\s*[!<>=]{1,2}\s*[0-9]+\s*[)]\s*/, '') + "\n";
                    i = i + 1;
                    reporteOptimizador.push({linea: i+1, regla: "regla 3", eliminado: entradaSeparada[i], agregado: auxEntrada});
                    salida += "//  3\n"
                } else {
                    //  4
                    auxEntrada = entradaSeparada[i+1] + "\n";
                    i = i + 1;
                    reporteOptimizador.push({linea: i+1, regla: "regla 4", eliminado: entradaSeparada[i], agregado: auxEntrada});
                    salida += "//  4\n"
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

function SP(entrada) {
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
                //  6 y 10
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("+")[0];
                if(tokenVar1 == tokenVar2) {
                    //  6
                    salida += "//  6\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 6", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[+]\s*[0]\s*[;]/, "");
                } else {
                    //  10
                    salida += "//  10\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 10", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[+]\s*[0]\s*/, "")});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[+]\s*[0]\s*/, "");
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[-]\s*[0]\s*[;]/)) {
                //  7 y 11
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("-")[0];
                if(tokenVar1 == tokenVar2) {
                    //  7
                    salida += "//  7\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 7", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[-]\s*[0]\s*[;]/, "");
                } else {
                    //  11
                    salida += "//  11\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 11", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[-]\s*[0]\s*/, "")});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[-]\s*[0]\s*/, "");
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[1]\s*[;]/)) {
                //  8 y 12
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("*")[0];
                if(tokenVar1 == tokenVar2) {
                    //  8
                    salida += "//  8\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 8", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[1]\s*[;]/, "");
                } else {
                    //  12
                    salida += "//  12\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 12", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[*]\s*[1]\s*/, "")});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[*]\s*[1]\s*/, "");
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[\/]\s*[1]\s*[;]/)) {
                //  9 y 13
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("/")[0];
                if(tokenVar1 == tokenVar2) {
                    //  9
                    salida += "//  9\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 9", eliminado: entradaSeparada[i], agregado: ""});
                    entradaSeparada[i] = entradaSeparada[i].replace(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[\/]\s*[1]\s*[;]/, "");
                } else {
                    //  13
                    salida += "//  13\n";
                    reporteOptimizador.push({linea: i+1, regla: "regla 13", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[\/]\s*[1]\s*/, tokenVar2)});
                    entradaSeparada[i] = entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[\/]\s*[1]\s*/, tokenVar2);
                }
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[2]\s*[;]/)) {
                //  14
                entradaSeparada[i] = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = entradaSeparada[i].split("=")[0];
                tokenVar2 = entradaSeparada[i].split("=")[1].split("*")[0];
                salida += "//  14\n";
                reporteOptimizador.push({linea: i+1, regla: "regla 14", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[2]\s*/, tokenVar2 + "+" + tokenVar2)});
                entradaSeparada[i] = entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[2]\s*/, tokenVar2 + "+" + tokenVar2);
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[*]\s*[0]\s*[;]/)) {
                //  15
                salida += "//  15\n";
                reporteOptimizador.push({linea: i+1, regla: "regla 15", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[0]\s*/, " 0")});
                entradaSeparada[i] = entradaSeparada[i].replace(/\s*[Tt][0-9]+\s*[*]\s*[0]\s*/, " 0");
            } else if (entradaSeparada[i].match(/[Tt][0-9]+\s*[=]\s*[0]\s*[\/]\s*[Tt][0-9]+\s*[;]/)) {
                //  16
                salida += "//  16\n";
                reporteOptimizador.push({linea: i+1, regla: "regla 16", eliminado: entradaSeparada[i], agregado: entradaSeparada[i].replace(/\s*[0]\s*[\/]\s*[Tt][0-9]+\s*/, " 0")});
                entradaSeparada[i] = entradaSeparada[i].replace(/\s*[0]\s*[\/]\s*[Tt][0-9]+\s*/, " 0");
            } else if (entradaSeparada[i].match(/[g][o][t][o]\s*[lL][0-9]+[;]/)) {
                //  1
                let aux = entradaSeparada[i].replace(/\s/g, '');
                tokenEti1 = aux.replace("goto","").replace(";","");
                let eliminados = "";
                for(let x = i; x < entradaSeparada.length; x++) {
                    if(entradaSeparada[x].match(/[lL][0-9]+\s*[:]\s*/)) {
                        tokenEti2 = entradaSeparada[x].replace(/\s/g, '').replace(":", "");
                        if(tokenEti2 == tokenEti1) {
                            salida += "//  1\n";
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

function TP(entrada) {
    let entradaSeparada = entrada.split(/\n/);
    let tokenVar1 = "";
    let tokenVar2 = "";
    let tokenVar3 = "";
    let tokenVar4 = "";
    let auxEntrada = "";
    let salida = "";
    for(let i = 0; i < entradaSeparada.length; i++) {
        if(entradaSeparada[i] != "") {
            if(entradaSeparada[i].match(/\s*[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[;]/)) {
                auxEntrada = entradaSeparada[i].replace(/\s/g, '');
                tokenVar1 = auxEntrada.replace(/\s*[=]\s*[Tt][0-9]+\s*[;]/, "");
                tokenVar2 = auxEntrada.replace(/\s*[Tt][0-9]+\s*[=]\s*/, "").replace(/\s*[;]\s*/, "");
                for(let x = i+1; x < entradaSeparada.length; x++) {
                    if(entradaSeparada[x].match(/\s*[Tt][0-9]+\s*[=]\s*[Tt][0-9]+\s*[;]/)){
                        let limpToken = entradaSeparada[x].replace(/\s/g, '');
                        tokenVar3 = limpToken.replace(/\s*[=]\s*[Tt][0-9]+\s*[;]/, "");
                        tokenVar4 = limpToken.replace(/\s*[Tt][0-9]+\s*[=]\s*/, "").replace(/\s*[;]\s*/, "");
                        if(tokenVar1 == tokenVar4 && tokenVar2 == tokenVar3) {
                            //  5
                            reporteOptimizador.push({linea: i+1, regla: "regla 5", eliminado: entradaSeparada[x], agregado: ""});
                            entradaSeparada[x] = "//regla5\n";
                        } else {
                            break;
                        }
                    } else if(entradaSeparada[x].match(/\s*[Ll][0-9]+\s*[:]/)) {
                        break;
                    } else if(entradaSeparada[x].match(/\s*[Tt][0-9]+\s*[=]\s*([Tt][0-9]+|[0-9]+)+\s*[+\-*\/]\s*([Tt][0-9]+|[0-9]+)\s*[;]/)) {
                        let limpio = entradaSeparada[x].replace(/\s/g, '');
                        let tokenAux = limpio.replace(/[=]\s*([Tt][0-9]+|[0-9]+)+\s*[+\-*\/]\s*([Tt][0-9]+|[0-9]+)\s*[;]/, "");
                        if(tokenAux == tokenVar1) break;
                    }
                }
            }
        }
        salida += entradaSeparada[i] + "\n";
    }
    return salida;
}

function optmGo(strEntrada) {
    let limpiar = "";

    limpiar = primeraPasada(strEntrada);
    
    limpiar = segundaPasada(limpiar);

    limpiar = terceraPasada(limpiar);

    return [limpiar, ]
}

module.exports.optmGo = optmGo;