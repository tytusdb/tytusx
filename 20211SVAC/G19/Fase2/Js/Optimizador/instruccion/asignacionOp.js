var asignacionOp = /**@class*/(function(){
    function asignacionOp(linea, columna,id, expr, tipo){
        this.linea = linea
        this.columna = columna
        this.id = id
        this.expr = expr
        this. tipo = tipo
        this.codigo=""
        this.optimizado=false
    }

    asignacionOp.prototype.getTipo=function(){
        return this.tipo
    }
    asignacionOp.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL && this.optimizado==false)
            this.codigo = this.id + " = "+this.expr+" ;\n"
        else if(this.tipo!= tipoInstr.NULL&&this.optimizado==true)
            this.codigo= this.codigo
        else    
            this.codigo=""
        return this.codigo
    }
    asignacionOp.prototype.setOptimizado = function (codigo, optim) {
        if(optim==true)
            this.optimizado=true
        this.codigo=codigo
        return 
    }
    
    asignacionOp.prototype.getOptimizado = function () {
        return this.codigo
    }
    return asignacionOp
}())