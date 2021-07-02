var funcion = /**@class*/ (function(){
    function funcion(linea, columna, tipo, instrucciones, parametros, name, tipo_func){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.codigo =""
        this.instrucciones = instrucciones
        this. parametros = parametros
        this.name = name
        this.tipo_func = tipo_func
    }
    funcion.prototype.getTipo = function () {
        return this.tipo
    }

    funcion.prototype.getInstrucciones = function(){
        return this.instrucciones
    }
    
    
    funcion.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    funcion.prototype.set3D = function(){
        var codigoAux = this.tipo_func +" "+ this.name + " ("
        //for (let i=0; i<this.parametros.length; i++){
            codigoAux += " "+this.parametros.set3D()
       // }
        codigoAux +="){\n"
        for (let i=0; i<this.instrucciones.length; i++){
            codigoAux += "\t"+this.instrucciones[i].set3D()
        }
        codigoAux += "}\n"
        this.codigo = codigoAux
        return this.codigo
    }
    funcion.prototype.getOptimizado=function () {
        return this.codigo
    }
    return funcion
}())