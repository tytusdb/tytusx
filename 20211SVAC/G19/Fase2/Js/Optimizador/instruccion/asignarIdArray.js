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
        this.optimizado=false
    }
    asignarIdArray.prototype.getTipo = function(){
        return this.tipo
    }
    asignarIdArray.prototype.setOptimizado = function (codigo,optim) {
        if(optim==true)
            this.optimizado=true
        this.codigo=codigo
        return 
    }
    asignarIdArray.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL&&this.optimizado==false)
            this.codigo= this.id1 +" = "+this.id2 +"[("+this.tipo_dato+")"+this.expr+"];\n"
        else if(this.tipo!= tipoInstr.NULL&&this.optimizado==true)
            this.codigo= this.codigo
        else    
            this.codigo=""
        return this.codigo
    }
    asignarIdArray.prototype.getOptimizado=function () {
        return this.codigo
    }
    return asignarIdArray
}())