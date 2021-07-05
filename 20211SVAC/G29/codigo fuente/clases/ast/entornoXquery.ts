import variable from "../instrucciones/xquery/variable";
import { entorno } from "./entorno";
import { simbolo } from "./simbolo";

export default class entornoXquery{

    /* Crea nuevos entornos */
    newEntorno(oldEntorno:entorno){
        let newEntorno = new entorno(null);
        for (const key in oldEntorno["tabla"]) {
            if (Object.prototype.hasOwnProperty.call(oldEntorno["tabla"], key)) {
                if (key !== "xquery"){
                    newEntorno.agregar(key,oldEntorno["tabla"][key]);
                }else{
                    let newEnt = new entorno(newEntorno);
                    this.hijosEntorno(newEnt,oldEntorno["tabla"][key].valor);
                    newEntorno.agregar(key,new simbolo(oldEntorno["tabla"][key].id,newEnt,null,0,0))
                }
            }
        }
        return newEntorno;
    }

    /* recursiva y no recursiva para contenidos */
    hijosEntorno(ent:entorno,oldEnt:entorno){
        for (const key in oldEnt["tabla"]) {
            if (Object.prototype.hasOwnProperty.call(oldEnt["tabla"], key)) {
                let prinCont = oldEnt["tabla"][key];
                if(prinCont.valor instanceof entorno){
                    let subEnt = new entorno(oldEnt);
                    let contend = prinCont.valor
                    for (const key in contend["tabla"]) {
                        if (Object.prototype.hasOwnProperty.call(contend["tabla"], key)){
                            if(key.startsWith("var") || key.startsWith("param")){
                                let newVal:any = [];
                                if(Array.isArray(contend["tabla"][key].valor)){
                                    for(let i = 0; i < contend["tabla"][key].valor.length; i++){
                                        let vari = contend["tabla"][key].valor[i];
                                        if(vari instanceof variable){
                                            newVal.push(new variable(vari.id,vari.xpath,vari.linea,vari.columna,vari.valor));
                                        }else{
                                            newVal.push(vari);
                                        }
                                    }
                                }else{
                                    let vari = contend["tabla"][key].valor;
                                    if(vari instanceof variable){
                                        newVal = new variable(vari.id,vari.xpath,vari.linea,vari.columna,vari.valor);
                                    }else{
                                        newVal = vari;
                                    }
                                }
                                let newSim = new simbolo(contend["tabla"][key].id,newVal,contend["tabla"][key].tipo,contend["tabla"][key].linea,contend["tabla"][key].columna);
                                subEnt.agregar(key,newSim);
                            }else{
                                subEnt.agregar(key,contend["tabla"][key]);
                            }
                        }
                    }
                    let newSim = new simbolo(prinCont.id,subEnt,prinCont.tipo,prinCont.linea,prinCont.columna);
                    ent.agregar(key,newSim);
                }else{
                    if(key.startsWith("var")){
                        let newVal:any = [];
                        if(Array.isArray(prinCont.valor)){
                            for(let i = 0; i < prinCont.valor.length; i++){
                                let vari = prinCont.valor[i];
                                if(vari instanceof variable){
                                    newVal.push(new variable(vari.id,vari.xpath,vari.linea,vari.columna,vari.valor));
                                }else{
                                    newVal.push(vari);
                                }
                            }
                        }else{
                            let vari = prinCont.valor;
                            if(vari instanceof variable){
                                newVal = new variable(vari.id,vari.xpath,vari.linea,vari.columna,vari.valor);
                            }else{
                                newVal = vari;
                            }
                        }
                        let newSim  = new simbolo(prinCont.id,newVal,prinCont.tipo,prinCont.linea,prinCont.columna);
                        ent.agregar(key,newSim);
                    }
                }
            }
        }
    }
}