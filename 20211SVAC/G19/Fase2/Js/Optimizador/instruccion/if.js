var _if =/**@class */ (function(){
    function _if(linea, columna, expr1, comparador, expr2, id, tipo){
        this.linea = linea
        this.columna = columna
        this.expr1 = expr1
        this.expr2 = expr2
        this.comparador = comparador
        this.id = id
        this.codigo = ""
        this.tipo = tipo
    }
    _if.prototype.getTipo=function(){
        return this.tipo
    }
    _if.prototype.get3D = function(){
        this.codigo="generar 3d"
        return this.codigo
    }
    return _if
}())