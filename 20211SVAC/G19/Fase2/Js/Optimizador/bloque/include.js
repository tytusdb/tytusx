var include = /**@class */(function(){
    function include(linea, columna, codigo, tipo){
        this.linea = linea
        this.columna = columna
        this.codigo = codigo
        this.tipo = tipo
    }
    include.prototype.get3D = function(){
        return this.codigo 
    }
    include.prototype.getTipo = function(){
        return this.tipo
    }
    
    return include
}())