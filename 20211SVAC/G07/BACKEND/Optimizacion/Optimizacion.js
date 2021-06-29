class Optimizacion {

    constructor (cadena) {
        this.cadena = cadena;
        this.cadenaSplit = cadena.split('\n');
        this.cadenaOptimizada = [];
        this.bitacoraOptimizaciones = [];

        // t1 = t2;
        this.reAsignacion = /[a-zA-Z][a-zA-Z0-9_]*[\s]*[=][\s]*[a-zA-Z][a-zA-Z0-9_]*[\s]*[;]/;

        // t1 = t2 + 0;
        this.reAsignacionOp01 = /[a-zA-Z][a-zA-Z0-9_]*[\s]*[=][\s]*[a-zA-Z][a-zA-Z0-9_]*[\s]*[+|\-|*|/][\s]*[0-9]+[\s]*[;]/;
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

                //Regla 8 y 12
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
                }

                //Regla 9 y 13
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