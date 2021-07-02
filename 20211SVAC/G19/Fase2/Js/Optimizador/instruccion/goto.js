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
    goto.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    goto.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL)
            this.codigo = "goto "+this.id+";\n"
        else    
            this.codigo=""
        return this.codigo
    }
    goto.prototype.getOptimizado=function () {
        return this.codigo
    }
    return goto
}())