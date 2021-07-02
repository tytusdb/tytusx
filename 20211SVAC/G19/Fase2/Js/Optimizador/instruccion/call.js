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
    call.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    call.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL){
            this.codigo = this.id+"("
            for(let i=0; i<this.ids.length; i++){
                if(i==0)
                    this.codigo+=this.ids[i]
                else    
                    this.codigo+=", "+this.ids[i]
            }
            this.codigo +=");\n"
        }else    
            this.codigo=""
        
        return this.codigo
    }
    call.prototype.getOptimizado=function () {
        return this.codigo
    }
    return call
}())