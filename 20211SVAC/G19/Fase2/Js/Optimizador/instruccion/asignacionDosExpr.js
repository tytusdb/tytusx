var asignacionDosExpr =/**@class */ (function(){
    function asignacionDosExpr(linea, columna, tipo, id, expr1, operador, expr2){
        this.linea= linea
        this.columna = columna
        this.tipo = tipo
        this.id= id
        this.expr1= expr1
        this.expr2 = expr2
        this.operador = operador
        this.codigo= ""
        this.optimizado=false
    }
    asignacionDosExpr.prototype.getTipo = function(){
        return this.tipo
    }
    asignacionDosExpr.prototype.set3D = function(){
        if(this.tipo!= tipoInstr.NULL&&this.optimizado==false)
            this.codigo = this.id + " = "+this.expr1+" "+this.operador+" "+this.expr2+" ;\n"
        else if(this.tipo!= tipoInstr.NULL&&this.optimizado==true)
            this.codigo= this.codigo
        else    
            this.codigo=""
        return this.codigo
    }
    asignacionDosExpr.prototype.setOptimizado = function (codigo) {
        //if(optim==true)
            this.optimizado=true
        this.codigo=codigo
        return 
    }
    
    asignacionDosExpr.prototype.getOptimizado = function () {
        return this.codigo
    }
    return asignacionDosExpr
}())