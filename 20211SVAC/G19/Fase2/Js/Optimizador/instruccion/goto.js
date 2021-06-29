var goto =/**@class */ (function(){
    function goto(linea, columna, tipo, id){
        this.linea=linea
        this.columna = columna
        this.tipo = tipo
        this.id = id
        this.codigo =""
    }
    goto.prototype.getTipo = function(){
        return this.tipo
    }
    goto.prototype.get3D = function(){
        this.codigo = "goto "+this.id+";\n"
        return this.codigo
    }
    return goto
}())