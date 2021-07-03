class Nodo{


    constructor(val, tipo)
    {
        this.id=0;
        this.valor=val;
        this.tipo=tipo;
        this.lista_hojas=[];
    }

    nuevoNodo(nodo)
    {
        this.lista_hojas.push(nodo);
    }

    getValor(){
        this.val;
    }
    getTipo()
    {
        this.tipo;
    }

    eliminarNodo(nodo)
    {
        this.lista_hojas.pop(nodo);
    }
    
}