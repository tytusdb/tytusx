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
    Return.prototype.get3D = function(){
        return this.codigo
    }
    return Return
}())