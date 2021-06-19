//aca recibe la raiz
function ejecutarXPATH(tds:[],listaDir){

        if(listaDir.dato.tipo == TIPO_DATO.IDENTIFICADOR){

            let temporal = BusquedaXML(tds, listaDir.dato.valor);
            let t;                    
            if(listaDir.ruta2 != undefined){
               t= ejecutarXPATHr(temporal, listaDir.ruta2);
            }
            console.log('ESTO ES LO QUE IMPRIME' );
            console.log(t);
        }

}

function ejecutarXPATHr(tds:[], listaDir):any{
    let entornos = [];
    let p ;
    for(let aux of tds){
        let temporal = BusquedaXML(aux, listaDir.dato.valor);                    
        entornos = entornos.concat(temporal);
    }
    if(listaDir.ruta2.ruta2 != undefined){
            p = ejecutarXPATHr(entornos, listaDir.ruta2);
        }else{
            p = BusquedaXMLfinal(entornos, listaDir.ruta2.dato.valor);
        }
    return p;
}
