class ReporteGramatical{
    constructor(){
        this.arreglo = [];
    }

    limpiarArreglo(){
        this.arreglo = [];
    }

    agregarElemento(produccion,regla){

        var elemento = {
            "Produccion": produccion,
            "Regla": regla,
    }

        this.arreglo.push(elemento);
    }
}