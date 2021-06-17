import { Ambito } from "./Ambito";
import { Element } from "../Element";

function exec(_expresiones: Array<Element>, _ambito: Ambito) {
    _expresiones.forEach(element => {
        if (element.childs) {
            let nuevoAmbito = new Ambito(_ambito, "hijo");
            exec(element.childs, nuevoAmbito);
        }
        _ambito.addSimbolo(element);
    });
}

export = { exec: exec };
