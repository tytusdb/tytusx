var parametro =/**@class */(function(){
    function parametro(linea, columna, tipo, ids){
        this.linea = linea
        this.columna = columna
        this.codigo = ""
        this.tipo = tipo
        this.ids=ids
    }
    parametro.prototype.getTipo = function(){
        return this.tipo
    }
    parametro.prototype.get3D= function(){
        var cod="";
        for(let i=0; i<this.ids.length; i++){
            if(i==0){
                cod += this.ids[i] +" " +this.ids[i+1]
                i++
            }else{
                
                cod += "," +this.ids[i] +" " +this.ids[i+1]
                i++
            }
        }
        return cod
    }
    return parametro
}())