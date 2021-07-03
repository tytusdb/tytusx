
class ReporteGramatical{
    listadoGramatical:Array<Array<string>> = new Array();
    run(raiz:NodoPadre):Array<Array<string>>{
        this.recursiva(raiz);
        return this.listadoGramatical;
    }
    recursiva(entrada:NodosCST){
        if(entrada instanceof NodoPadre){
            if(entrada.getProduccion() != "")this.listadoGramatical.push([entrada.getProduccion(),entrada.getReglaSemantica()]);
            entrada.getHijos().forEach(e => {
                this.recursiva(e);
            });
        }
        if(entrada instanceof NodoHijo){
            if(entrada.getProduccion() != "")this.listadoGramatical.push([entrada.getProduccion(),entrada.getReglaSemantica()]);
        }
    }
}