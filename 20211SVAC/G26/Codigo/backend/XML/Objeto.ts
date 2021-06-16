import {Entorno} from '../AST/Entorno';
import { Simbolo } from '../AST/Simbolo';
import { Tipo } from '../AST/Tipo';
import {Instruccion} from '../Interfaz/instruccion';
import {Atributo} from './Atributo';

export class Objeto implements Instruccion{
    identificador:string;
    texto:string;
    listaAtributos:Array<Atributo>;
    listaObjetos: Array<Objeto>;
    isUnica: boolean;
    linea: number;
    columna: number;

    constructor(id:string, texto:string, linea:number, columna:number, listaAtributos:Array<Atributo>, listaO:Array<Objeto>, isUnica: boolean){
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.isUnica = isUnica;
    }

    ejecutar(entorno:Entorno):any {
        let local = new Entorno(this.identificador, entorno, entorno.global);
        local.agregarSimbolo('Etiqueta unica', new Simbolo(Tipo.ETIQUETA_UNIQUE, 'Etiqueta unica', this.isUnica, this.linea, this.columna))
        this.listaAtributos.forEach((elem:Atributo) => {
            elem.ejecutar(local);
        });
        this.listaObjetos.forEach((obj:Objeto) => {
            obj.ejecutar(local);
        });
        
        if (this.texto !== '')
            local.agregarSimbolo('Texto',new Simbolo(Tipo.STRING, 'Texto', this.texto, this.linea, this.columna));
        
        entorno.agregarSimbolo(this.identificador, new Simbolo(this.isUnica?Tipo.ETIQUETA_UNIQUE:Tipo.ETIQUETA, this.identificador, local, this.linea, this.columna));
    }
}