enum TIPO_RUTA{
    DIAGONALSIMPLE,
    DIAGOBALDOBLE,
    DIAGONALVACIA
}
enum TIPO_DATO{
    IDENTIFICADOR,
    ASTERISCO,
    ARROBA,
    PUNTO,
    DOBLEPUNTO,
    SIGUIENTE,
    TEXTO,
    NODO,
    POSICION,
    RESERVADAS
}

function nodoRuta(dato:any, mostrar:any, ruta2:any, tipoRuta:TIPO_RUTA, fila:number, columna:number) {
	return {
        dato: dato,
        mostrar :mostrar,
        ruta2:ruta2,
		fila : fila,
		columna: columna		
	}
}
//nodo simple
function nodoDato(valor:string, tipo: TIPO_DATO, fila:number, columna:number){
    return{
        valor:valor,
        tipo:tipo,
        fila: fila,
        columna:columna
    }
}
