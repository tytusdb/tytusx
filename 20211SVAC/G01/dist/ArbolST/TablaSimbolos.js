class TablaSimbolos {

    constructor(jsonStruct) {
        this.jsonStruct = jsonStruct;
        this.unidad = [];
    }

    getTablaRec(ambito, ambito_Superior) {
        if (ambito) {
            let nombre = ambito['etiqueta'];
            let tipo = ambito['tipo'];
            let fila = ambito['linea'];
            let col = ambito['columna'];
            let texto = ambito['texto'];
            
            this.unidad.push(new Simbolo(nombre, "etiqueta " + tipo, ambito_Superior, fila, col, texto));

            //ATRIBUTOS DE LA ETIQUETA
            if (ambito['atributos']) {
                let arrayAtributos = ambito['atributos'];

                arrayAtributos.forEach(atributo => {
                    let filaAtributo = atributo.linea;
                    let colAtributo = atributo.columna;
                    let nombreAtributo = atributo.nombreAtributo;
                    let valorAtributo = atributo.valorAtributo;
                    let ambitoAtributo = nombre;
                    let tipoAtributo = "atributo";

                    this.unidad.push(new Simbolo(nombreAtributo, tipoAtributo, ambitoAtributo, filaAtributo, colAtributo, valorAtributo));
                });
            }

            //VERIFICANDO LOS HIJOS
            if (ambito['hijos']) {
                ambito['hijos'].forEach(hijo => {
                    this.getTablaRec(hijo, nombre);
                });
            }


        }
    }


    generarTabla() {
        this.getTablaRec(this.jsonStruct, "global");
        return this.unidad;
    }


}