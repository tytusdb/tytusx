import {Objeto} from '../../Expresiones/Objeto'

export interface Data {
    Nombre: string;
    Tipo: string;
    Fila: number;
    Columna: number;
    Padre: string;
    TipoEtiqueta: number;
    stackPosition:number;
  }

export class xmlFactory{
    tablaSimbolos:Data[] =  [];

    constructor(xml:Objeto[]){
        this.FillTablaSimbolos(xml);
    }
    GetC3D():string{
        var result;

        return result;
    }

    FillTablaSimbolos(data:Objeto[]){
        data.forEach(element => {
          this.tablaSimbolos.push({
            Nombre:element.identificador,
            Fila:element.linea,
            Columna:element.columna,
            Padre :element.padre?.identificador,
            Tipo:'Nodo',
            TipoEtiqueta:element.tipo});
    
            element.listaAtributos.forEach(atr => {
              this.tablaSimbolos.push({
                Nombre:atr.identificador,
                Fila:atr.linea,
                Columna:atr.columna,
                Padre :element.padre?.identificador,
                Tipo:'Atributo',
                TipoEtiqueta:null});
            });
            this.FillTablaSimbolos(element.listaObjetos);
          });
      }
}