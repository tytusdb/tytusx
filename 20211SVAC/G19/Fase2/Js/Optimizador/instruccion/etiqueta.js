var etiqueta =/**@class */(function(){
    function etiqueta(linea, columna, tipo, id){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.id = id
        this.codigo=""
    }
    etiqueta.prototype.getTipo = function(){
        return this.tipo
    }
    etiqueta.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    etiqueta.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL)
            this.codigo=this.id+":\n"
        else    
            this.codigo=""
        return this.codigo
    }
    etiqueta.prototype.getOptimizado=function () {
        return this.codigo
    }
    return etiqueta
}())