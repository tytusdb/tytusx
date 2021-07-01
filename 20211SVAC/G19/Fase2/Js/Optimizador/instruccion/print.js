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
    print.prototype.get3D = function(){
        this.codigo="printF("+this.expr+");\n"
        return this.codigo
    }
    return print
}())