var include = /**@class */(function(){
    function include(linea, columna, codigo, tipo){
        this.linea = linea
        this.columna = columna
        this.codigo = codigo
        this.tipo = tipo
    }
    include.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    include.prototype.set3D = function(){
        return this.codigo 
    }
    include.prototype.getTipo = function(){
        return this.tipo
    }
    include.prototype.getOptimizado=function () {
        return this.codigo
    }
    return include
}())