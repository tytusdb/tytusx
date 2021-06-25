import { Simbolo } from "../../InterpreteXML/TablaSimbolo/Simbolo";
import { TipoDato } from "../../InterpreteXML/TablaSimbolo/TipoDato";
import NodoAST from "../AST/NodoAST";

export abstract class Expresion{

    public fila:number;
    public columna:number;

    constructor(fila:number, columna:number){
        this.fila = fila;
        this.columna = columna;
    }
    public abstract evaluar():Simbolo;

    public abstract ast():NodoAST;

    public abstract concatenar():any;

    public abstract buscar( lista:Array<Simbolo>, isFinal:boolean):Array<Simbolo>;

    public  BuscarEntorno(datos: Array<Simbolo>, id: string, final: boolean, pos: number): Array<Simbolo> {
        
        let entornos: Array<Simbolo> = datos;
        let aux: Array<Simbolo> = [];
      
        if (pos !== 0) {
          for (let j = 0; j < entornos.length; j++) {
            if (entornos[j].id === id) {
              aux.push(entornos[j]);
            }
          }
          entornos = [];
          entornos.push(aux[pos - 1]);
          aux = [];
        }
      
        entornos.forEach((element: Simbolo) => {
          if (element.id === id && element.getTipo() === TipoDato.ETIQUETA) {
            if (final) {
              aux.push(element);
            } else {
              element.entorno.forEach((hijo: Simbolo) => {
                aux.push(hijo);
              });
            }
          }
        });
        entornos = aux;
        return entornos;
      }
}