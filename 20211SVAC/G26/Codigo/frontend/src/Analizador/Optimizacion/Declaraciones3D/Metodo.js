export class Metodo {
    constructor(tipo, listaInstrucciones, codigo3D, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigo3Dir = codigo3D;
        this.listaInstrucciones = listaInstrucciones;
        ;
    }
    getCodigo3Dir() {
        //this.codigo3Dir  tiene el nombre del metodo (identificador)
        let auxCode = "void " + this.codigo3Dir + "() {\n";
        this.listaInstrucciones.forEach((instruccion) => {
            auxCode += "    " + instruccion.getCodigo3D() + "\n";
        });
        auxCode += "}";
        return auxCode;
    }
    setCodigo3Dir(codigo) {
        this.codigo3Dir = codigo;
    }
    optimizar() {
    }
}
