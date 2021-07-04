class ConsultaDescendente extends ConsultaSimple{

    run(entornosEntrada: Array<Entorno>): Array<Entorno> {
        let entornos:Array<Entorno> = new Array();
        let aux:Array<Entorno> = new Array();
        let er:boolean = false;
        entornosEntrada.forEach((e)=>{
            e.getTable().forEach((s)=>{
                if (s instanceof Nodo){
                    this.visitarHijos(s.getEntorno(),entornos);
                }
                if(entornos.length == 0 && s.getNombre()==super.getId()){
                    let entornonuevo = new Entorno(e);
                    entornonuevo.add(s);
                    aux.push(entornonuevo);
                }
            })
        });
        if(aux.length>0)entornos = aux;
    return entornos;
    }

    visitarHijos(entornoEntrada:Entorno,aux:Array<Entorno>):Array<Entorno>{
        entornoEntrada.getTable().forEach((e)=>{
            if(e instanceof Nodo){
                if(e.getNombre()==super.getId()){
                    let salida = new Entorno(entornoEntrada);
                    salida.add(e);
                    aux.push(salida);
                }else{
                    this.visitarHijos(e.getEntorno(),aux);
                }
            }
        });
        return aux;
    }
}
