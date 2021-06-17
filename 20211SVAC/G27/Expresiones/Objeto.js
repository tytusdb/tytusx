class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaObjetos) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        if (listaAtributos) {
            this.listaAtributos = listaAtributos;
        }
        else {
            this.listaAtributos = [];
        }
        if (listaObjetos) {
            this.listaObjetos = listaObjetos;
        }
        else {
            this.listaObjetos = [];
        }
        this.tipo = 'Etiqueta';
    }
    agregarObjeto(obj) {
        this.listaObjetos.push(obj);
        return true;
    }
    obtenerBarraSimple(busqueda) {
        let listaRetorno = [];
        this.listaObjetos.forEach(function (value) {
            if (value.identificador == busqueda) {
                listaRetorno.push(value);
            }
        });
        return listaRetorno;
    }
    obtenerBarraDoble(busqueda) {
        let listaRetorno = [];
        this.listaObjetos.forEach(function (value) {
            if (value.identificador == busqueda) {
                listaRetorno.push(value);
            }
            else {
                listaRetorno.concat(value.obtenerBarraDoble(busqueda));
            }
        });
        return listaRetorno;
    }
    obtenerBarraDoblePred(busqueda, pos) {
        let listaRetorno = [];
        listaRetorno.push(this.listaObjetos[pos - 1]);
        this.listaObjetos.forEach(function (value) {
            if (value.identificador == busqueda) {
                listaRetorno.push(value);
            }
            else {
                listaRetorno.concat(value.obtenerBarraDoble(busqueda));
            }
        });
        return listaRetorno;
    }
}
