const fs = require('fs');

export class Optimizar {

    public salidaConsola: any = [];
    public salidaOptimizado: any = [];

    constructor() { }

    optimizarCodigo(lista: any) {
        var objectList = lista.split('\n');
        try {
            for (let i = 0; i < objectList.length; i++) {
                var tmpSplit = this.obtenerLista(objectList[i]); // objectList[i].split(' ');

                if (objectList[i].includes('+ 0')) {
                    // Regla 6 T1 = T1 + 0; 
                    if (tmpSplit[0] == tmpSplit[2]) {
                        //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                        this.salidaConsola.push(`* REGLA 6: Se ha optimizado la linea: '${objectList[i]}', Se elimino la instrucción `);
                    }
                    // REGLA 10 T1 = T2 + 0;
                    else {
                        this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[2]};`);
                        this.salidaConsola.push(`* REGLA 10: Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = ${tmpSplit[2]};' `);
                    }
                } else if (objectList[i].includes('- 0')) {
                    // REGLA 7 T1 = T1 - 0; 
                    if (tmpSplit[0] == tmpSplit[2]) {
                        //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                        this.salidaConsola.push(`* REGLA 7: Se ha optimizado la linea: '${objectList[i]}', Se elimino la instrucción `);
                    }
                    // REGLA 11 T1 = T2 - 0;
                    else {
                        this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[2]};`);
                        this.salidaConsola.push(`* REGLA 11: Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = ${tmpSplit[2]};' `);
                    }
                } else if (objectList[i].includes('* 1')) {
                    // REGLA 8 T1 = T1 * 1; 
                    if (tmpSplit[0] == tmpSplit[2]) {
                        //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                        this.salidaConsola.push(`* REGLA 8: Se ha optimizado la linea: '${objectList[i]}', Se elimino la instrucción `);
                    }
                    // REGLA 12 T1 = T2 * 1;
                    else {
                        this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[2]};`);
                        this.salidaConsola.push(`* REGLA 12: Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = ${tmpSplit[2]};' `);
                    }
                } else if (objectList[i].includes('/ 1')) {
                    // REGLA 9 T1 = T1 / 1;
                    if (tmpSplit[0] == tmpSplit[2]) {
                        //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                        this.salidaConsola.push(`* REGLA 9: Se ha optimizado la linea: '${objectList[i]}', Se elimino la instrucción `);
                    }
                    // REGLA 13 T1 = T2 / 1;
                    else {
                        this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[2]};`);
                        this.salidaConsola.push(`* REGLA 13: Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = ${tmpSplit[2]};' `);
                    }
                } else if (objectList[i].includes('* 0')) {
                    // REGLA 15 T1 = T2 * 0;
                    this.salidaOptimizado.push(`${tmpSplit[0]} = 0;`);
                    this.salidaConsola.push(`* REGLA 15: Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = 0;' `);
                } else if (objectList[i].includes('/ 0')) {
                    // REGLA 16 T1 = 0 / T2;
                    this.salidaOptimizado.push(`${tmpSplit[0]} = 0;`);
                    this.salidaConsola.push(`* REGLA 13 Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = 0;' `);
                } else if (objectList[i].includes('* 2;')) {
                    // REGLA 14 T1 = T2 * 2;
                    this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]} + ${tmpSplit[0]};`);
                    this.salidaConsola.push(`* REGLA 14 Se ha optimizado la linea: '${objectList[i]}' a '${tmpSplit[0]} = ${tmpSplit[0]} + ${tmpSplit[0]};' `);
                }
                else {
                    this.salidaOptimizado.push(objectList[i]);
                }
            }
        } catch (error) {
            console.log('Trono :( ', error);
        }


        //Crear archivo 3d .c
        fs.appendFile('codigo3DOptimizado.c', this.salidaOptimizado.join('\n'), (error: any) => {
            if (error) {
                throw error;
            }
        });
    }

    obtenerLista(word: any): any {
        var tmpSplit = word.split(' ');
        var tmpArreglo = [];
        for (let i = 0; i < tmpSplit.length; i++) {
            if (tmpSplit[i] != '') {
                tmpArreglo.push(tmpSplit[i]);
            }
        }
        return tmpArreglo;
    }

    limpiarArreglos() {
        this.salidaConsola = [];
        this.salidaOptimizado = [];
    }

    returnConsola(): any {
        return this.salidaConsola;
    }

    returnOptimizado(): any {
        return this.salidaOptimizado;
    }
}