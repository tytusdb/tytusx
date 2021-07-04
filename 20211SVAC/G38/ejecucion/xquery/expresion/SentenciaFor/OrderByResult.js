"use strict";
class OrderByResult {
    constructor(variable, orderExpresion, linea, columna) {
        this.variable = variable;
        this.orderExpresion = orderExpresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent, xmlData) {
        let simbolo = ent.obtenerSimbolo(this.variable);
        if (simbolo == null || !simbolo.tipo.esXpath()) {
            ListaErrores.AgregarErrorXQUERY(CrearError.errorSemantico("No se encontro la variable " + this.variable + "en el entorno actual para la instruccion order by", this.linea, this.columna));
            return;
        }
        return this.ordenarResultado(ent, simbolo.valorXpath);
    }
    ordenarResultado(ent, resultado) {
        let orderExp = this.orderExpresion;
        let simbolosOrdenados = resultado.listaSimbolos.sort(function (a, b) {
            var primitivo1;
            var primitivo2;
            var tabla1 = XpathUtil.crearTablaSimbolos([a]);
            var resultado1 = orderExp.getValor(ent, tabla1);
            if (resultado1 instanceof TablaSimbolos) {
                primitivo1 = resultado1.getContentRow();
            }
            var tabla2 = XpathUtil.crearTablaSimbolos([b]);
            var resultado2 = orderExp.getValor(ent, tabla2);
            if (resultado2 instanceof TablaSimbolos) {
                primitivo2 = resultado2.getContentRow();
            }
            if (primitivo1 != null && primitivo2 != null)
                return primitivo1.getValor(null, null) > primitivo2.getValor(null, null) ? 1 : -1;
            return 1;
        });
        return XpathUtil.crearTablaSimbolos(simbolosOrdenados);
    }
}
