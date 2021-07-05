var _if =/**@class */ (function(){
    function _if(linea, columna, expr1, comparador, expr2, id, tipo){
        this.linea = linea
        this.columna = columna
        this.expr1 = expr1
        this.expr2 = expr2
        this.comparador = comparador
        this.id = id
        this.codigo = ""
        this.tipo = tipo
        this.optimizado=false
    }
    _if.prototype.getTipo=function(){
        return this.tipo
    }
    _if.prototype.setOptimizado = function (codigo,optim) {
        if(optim==true)
             this.optimizado=optim
        this.codigo=codigo
        return 
    }
    _if.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL&&this.optimizado==false)
            this.codigo="if("+this.expr1+" "+this.comparador+" "+this.expr2+") goto "+this.id+";\n"
        else if(this.tipo!= tipoInstr.NULL&&this.optimizado==true)
            this.codigo= this.codigo
        else    
            this.codigo=""
        return this.codigo
    }
    _if.prototype.getOptimizado=function () {
        return this.codigo
    }
    _if.prototype.invertirSigno=function(){
        switch (this.comparador) {
            case "==":
                this.comparador="!="
                break;
            case "!=":
                this.comparador="=="
                break;
            case ">=":
                this.comparador="<"
                break;
            case "<=":
                this.comparador=">"
                break;
            case "<":
                this.comparador=">="
                break;
            case ">":
                this.comparador="<="
                break;
            
        }
            
    
    }
    _if.prototype.isString = function(valor) {
        if (typeof valor =="string") return true
        return false
    }
    _if.prototype.validarCondicion = function(){
        if((!isNaN(this.expr1)&& !isNaN(this.expr2) || this.isString(this.expr1) && this.isString(this.expr2))){//si son numeros
            switch (this.comparador) {
                case "==":
                    if(this.expr1==this.expr2) return true
                        return false
                case "!=":
                    if(this.expr1!=this.expr2) return true
                        return false
                case "<=":
                    if(this.expr1<=this.expr2) return true
                        return false
                case ">=":
                    if(this.expr1>=this.expr2) return true
                        return false
                case "<":
                    if(this.expr1<this.expr2) return true
                        return false
                case ">":
                    if(this.expr1>this.expr2) return true
                        return false
            
            }
        }
    }
    return _if
}())