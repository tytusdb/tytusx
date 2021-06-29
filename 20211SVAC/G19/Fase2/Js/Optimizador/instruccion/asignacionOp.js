var asignacionOp = /**@class*/(function(){
    function asignacionOp(linea, columna,id, expr, tipo){
        this.linea = linea
        this.columna = columna
        this.id = id
        this.expr = expr
        this. tipo = tipo
        this.codigo=""
    }

    asignacionOp.prototype.getTipo=function(){
        return this.tipo
    }
    asignacionOp.prototype.get3D = function(){
        this.codigo = this.id + " = "+this.expr+" ;\n"
        return this.codigo
    }
    return asignacionOp
}())