class Optimizacion {

    constructor (cadena) {
        this.cadena = cadena;
        this.cadenaSplit = cadena.split('\n');
        this.cadenaOptimizada = [];
        this.bitacoraOptimizaciones = [];

        // t1 = t2;
        this.reAsignacion = /[a-zA-Z][a-zA-Z0-9_]*[\s]*[=][\s]*[a-zA-Z][a-zA-Z0-9_]*[\s]*[;]/;

        // t1 = t2 + 0;
        this.reAsignacionOp01 = /[a-zA-Z][a-zA-Z0-9_]*[\s]*[=][\s]*[a-zA-Z0-9][a-zA-Z0-9_]*[\s]*[+|\-|*|/][\s]*[a-zA-Z0-9][a-zA-Z0-9_]*[\s]*[;]/;

        // etiquetas
        this.reEtiqueta = /[L][0-9]+[\s]*[:][\s]*/
        this.reEtiqueta2 = /(.)*[\s]*[L][0-9]+[\s]*[:][\s]*/

        // If 
        this.reIf = /(if)[\s]*[(][\s]*[0-9]+[\s]*(==)[\s]*[0-9]+[\s]*[)][\s]*(goto)[\s]*[L][0-9]+[\s]*[;]/
        this.reIfCond = /(if)[\s]*[(][\s]*[0-9]+[\s]*(==|>|<|>=|<=|!=)[\s]*[0-9]+[\s]*[)][\s]*(goto)[\s]*[L][0-9]+[\s]*[;]/;

        // goto L1;
        this.reGoTo = /(goto)[\s]*[L][0-9]+[\s]*[;]/g;
    }


    /* 
     * Regla 1
     */
    regla1() {
        for (let i = 0; i < this.cadenaSplit.length; i++) {
            let instruccion = this.cadenaSplit[i].trim();

            let auxInstrucciones = [{indice: i, instruccion: instruccion}];

            //Verificar que sea un salto goto
            if (instruccion.startsWith('goto') && this.reGoTo.test(instruccion)) {

                // Buscar si existe la etiqueta  
                for (let j = i + 1; j < this.cadenaSplit.length; j++) {
                    let instruccionSiguiente = this.cadenaSplit[j].trim();
                    auxInstrucciones.push({indice: j, instruccion: instruccionSiguiente});

                    if (instruccionSiguiente.startsWith('L')) {

                        let etiquetaSalto = [...instruccion.matchAll(/[L][0-9]+/g)];
                        let etiqueta = [...instruccionSiguiente.matchAll(/[L][0-9]+/g)];

                        etiquetaSalto = etiquetaSalto[0][0];
                        etiqueta = etiqueta[0][0];


                        if (etiquetaSalto === etiqueta) {
                            console.log('Puedo optimizar por regla 1', auxInstrucciones);

                            auxInstrucciones.forEach(ins => {
                                this.cadenaSplit[ins.indice] = '';
                                this.cadenaOptimizada[ins.indice] = '';
                            });

                            this.cadenaSplit[j] = instruccionSiguiente;
                            this.cadenaOptimizada[j] = instruccionSiguiente;

                            this.bitacoraOptimizaciones.push({
                                regla: 1,
                                linea: i,
                                instruccion: `
                                ${instruccion} <br/>
                                ...instrucciones... <br/>
                                ${instruccionSiguiente}
                                `,
                                cambio: `${instruccionSiguiente}`
                            });

                            i == j;
                            break;

                        } else {
                            console.log('no puedo optimizar');

                            auxInstrucciones.forEach(ins => {
                                this.cadenaSplit[ins.indice] = ins.instruccion;
                                this.cadenaOptimizada[ins.indice] = ins.instruccion;
                            });

                            i == j;
                            break;
                        }

                        
                    }

                }

            }
        }
    }

