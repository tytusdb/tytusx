enum tipoElemento{
    DIAGONAL
    ,DOBLE_DIAGONAL    
}
class Elemento implements Instruccion{
    valor:string;
    tipo:tipoElemento;

    constructor(valor:string, tipo:tipoElemento){
        this.valor = valor;
        this.tipo = tipo;
    }

    ejecutarInstrucciones(objetoRaiz:Array<Objeto>,elementoABuscar:Elemento): Array<Objeto>{
        let listaRetorno : Array <Objeto> = [];
        if(Array.isArray(objetoRaiz))
        {
            objetoRaiz.forEach(  function(value){
                if(elementoABuscar.tipo==tipoElemento.DIAGONAL)
                {
                    listaRetorno = listaRetorno.concat(value.obtenerBarraSimple(elementoABuscar.valor));
                }
                else if(elementoABuscar.tipo==tipoElemento.DOBLE_DIAGONAL)
                {
                    alert("Diagonal doble");
                    listaRetorno = listaRetorno.concat(value.obtenerBarraDoble(elementoABuscar.valor));
                }
                
            });
        }
        return listaRetorno;
    }
}