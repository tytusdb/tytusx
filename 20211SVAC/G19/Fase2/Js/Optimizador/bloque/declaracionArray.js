var declaracionArray = /**@class */(function(){
    function declaracionArray(linea, columna, tipo, id, tipo_dato, digito){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.codigo = ""
        this.id= id
        this.tipo_dato  = tipo_dato
        this.digito = digito

    }
    declaracionArray.prototype.get3D = function(){
        this.codigo = this.tipo_dato+" "+ this.id+"["+this.digito+"];\n"
        return this.codigo
    }
    return declaracionArray
}());