    /**
     * Regla 2
     */
    //REGLA 2
    regla2() {
        for (let i = 0; i < this.cadenaSplit.length; i++) {
            let instruccion = this.cadenaSplit[i].trim();
            

            if (this.reIfCond.test(instruccion)) {
                let instruccionSiguiente = this.cadenaSplit[i + 1].trim();


                if (instruccionSiguiente.startsWith('goto')) {

                    let vals = [...instruccion.matchAll(/[0-9]+/g)];
                    let val1 = parseInt(vals[0][0]);
                    let val2 = parseInt(vals[1][0]);


                    let nInstrucc = instruccion;
                    let evalCond = false;
                    // Evaluar la condicion
                    if (instruccion.includes('==')) {
                        nInstrucc = instruccion.replace('==', '!=');
                        evalCond = val1 === val2;
                    } else if (instruccion.includes('>')) {
                        nInstrucc = instruccion.replace('>', '<');
                        evalCond = val1 > val2;
                    } else if (instruccion.includes('<')) {
                        nInstrucc = instruccion.replace('<', '>');
                        evalCond = val1 < val2;
                    } else if (instruccion.includes('>=')) {
                        nInstrucc = instruccion.replace('>=', '<=');
                        evalCond = val1 >= val2;
                    } else if (instruccion.includes('<=')) {
                        nInstrucc = instruccion.replace('<=', '>=');
                        evalCond = val1 <= val2;
                    } else if (instruccion.includes('!=')) {
                        nInstrucc = instruccion.replace('!=', '==');
                        evalCond = val1 !== val2;
                    } else {
                        break;
                    }

                    let goto1 = [...instruccion.matchAll(/[L][0-9]+/g)];
                    goto1 = goto1[0][0].trim();
                    

                    let instruccionTercera = this.cadenaSplit[i + 2].trim();
                    if (instruccionTercera.startsWith(goto1)) {

                        let goto2 = [...instruccionSiguiente.matchAll(/[L][0-9]+/g)];
                        goto2 = goto2[0][0].trim();

                        let auxInstrucciones = [];
                        for (let j = i + 3; j < this.cadenaSplit.length; j++) {

                            let auxInstruccion = this.cadenaSplit[j].trim();
                            auxInstrucciones.push({indice: j, instruccion: auxInstruccion});


                            if (auxInstruccion.startsWith(goto2) && evalCond) {
                                
                                // Remplazando la linea condicional
                                instruccion = nInstrucc.replace(goto1, goto2);
                                this.cadenaSplit[i] = nInstrucc.replace(goto1, goto2);
                                this.cadenaOptimizada[i] = nInstrucc.replace(goto1, goto2);

                                // Eliminando el segundo goto
                                this.cadenaSplit[i + 1] = '';
                                this.cadenaOptimizada[i + 1] = '';

                                // Eliminar la primera etiqueta
                                this.cadenaSplit[i + 2] = '';
                                this.cadenaOptimizada[i + 2] = '';

                                // Agregar las instrucciones de primera etiqueta
                                auxInstrucciones.forEach(ins => {
                                    this.cadenaSplit[ins.indice] = ins.instruccion;
                                    this.cadenaOptimizada[ins.indice] = ins.instruccion;
                                });

                                this.bitacoraOptimizaciones.push({
                                    regla: 2,
                                    linea: i,
                                    instruccion: `
                                    ${instruccion} <br/>
                                    ${instruccionSiguiente} <br/>
                                    ${instruccionTercera} <br/>
                                    ...instrucciones... <br/>
                                    ${auxInstruccion}
                                    `,
                                    cambio: `${this.cadenaSplit[i]} <br/>
                                    ...instrucciones...
                                    ${auxInstruccion}
                                    `
                                });

                                console.log(auxInstrucciones);
                                break;

                            }

                        }

                    }
                }

            }

            this.cadenaSplit[i] = instruccion;
            this.cadenaOptimizada[i] = instruccion;
        }
    }


