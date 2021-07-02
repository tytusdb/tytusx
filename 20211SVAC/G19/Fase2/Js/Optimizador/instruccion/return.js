var Return =/**@class */(function(){
    function Return(linea, columna, codigo, tipo){
        this.linea = linea
        this.columna = columna
        this.codigo = codigo
        this.tipo = tipo
    }
    Return.prototype.getTipo = function(){
        return this.tipo
    }
    Return.prototype.set3D = function () {
        if(this.tipo== tipoInstr.NULL)
           this.codigo=""
        return this.codigo
    }
    Return.prototype.setOptimizado = function (codigo) {
        
            this.codigo=codigo
        return 
    }
    Return.prototype.getOptimizado=function () {
        return this.codigo
    }
    return Return
}())