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
    asignacionArray.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    asignacionArray.prototype.set3D = function(){
        if(this.tipo!=tipoInstr.NULL)
            this.codigo=this.id +"[("+this.tipo_dato+")"+this.expr1+"]= "+this.expr2+";\n"
        else    
            this.codigo=""
        return this.codigo
    }
    asignacionArray.prototype.getOptimizado=function () {
        return this.codigo
    }
    return asignacionArray
}())