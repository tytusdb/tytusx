var print = /**@class */(function(){
    function print(linea, columna, tipo, expr){
        this.linea = linea
        this.columna = columna
        this.tipo = tipo
        this.expr = expr
        this.codigo =""
    }
    print.prototype.getTipo = function(){
        return this.tipo
    }
    print.prototype.setOptimizado = function (codigo) {
        this.codigo=codigo
        return 
    }
    print.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL)
            this.codigo="printF("+this.expr+");\n"
        else    
            this.codigo=""
        return this.codigo
    }
    print.prototype.getOptimizado=function () {
        return this.codigo
    }
    return print
}())