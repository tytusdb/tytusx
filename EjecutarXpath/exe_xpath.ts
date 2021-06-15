function exepath(listainstrucciones:[])
{

    
    let p = tds_xml_persistente[0];
        //console.log(p[i]);
    for(let j:number = 0; j < listainstrucciones.length; j++)
    {
        if(listainstrucciones[j].ruta2==undefined) /////si vienen solo una ruta
        {
            for(let i:number = 0; i < p.length; i++)
        {
            
            let auxiliar=[];
            auxiliar=getrutasimple(listainstrucciones[j], p[i]);
            if(auxiliar!=undefined)
            {
                if(auxiliar.length>0)
                {console.log(getrutasimple(listainstrucciones[j], p[i]));}
            }
        }
        }

        else //////mas de una ruta
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
                        console.log("if");
                            aux.push(entorno[i].simbolos[j]);
                        }
                    }
                    else 
                    {
                        console.log(listainstrucciones);
                        console.log(entorno[i].simbolos[j].entorno);
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

function getrutasimple(listainstrucciones:any, entorno:TablaSimbolos)
{
    
    if(listainstrucciones.tipoRuta==0)//diagonal simple
    {
        if(listainstrucciones.dato.valor === entorno.entorno)
        {   return entorno;}
       else
        { 
           return undefined;        
        }
    }
    else if(listainstrucciones.tipoRuta==1)//diagonal doble
    {
        return buscaretiqueta(listainstrucciones.dato.valor,entorno);
    }
    if(listainstrucciones.tipoRuta==3)//sin diagonal
    {
        if(listainstrucciones.dato.valor === entorno.entorno)
        {   return entorno;}
       else
        { 
           return undefined;        
        }
    }   
    
}

function buscaretiqueta(etiqueta:string, entorno:TablaSimbolos)
{ 
    //console.log(entorno);
    let aux = [];

    if(entorno.simbolos!=undefined )
    {
        if(entorno.entorno  === etiqueta)
        {        
            aux.push(entorno.simbolos);
            return aux;
        }
        else 
        {
            for( let j: number = 0; j < entorno.simbolos.length; j++)
            {
            let aux1=buscaretiqueta(etiqueta,entorno.simbolos[j]);
            if(aux1!=undefined)
            {
                if(aux1.length>0)
                {aux.push(aux1);}
            }
            } 
            return aux;
        }
    }

     else
    {
        if(entorno.entorno === etiqueta)
        {        
            aux.push(entorno);
        }
        else
        {
            return undefined;
        }
        return aux;
    }

}