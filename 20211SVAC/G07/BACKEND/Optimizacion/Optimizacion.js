class Optimizacion {

    constructor (cadena) {
        this.cadena = cadena;
        this.cadenaSplit = cadena.split('\n');
        this.cadenaOptimizada = [];
        this.bitacoraOptimizaciones = [];

        this.reAsignacion = /[a-zA-Z][a-zA-Z0-9_]*[\s]*[=][\s]*[a-zA-Z][a-zA-Z0-9_]*[\s]*[;]/;
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
     */
    regla6_7_8_9() {
        for (let i = 0; i < this.cadenaSplit.length; i++) {

            let instruccion = this.cadenaSplit[i].trim();

            if (this.reAsignacionOp01.test(instruccion)) {
                console.log(instruccion);

                let instruccionSplit = instruccion.replace(';','').split('=');
                let id1 = instruccionSplit[0].trim();

                // Regla 6
                if (instruccionSplit[1].includes('+')) {
                    let operacionSplit = instruccionSplit[1].split('+');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

                    if ((id1 === idOperacion) && (valOperacion === '0')) {
                        this.cadenaOptimizada[i] = '';
                        this.cadenaSplit[i] = '';
                        this.bitacoraOptimizaciones.push({
                            regla: 6,
                            linea: i,
                            instruccion: `${idOperacion} = ${idOperacion} + 0;`,
                            cambio: `Se elimina la instruccion`
                        });
                        continue;
                    }
                }

                //Regla 7
                if (instruccionSplit[1].includes('-')) {
                    let operacionSplit = instruccionSplit[1].split('-');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

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
                }

                //Regla 8
                if (instruccionSplit[1].includes('*')) {
                    let operacionSplit = instruccionSplit[1].split('*');
                    let idOperacion = operacionSplit[0].trim();
                    let valOperacion = operacionSplit[1].trim();

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