    /*
     *  Regla 3 y Regla 4
     */
    regla3_4() {
        for (let i = 0; i < this.cadenaSplit.length; i++) {
            let instruccion = this.cadenaSplit[i].trim();
            

            if (this.reIfCond.test(instruccion)) {
                let instruccionSiguiente = this.cadenaSplit[i + 1].trim();


                if (instruccionSiguiente.startsWith('goto')) {
                    
                    let vals = [...instruccion.matchAll(/[0-9]+/g)];
                    let val1 = parseInt(vals[0][0]);
                    let val2 = parseInt(vals[1][0]);

                    let evalCond = false;
                    // Evaluar la condicion
                    if (instruccion.includes('==')) {
                        evalCond = val1 === val2;
                    } else if (instruccion.includes('>')) {
                        evalCond = val1 > val2;
                    } else if (instruccion.includes('<')) {
                        evalCond = val1 < val2;
                    } else if (instruccion.includes('>=')) {
                        evalCond = val1 >= val2;
                    } else if (instruccion.includes('<=')) {
                        evalCond = val1 <= val2;
                    } else if (instruccion.includes('!=')) {
                        evalCond = val1 !== val2;
                    } else {
                        break;
                    }

                    if (evalCond) { // Regla 3

                        let goto = [...instruccion.matchAll(this.reGoTo)];
                        let goEtiqueta = goto[0][0];

                        this.cadenaOptimizada[i] = goEtiqueta;
                        this.cadenaOptimizada[i + 1] = '';

                        i = i + 1;

                        this.bitacoraOptimizaciones.push({
                            regla: 3,
                            linea: i,
                            instruccion: `
                            ${instruccion} <br/>
                            ${instruccionSiguiente}
                            `,
                            cambio: `${goEtiqueta}`
                        });

                    } else { // Regla 4

                        this.cadenaOptimizada[i] = instruccionSiguiente;
                        this.cadenaOptimizada[i + 1] = '';

                        i = i + 1;

                        this.bitacoraOptimizaciones.push({
                            regla: 4,
                            linea: i,
                            instruccion: `
                            ${instruccion} <br/>
                            ${instruccionSiguiente}
                            `,
                            cambio: `${instruccionSiguiente}`
                        });

                        
                    }

                }

            }
        }
    }

    /**
     * T3 = T2                                  T3 = T2;    
     * <INSTRUCCIONES>            --->          <INSTRUCCIONES>
     * T2 = T3
     */
    regla5(){
        
        // Se recorre cada una de las lineas del C3D
        for (let i = 0; i < this.cadenaSplit.length; i++) {

            let instruccion = this.cadenaSplit[i].trim();

            if (this.reAsignacion.test(instruccion)) {

                for (let j = i + 1; j < this.cadenaSplit.length; j++) {
                    let instruccionSig = this.cadenaSplit[j].trim(); 

                    if (this.reAsignacion.test(instruccionSig)) {

                        let id = instruccion.split('=')[0].trim();
                        let idSig = instruccionSig.split('=')[0].trim();

                        let asig = instruccion.split('=')[1].replace(';','').trim();
                        let asigSig = instruccionSig.split('=')[1].replace(';','').trim();

                        if ((id === asigSig) && (idSig === asig)) {
                            let nuevaInstruccion = instruccion;

                            this.cadenaOptimizada[i] = nuevaInstruccion;
                            this.cadenaSplit[j] = '';

                            this.bitacoraOptimizaciones.push({
                                regla: 5,
                                linea: i,
                                instruccion: `
                                ${instruccion} <br/>
                                ...instruciones...<br/>
                                ${instruccionSig}
                                `,
                                cambio: `
                                ${nuevaInstruccion} <br/>
                                ...instruciones...
                                `
                            });
                        }

                        
                    }
                }
            }

            this.cadenaOptimizada[i] = instruccion;

        }

    }

