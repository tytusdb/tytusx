export module Graficas {

    function formatId(numId:number):string {
        return "nodo" + numId.toString()
    }

    export function defNodo(nodoId:number, etiqueta:string):string {
        return  formatId(nodoId) + "[label=\"" + etiqueta + "\"] \n"
    }
    export function defEdge(id1:number, id2:number):string {
        return formatId(id1) + " -> " + formatId(id2) + "\n"
    }

    export function getElement(id:number, etiqueta:string, idPadre:number):string {
        let dotText = ""
        dotText += defNodo(id, etiqueta)
        dotText += defEdge(idPadre, id)
        return dotText
    }
}