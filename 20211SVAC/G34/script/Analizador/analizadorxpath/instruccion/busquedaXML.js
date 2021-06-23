"use strict";
function BusquedaXML(entorno, ruta) {
    var list_entornos = [];
    for (var _i = 0, entorno_1 = entorno; _i < entorno_1.length; _i++) {
        var aux = entorno_1[_i];
        if (aux.entorno === ruta) {
            if (aux.simbolos.length > 0) {
                list_entornos.push(aux.simbolos);
            }
        }
    }
    //console.log('VALORES DE LA LISTA: ', list_entornos);
    return list_entornos;
}
function BusquedaXMLfinal(entorno, ruta) {
    var list_entornos = [];
    for (var _i = 0, entorno_2 = entorno; _i < entorno_2.length; _i++) {
        var aux = entorno_2[_i];
        if (aux[0].identificador == ruta) {
            list_entornos.push(aux[0]);
        }
    }
    return list_entornos;
}
function BusquedaXMLD(entorno, ruta, lst) {
    if (entorno.entorno === ruta) {
        lst.push(entorno.simbolos);
    }
    //var list_entornos = [];
    /*
    for(let i:number = 0; i < tds_xml_persistente.length; i++)
    {
        if(tds_xml_persistente[i].entorno === ruta)
        {
            list_entornos.push(tds_xml_persistente[i]);
        }
        else if(tds_xml_persistente[i].simbolos.length > 0)
        {
            for(let j:number = 0; j < tds_xml_persistente[i].simbolos.length; j++)
            {
                if(tds_xml_persistente[i].simbolos[j].entorno === ruta)
                {
                    list_entornos.push(tds_xml_persistente[i].simbolos[j]);
                }
            }
        }
    }*/
    //return list_entornos;
}
