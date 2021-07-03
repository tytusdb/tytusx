class Entorno{
    public anterior:Entorno;
    public tabla:{[id:string] : Simbolo};

    constructor(anterior:any){
        this.tabla = {};
        this.anterior = anterior;
    }

    agregar(id:string, simbolo:Simbolo){
        simbolo.identificador = simbolo.identificador;
        this.tabla[id+simbolo.linea+simbolo.columna] = simbolo;
    }

    eliminar(id:string):boolean{
        for (let e:Entorno = this; e != null; e = e.anterior)
        {   
            const value = e.tabla[id]
            if (value!==undefined)
            {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    existe(id:string):boolean{
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                return true;
            }
        }
        return false;
    }

    existeEnActual(id:string):boolean{
        if (this.tabla[id]!==undefined)
        {
            return true;
        }
        return false;
    }

    getSimbolo(id:string):any{
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!==undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazar(id:string, nuevoValor:Simbolo){
        for (let e:Entorno = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                e.tabla[id] = nuevoValor;
            }
        }
    }

    public registrarObjetoEnTS(objeto: any, entornoPadre: Entorno) {
        
        if(!(objeto instanceof Objeto)){
            return;
        }
        console.log("simboloPadre "+ objeto.identificador);
        const entornoObjeto: Entorno = new Entorno(null);
        if (objeto.listaAtributos != null && objeto.listaAtributos.length > 0) {
            objeto.listaAtributos.forEach((atributo: Atributo) => {
                if(atributo instanceof Atributo){
                    const simboloAtributo: Simbolo = new Simbolo(Tipo.ATRIBUTO, atributo.identificador, atributo.linea, atributo.columna, atributo.valor);
                    entornoObjeto.agregar(simboloAtributo.identificador, simboloAtributo);
                    console.log("simboloHijo Atributo " + simboloAtributo.identificador + " = " + simboloAtributo.valor);
                }
            })
        }
        if (objeto.listaObjetos != null && objeto.listaObjetos.length > 0) {
            objeto.listaObjetos.forEach((objetoHijo: Objeto) => {
                if(objetoHijo instanceof Objeto){
                    this.registrarObjetoEnTS(objetoHijo, entornoObjeto);
                    const simboloObjeto: Simbolo = new Simbolo(Tipo.OBJETO, objetoHijo.identificador, objetoHijo.linea, objetoHijo.columna, objetoHijo);
                    entornoObjeto.agregar(simboloObjeto.identificador, simboloObjeto);
                    console.log("simboloHijo Objeto " + simboloObjeto.identificador + " = " + simboloObjeto.valor.texto);
                }
            });
        }
        objeto.entorno = entornoObjeto;
        const simbolo: Simbolo = new Simbolo(Tipo.OBJETO, objeto.identificador, objeto.linea, objeto.columna, objeto);
        entornoPadre.agregar(simbolo.identificador, simbolo);
        console.log("finaliza padre " + objeto.identificador);
    }
}

