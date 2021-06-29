var asignacionArray = /**@class */ (function(){
    function asignacionArray(linea, columna, tipo, id,tipo_dato, expr1, expr2){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.tipo_dato = tipo_dato
        this.expr1 = expr1
        this.expr2 = expr2
        this.id = id
        this.codigo = ""
    }
    asignacionArray.prototype.getTipo = function(){
        return this.tipo
    }
    asignacionArray.prototype.get3D = function(){
        this.codigo=this.id +"[("+this.tipo_dato+")"+this.expr1+"]= "+this.expr2+";\n"
        return this.codigo
    }
    return asignacionArray
}())