var main = /**@class*/ (function(){
    function main(linea, columna, tipo, instrucciones, parametros, tipo_func){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.codigo =""
        this.instrucciones = instrucciones
        this. parametros = parametros
        this.tipo_func = tipo_func
    }
    main.prototype.getTipo = function () {
        return this.tipo
    }
    main.prototype.getInstrucciones = function(){
        return this.instrucciones
    }
    main.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    main.prototype.set3D = function(){
        var codigoAux = this.tipo_func + " main ("
        for (let i=0; i<this.parametros.length; i++){
            codigoAux += " "+this.parametros[i].set3D()
        }
        codigoAux +="){\n"
        for (let i=0; i<this.instrucciones.length; i++){
            codigoAux += this.instrucciones[i].set3D()
        }
        codigoAux += "}\n"
        this.codigo = codigoAux
        return this.codigo
    }
    main.prototype.getOptimizado=function () {
        return this.codigo
    }
    return main
}())