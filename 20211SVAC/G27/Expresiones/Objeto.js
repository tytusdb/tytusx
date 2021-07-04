var Objeto = /** @class */ (function () {
    function Objeto(id, texto, linea, columna, listaAtributos, listaObjetos) {
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
    Objeto.prototype.agregarObjeto = function (obj) {
        this.listaObjetos.push(obj);
        return true;
    };
    Objeto.prototype.obtenerBarraSimple = function (busqueda) {
        var listaRetorno = [];
        this.listaObjetos.forEach(function (value) {
            if (value.identificador == busqueda) {
                listaRetorno.push(value);
            }
        });
        return listaRetorno;
    };
    Objeto.prototype.obtenerBarraDoble = function (busqueda) {
        var listaRetorno = [];
        this.listaObjetos.forEach(function (value) {
            if (value.identificador == busqueda) {
                listaRetorno.push(value);
            }
            else {
                listaRetorno.concat(value.obtenerBarraDoble(busqueda));
            }
        });
        return listaRetorno;
    };
    Objeto.prototype.obtenerBarraDoblePred = function (busqueda, pos) {
        var listaRetorno = [];
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
    };
    return Objeto;
}());
