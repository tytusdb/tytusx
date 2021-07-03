var declaracionS = /**@class*/ (function(){
    function declaracionS(linea, columna, tipo, tipo_dato, ids){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.tipo_dato = tipo_dato
        this.ids = ids
        this.codigo=""
    }
    declaracionS.prototype.getTipo = function () {
        return this.tipo
    }
    declaracionS.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    declaracionS.prototype.set3D = function(){
        this.codigo =""
        for(let i=0; i<this.ids.length; i++){
            if(i==0)
                this.codigo += this.ids[i]
            else
                this.codigo += ", "+this.ids[i]
        }
        this.codigo = this.tipo_dato +" "+ this.codigo+";\n"
        return this.codigo
        
    }
    declaracionS.prototype.getOptimizado=function () {
        return this.codigo
    }
    return declaracionS
}())