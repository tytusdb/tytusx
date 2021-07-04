class GenerarArbol{

    constructor(){
        this.id_n=1;
    }

    recorrerDOT(nodo){
        var concatena = "";
        if(nodo.id==0){
            nodo.id=this.id_n;
            this.id_n++;
        }
        concatena += nodo.id + ' [label= "'+ nodo.valor +'" shape="oval"];'+ "\n";
            nodo.hijos.forEach(element => {
                concatena += nodo.id+'->'+ this.id_n +";" + "\n";
                concatena+=this.recorrerDOT(element);
            });
        return concatena;
    }


    recorrerArbol(objeto){

    }

}