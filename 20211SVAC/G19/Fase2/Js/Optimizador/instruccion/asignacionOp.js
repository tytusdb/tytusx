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
    asignacionOp.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL)
            this.codigo = this.id + " = "+this.expr+" ;\n"
        else    
            this.codigo=""
        return this.codigo
    }
    asignacionOp.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    
    asignacionOp.prototype.getOptimizado = function () {
        return this.codigo
    }
    return asignacionOp
}())