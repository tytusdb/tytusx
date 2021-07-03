class ReporteTablaSimbolosXML{

    constructor(){
        this.arreglo = [];
    }

    limpiarArreglo(){
        this.arreglo = [];
    }

    getArreglo(){
        return this.arreglo;
    }

    GenerarArreglo(entornoPadre, nombreAmbito){


        for (var i=0; i < entornoPadre.tabla.length;i++ ) {

            if (entornoPadre.tabla[i].getTipo() == Tipo.ATRIBUTO){

                var atributoAux = {
                        "Nombre":entornoPadre.tabla[i].getID(),
                        "Tipo": "Atributo",
                        "Ambito": nombreAmbito,
                        "Fila": entornoPadre.tabla[i].getFila(),
                        "Columna": entornoPadre.tabla[i].getColumna(),
                        "Posicion": entornoPadre.tabla[i].getPosicion(),
                        "PosicionH": entornoPadre.tabla[i].getPosicionH()
                }

                this.arreglo.push(atributoAux);

            } else if (entornoPadre.tabla[i].getTipo() == Tipo.STRUCT) {

                var objetoAux = {
                    "Nombre": entornoPadre.tabla[i].getID(),
                    "Tipo": "Objeto",
                    "Ambito": nombreAmbito,
                    "Fila": entornoPadre.tabla[i].getFila(),
                    "Columna": entornoPadre.tabla[i].getColumna(),
                    "Posicion": entornoPadre.tabla[i].getPosicion(),
                    "PosicionH": entornoPadre.tabla[i].getPosicionH()
                }

                this.arreglo.push(objetoAux);
                this.GenerarArreglo(entornoPadre.tabla[i].getValor().getEntorno(),entornoPadre.tabla[i].getID());

            }

        }


    }

}