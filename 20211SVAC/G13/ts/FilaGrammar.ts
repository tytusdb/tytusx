//Clase para guardar las filas del reporte gramatical
export class FilaGrammar{
    
    produccion: string;     //cuerpo de la produccion
    accion: string;         //accion de la produccion

    /**
     * 
     * @param arreglo arreglo de cadenas(string) con contenido de gramatica [0->produccion,1->accion]
     */
    constructor(arreglo: [string,string]){
        this.produccion = (arreglo[0]!= null)?arreglo[0]:'';
        this.accion = (arreglo[1]!=null)?arreglo[1]:'';
    }

}