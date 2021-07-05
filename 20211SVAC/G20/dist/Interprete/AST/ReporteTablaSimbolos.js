class ReporteTablaSimbolos{

    constructor(){
        this.arreglo = [];
    }

    limpiarArreglo(){
        this.arreglo = [];
    }

    GenerarArreglo(entornoPadre, nombreAmbito){

        for (const [ key, value ] of Object.entries(entornoPadre.tabla)) {
            
            if (value.getTipo() == Tipo.ATRIBUTO){

                var atributoAux = {
                        "Nombre":value.getID(),
                        "Tipo": "Atributo",
                        "Ambito": nombreAmbito,
                        "Fila": value.getFila(),
                        "Columna": value.getColumna()
                }

                this.arreglo.push(atributoAux);

            } else if (value.getTipo() == Tipo.STRUCT) {

                var objetoAux = {
                    "Nombre": value.getID(),
                    "Tipo": "Objeto",
                    "Ambito": nombreAmbito,
                    "Fila": value.getFila(),
                    "Columna": value.getColumna()
                }

                this.arreglo.push(objetoAux);
                this.GenerarArreglo(value.getValor().getEntorno(),value.getID());

            }
        }
    }

}