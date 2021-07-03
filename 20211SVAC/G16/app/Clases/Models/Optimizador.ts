export class Optimizador {

    cadena = ""
    public static reporte = []

    constructor() {
        /*Optimizador.reporte.push({
            regla:"",
            original:"",
            optimizado:"",
            fila:"",
            columna:""
        });*/
    }

    getExpresion(id: string, op1: string, op: string, op2: string, fila: string, columna: string): string {
        this.cadena = ""
        switch (op) {
            case "+":
                if (op1 == id && op2 == "0") {
                    Optimizador.reporte.push({
                        regla: "6",
                        original: id + " = " + op1 + " + " + op2 + ";",
                        optimizado: "Se elimina la instrucción.",
                        fila: fila,
                        columna: columna
                    });
                    return ""

                } else if (op1 != id && op2 == "0") {
                    Optimizador.reporte.push({
                        regla: "10",
                        original: id + " = " + op1 + " + " + op2 + ";",
                        optimizado: id + " = " + op1 + ";",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = " + op1 + ";" + "\n"

                } else {
                    return this.cadena = id + " = " + op1 + " + " + op2 + ";" + "\n"
                }

            case "-":
                if (op1 == id && op2 == "0") {
                    Optimizador.reporte.push({
                        regla: "7",
                        original: id + " = " + op1 + " - " + op2 + ";",
                        optimizado: "Se elimina la instrucción.",
                        fila: fila,
                        columna: columna
                    });
                    return ""

                } else if (op1 != id && op2 == "0") {
                    Optimizador.reporte.push({
                        regla: "11",
                        original: id + " = " + op1 + " - " + op2 + ";",
                        optimizado: id + " = " + op1 + ";",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = " + op1 + ";" + "\n"

                } else {
                    return this.cadena = id + " = " + op1 + " - " + op2 + ";" + "\n"
                }

            case "*":
                if (op1 == id && op2 == "1") {
                    Optimizador.reporte.push({
                        regla: "8",
                        original: id + " = " + op1 + " * " + op2 + ";",
                        optimizado: "Se elimina la instrucción.",
                        fila: fila,
                        columna: columna
                    });
                    return ""

                } else if (op1 != id && op2 == "1") {
                    Optimizador.reporte.push({
                        regla: "12",
                        original: id + " = " + op1 + " * " + op2 + ";",
                        optimizado: id + " = " + op1 + ";",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = " + op1 + ";" + "\n"

                } else if (op1 != id && op2 == "2") {
                    Optimizador.reporte.push({
                        regla: "14",
                        original: id + " = " + op1 + " * " + op2 + ";",
                        optimizado: id + " = " + op1 + " + " + op1 + ";",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = " + op1 + " + " + op1 + ";" + "\n"

                } else if (op1 != id && op2 == "0") {
                    Optimizador.reporte.push({
                        regla: "15",
                        original: id + " = " + op1 + " * " + op2 + ";",
                        optimizado: id + " = 0;",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = 0;" + "\n"

                } else {
                    return this.cadena = id + " = " + op1 + " * " + op2 + ";" + "\n"
                }

            case "/":
                if (op1 == id && op2 == "1") {
                    Optimizador.reporte.push({
                        regla: "9",
                        original: id + " = " + op1 + " / " + op2 + ";",
                        optimizado: "Se elimina la instrucción.",
                        fila: fila,
                        columna: columna
                    });
                    return ""

                } else if (op1 != id && op2 == "1") {
                    Optimizador.reporte.push({
                        regla: "13",
                        original: id + " = " + op1 + " * " + op2 + ";",
                        optimizado: id + " = " + op1 + ";",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = " + op1 + ";" + "\n"

                } else if (op2 != id && op1 == "0") {
                    Optimizador.reporte.push({
                        regla: "16",
                        original: id + " = " + op1 + " / " + op2 + ";",
                        optimizado: id + " = 0;",
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = id + " = 0;" + "\n"

                } else {
                    return this.cadena = id + " = " + op1 + " / " + op2 + ";" + "\n"
                }
        }
        return this.cadena
    }

    getInstruccion(op1: string, op: string, op2: string, et1: string, et2: string, fila: string, columna: string): string {
        this.cadena = ""
        switch (op) {
            case "==":
                if (op1 == op2) {
                    Optimizador.reporte.push({
                        regla: "3",
                        original: "if " + op1 + " == " + op2 + " " + et1 + et2,
                        optimizado: et1,
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = et1
                } else {
                    Optimizador.reporte.push({
                        regla: "4",
                        original: "if " + op1 + " == " + op2 + " " + et1 + et2,
                        optimizado: et2,
                        fila: fila,
                        columna: columna
                    });
                    return this.cadena = et2
                }
        }
        return this.cadena
    }

    getReporte() {
        localStorage.setItem("Optimizador",JSON.stringify(Optimizador.reporte))
        return Optimizador.reporte
    }

}