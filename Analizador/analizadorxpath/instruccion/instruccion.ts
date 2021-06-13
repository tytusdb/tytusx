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
function nodoDator(valor:any, tipo: TIPO_DATO, fila:number, columna:number){
    return{
        valor:valor,
        tipo:tipo,
        fila: fila,
        columna:columna
    }
}

//nodo para dato reservadas
function nodoDatorersva(reservadas:any, dato:any, tipo: TIPO_DATO, fila:number, columna:number){
    return{
        reservadas:reservadas,
        dato:dato,
        tipo:tipo,
        fila: fila,
        columna:columna
    }
}

function nodoMostrar(exp:any, mostrar:any, fila:number, columna:number){
    return {
        exp:exp,
        mostrar:mostrar
    }
}