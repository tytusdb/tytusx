var asignarIdArray = /**@class */(function(){
    function asignarIdArray(linea, columna,tipo,id1, id2, tipo_dato, expr){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.tipo_dato = tipo_dato
        this.expr = expr
        this.id1 = id1
        this.id2 = id2
        this.codigo=""
    }
    asignarIdArray.prototype.getTipo = function(){
        return this.tipo
    }
    asignarIdArray.prototype.get3D = function(){
        this.codigo= this.id1 +" = "+this.id2 +"[("+this.tipo_dato+")"+this.expr+"];\n"
        return this.codigo
    }
    return asignarIdArray
}())