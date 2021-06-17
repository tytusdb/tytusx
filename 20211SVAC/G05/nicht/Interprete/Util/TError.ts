export let errorSem: any[] = []
export let errorSin: any[] = []
export let errorLex: any[] = []


function Error(tipo: string, desc: string, analizador: string, linea: number, col: number) {
    return {
        tipo: tipo,
        descripcion: desc,
        analizador: analizador,
        linea: linea,
        columna: col
    }
}

export class TError {
    tablaErrores: any[] = []
    semantico: any[] = []
    lexic: any[] = []

    agregar(tipo: string, desc: string, analizador: string, linea: number, col: number) {
        const result = Error(tipo, desc, analizador, linea, col)
        this.tablaErrores.push(result)
        errorSem.push(result)
    }

    imprimir() {
        let todosErrores = "";
        this.tablaErrores.forEach(element => {
            todosErrores += "[error][ linea: " + element.linea + " columna: " + element.columna + " ] " + element.descripcion + "\n";
        });
        return todosErrores;
    }

    get() {
        return this.tablaErrores;
    }
}

export class ESintactico {
    constructor(tipo: string, descripcion: string, analizador: string, linea: number, columna: number) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        errorSin.push(result);
    }
}

export class ELexico {
    constructor(tipo: string, descripcion: string, analizador: string, linea: number, columna: number) {
        const result = Error(tipo, descripcion, analizador, linea, columna);
        errorLex.push(result);
    }
}

export function resetTE() {
    errorSem = [];
    errorSin = [];
    errorLex = [];
}