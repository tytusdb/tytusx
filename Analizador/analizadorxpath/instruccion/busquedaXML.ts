function BusquedaXML( entorno:TablaSimbolos, ruta:string )
{
    var list_entornos = [];
    if(entorno.entorno === ruta)
    {
        //tds_xml_persistente.forEach(element => console.log(element));
        for(let i:number = 0; i < tds_xml_persistente.length; i++)
        {
            if(tds_xml_persistente[i].entorno === ruta && tds_xml_persistente[i].simbolos.length > 0)
            {
                list_entornos.push(tds_xml_persistente[i].simbolos[0]);
            }
        }
    }

    console.log('VALORES DE LA LISTA: ', list_entornos);
    return list_entornos;
}