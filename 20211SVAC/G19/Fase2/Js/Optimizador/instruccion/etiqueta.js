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
    etiqueta.prototype.get3D = function(){
        this.codigo=this.id+":\n"
        return this.codigo
    }
    return etiqueta
}())