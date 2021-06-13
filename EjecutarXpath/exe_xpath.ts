function exepath(listainstrucciones:[])
{
    let p = tds_xml_persistente[0];
        //console.log(p[i]);
    for(let j:number = 0; j < listainstrucciones.length; j++)
    {
        for(let i:number = 0; i < p.length; i++)
        {
            //console.log(listainstrucciones[j]);
            //console.log(p[i]);
            //if(listainstrucciones[j])
            console.log(getInfoXpath(listainstrucciones[j], p[i]))
            //break;
        }
        
    }
}

//function getEntornos()
//Funcion para recorrer con diagonal o sin diagonal 
function getInfoXpath(listainstrucciones:any, entorno:TablaSimbolos)
{
    //console.log(listainstrucciones.ruta2)
    //console.log(entorno);
    
    if(listainstrucciones.dato.valor === entorno.entorno && listainstrucciones.ruta2 != undefined)
        return getInfoXpath(listainstrucciones.ruta2, entorno.simbolos)
    else
    {
        //console.log(entorno);

        let aux = [];
        
        for(let i : number = 0; i < entorno.length; i++)
        {
            if(entorno[i].tipo != 6)
            {
                for( let j: number = 0; j < entorno[i].simbolos.length; j++)
                {
                    if(listainstrucciones.ruta2 != undefined )
                    {
                        if(entorno[i].simbolos[j].tipo != 6 && listainstrucciones.ruta2.dato.valor === entorno[i].simbolos[j].entorno)
                        {
                            //console.log(entorno[i].simbolos[j]);
                            aux.push(entorno[i].simbolos[j]);
                        }
                    }
                    else
                    {
                        aux.push(entorno[i].simbolos[j]);
                    }
                }
                    
            }
            //console.log(entorno[i]);
            //if(listainstrucciones.ruta2.dato.valor)
        }
        //console.log(listainstrucciones.ruta2.dato.valor);
        return aux;        
    }
    
}