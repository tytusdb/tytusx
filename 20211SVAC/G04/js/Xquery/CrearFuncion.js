class CrearFuncion extends Instruccion {
    constructor(id, listadoParametros, tipoRetorno) {
        super(InstruccionTipos.CREACION_FUNCION);
        this.id = id;
        this.listadoParametros = listadoParametros;
        this.tipoRetorno = tipoRetorno;
    }
    setBloquecodigo(bloqueCodigo) {
        this.bloqueFuncion = bloqueCodigo;
    }
    getTipoRetornoTexto() {
        let tipos = ["ENTERO", "STRING", "DECIMAL", "BOOLEAN"];
        let retorno = "Any";
        if (this.tipoRetorno != null) {
            retorno = tipos[this.tipoRetorno];
        }
        return retorno;
    }
    traspilar() {
        let retorno = new Array();
        retorno.push(`function ${this.id}(${this.parametros()}){`);
        this.bloqueFuncion.forEach((e, i) => {
            if ((i + 1) == this.bloqueFuncion.length) {
                if (e instanceof Expresion) {
                    retorno.push(e.traspilarUltimo());
                }
                else if (e instanceof Instruccion) {
                    retorno.push(e.traspilar());
                }
            }
            else {
                if (e instanceof Instruccion) {
                    retorno.push(e.traspilar());
                }
            }
        });
        retorno.push(`}`);
        return retorno.join("\n");
    }
    parametros() {
        let retorno = new Array();
        this.listadoParametros.forEach(e => {
            retorno.push(e.id);
        });
        if (retorno.length > 0) {
            return retorno.join(",");
        }
        else {
            return "";
        }
    }
    generarC3D() {
        throw new Error("Method not implemented.");
    }
}