    /**
     *  Eliminacion 
     * ------------------
     *  Regla 6: T1 = T1 + 0;     ----->   Se elimina la instruccion
     *  Regla 7: T1 = T1 - 0;      ----->   Se elimina la instruccion
     *  Regla 8: T1 = T1 * 1;      ----->   Se elimina la instruccion
     *  Regla 9: T1 = T1 / 1;      ----->   Se elimina la instruccion
     *  
     *  Reduccion
     *  -------------------
     *  Regla 10: T1 = T2 + 0;     ----->   T1 = T2;
     *  Regla 11: T1 = T2 - 0;     ----->   T1 = T2;
     *  Regla 12: T1 = T2 * 1;     ----->   T1 = T2;
     *  Regla 13: T1 = T2 / 1;     ----->   T1 = T2;
     *  
     *  Reduccion por Fuerza
     *  -------------------
     *  Regla 14: T1 = T2 * 2;     ----->   T1 = T2 + T2;
     *  Regla 15: T1 = T2 * 0;     ----->   T1 = 0;
     *  Regla 16: T1 = 0 / T2;     ----->   T1 = 0;
     */
    regla6_7_8_9() {
        for (let i = 0; i < this.cadenaSplit.length; i++) {

            let instruccion = this.cadenaSplit[i].trim();

            if (this.reAsignacionOp01.test(instruccion)) {

                let instruccionSplit = instruccion.replace(';','').split('=');
                let id1 = instruccionSplit[0].trim();

                // Regla 6 y 10
                if (instruccionSplit[1].includes('+')) {
                    let operacionSplit = instruccionSplit[1].split('+');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

                    console.log(instruccion);
                    console.log('   ', id1, '----', idOperacion);
                    console.log('   ', valOperacion);

                    // Regla 6
                    if ((id1 === idOperacion) && (valOperacion === '0')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 6,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    }
                    
                    if ((id1 === valOperacion) && (idOperacion === '0')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 6,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    } 

                    

                    // Regla 10
                    if ((id1 !== idOperacion) && (valOperacion === '0')) {
                        let nuevaInstruccion = `${id1} = ${idOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 10,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }

                    if ((id1 !== valOperacion) && (idOperacion === '0')) {
                        let nuevaInstruccion = `${id1} = ${valOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 10,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    } 


                }

                //Regla 7 y 11
                if (instruccionSplit[1].includes('-')) {
                    let operacionSplit = instruccionSplit[1].split('-');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

                    // Regla 7
                    if ((id1 === idOperacion) && (valOperacion === '0')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 7,
                            linea: i,
                            instruccion: `${idOperacion} = ${idOperacion} - 0;`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    }

                    // Regla 11
                    if ((id1 !== idOperacion) && (valOperacion === '0')) {
                        let nuevaInstruccion = `${id1} = ${idOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 11,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }
                }

                //Regla 8 y 12 y 14 Y 15
                if (instruccionSplit[1].includes('*')) {
                    let operacionSplit = instruccionSplit[1].split('*');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

                    // Regla 8
                    if ((id1 === idOperacion) && (valOperacion === '1')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 8,
                            linea: i,
                            instruccion: `${idOperacion} = ${idOperacion} * 1;`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    }

                    if ((id1 === valOperacion) && (idOperacion === '1')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 6,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    } 

                    // Regla 12
                    if ((id1 !== idOperacion) && (valOperacion === '1')) {
                        let nuevaInstruccion = `${id1} = ${idOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 12,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }

                    if ((id1 !== valOperacion) && (idOperacion === '1')) {
                        let nuevaInstruccion = `${id1} = ${valOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 12,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }

                    // Regla 14
                    if ((id1 !== idOperacion) && (valOperacion === '2')) {
                        let nuevaInstruccion = `${id1} = ${idOperacion} + ${idOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 14,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }

                    if ((id1 !== valOperacion) && (idOperacion === '2')) {
                        let nuevaInstruccion = `${id1} = ${valOperacion} + ${valOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 14,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }

                    // Regla 15
                    if ((id1 !== idOperacion) && (valOperacion === '0')) {
                        let nuevaInstruccion = `${id1} = 0;`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 15,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`

                        });
                        continue;
                    }

                    if ((id1 !== valOperacion) && (idOperacion === '0')) {
                        let nuevaInstruccion = `${id1} = 0;`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 15,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`

                        });
                        continue;
                    }
                }

                //Regla 9 y 13 y 16
                if (instruccionSplit[1].includes('/')) {
                    let operacionSplit = instruccionSplit[1].split('/');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

                    // Regla 9
                    if ((id1 === idOperacion) && (valOperacion === '1')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 9,
                            linea: i,
                            instruccion: `${idOperacion} = ${idOperacion} / 1;`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    }

                    // Regla 13
                    if ((id1 !== idOperacion) && (valOperacion === '1')) {
                        let nuevaInstruccion = `${id1} = ${idOperacion};`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 13,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }

                    // Regla 16
                    if ((id1 !== valOperacion.trim()) && (idOperacion === '0')) {
                        let nuevaInstruccion = `${id1} = 0;`;

                        this.cadenaOptimizada[i] = nuevaInstruccion;
                        this.cadenaSplit[i] = nuevaInstruccion;
                        this.bitacoraOptimizaciones.push({
                            regla: 16,
                            linea: i,
                            instruccion: `${instruccion}`,
                            cambio: `${nuevaInstruccion}`
                        });
                        continue;
                    }
                }
            }
            this.cadenaOptimizada[i] = instruccion;
        }
    }
    
    obtenerOptimizacion() {
        console.log(this.bitacoraOptimizaciones);

        return this.cadenaOptimizada.join('\n');
    }

    
    obtenerOptimizacion() {
        console.log(this.bitacoraOptimizaciones);

        return this.cadenaOptimizada.join('\n');
    }

}