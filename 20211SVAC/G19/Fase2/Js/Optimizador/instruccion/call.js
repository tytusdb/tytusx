var call =/**@class */ (function(){
    function call(linea, columna, tipo, ids, id){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.codigo = ""
        this.ids = ids
        this.id = id
    }
    call.prototype.getTipo = function(){
        return this.tipo
    }
    call.prototype.get3D = function(){
        this.codigo = this.id+"("
        for(let i=0; i<this.ids.length; i++){
            if(i==0)
                this.codigo+=this.ids[i]
            else    
                this.codigo+=", "+this.ids[i]
        }
        this.codigo +=");\n"
        return this.codigo
    }
    return call
}())