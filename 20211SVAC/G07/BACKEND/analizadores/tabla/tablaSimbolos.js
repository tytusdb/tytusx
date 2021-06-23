class TablaSimbolos {

    constructor(jsonStruct) {
        this.jsonStruct = jsonStruct
        this.simbolos = []
    }

    generarTablaRecursivo(ambito, ambitoPadre) {
        if (ambito) {
            let nombre = ambito['etiqueta'];
            let tipo = ambito['tipo'];
            let fila = ambito['linea'];
            let col = ambito['columna'];
            let texto = ambito['texto'];
            
            this.simbolos.push(new Simbolo(nombre, "etiqueta " + tipo, ambitoPadre, fila, col, texto));

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

                    this.simbolos.push(new Simbolo(nombreAtributo, tipoAtributo, ambitoAtributo, filaAtributo, colAtributo, valorAtributo));
                });
            }

            //VERIFICANDO LOS HIJOS
            if (ambito['hijos']) {
                ambito['hijos'].forEach(hijo => {
                    this.generarTablaRecursivo(hijo, nombre);
                });
            }


        }
    }


    generarTabla() {
        this.generarTablaRecursivo(this.jsonStruct, "GLOBAL");
        return this.simbolos;
    }


}
