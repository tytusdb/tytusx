"use strict";
class LlamadaFuncion extends ExpresionAncestor {
    constructor(identifier, valoresParametros, linea, columna) {
        super();
        this.identifier = identifier;
        this.valoresParametros = valoresParametros;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(ent, xmlData) {
        let tipo = new Tipo(TipoDato.err);
        let funcion = ListaFunciones.getFuncion(this.identifier);
        if (funcion != null && funcion != undefined)
            tipo = funcion.tipo;
        return tipo;
    }
    getValor(ent, xmlData) {
        if (!ListaFunciones.existe(this.identifier)) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No existe una funcion declarada con el nombre " + this.identifier, this.linea, this.columna));
            return;
        }
        let funcion = ListaFunciones.getFuncion(this.identifier);
        let entornoFuncion = new TablaSimbolosXquery(ent, this.identifier);
        let entornoParametros = new TablaSimbolosXquery(ent, this.identifier);
        if (!XpathUtil.cargarValoresParametros(entornoFuncion, entornoParametros, xmlData, funcion.listaParametros, this.valoresParametros)) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("El tipo o la cantidad de parametros es incorrecto para la funcion " + this.identifier, this.linea, this.columna));
            return;
        }
        entornoFuncion.tsPadre = ent.obtenerTablaGlobal();
        entornoFuncion.listaSimbolos = entornoParametros.listaSimbolos;
        try {
            funcion.listaIntrucciones.forEach(function (instruccion) {
                instruccion.ejecutar(entornoFuncion, xmlData);
            });
        }
        catch (exception) {
            if (exception instanceof ReturnException) {
                return XpathUtil.convertirXqueryAString(exception.valor);
            }
        }
        return null;
    }
}
