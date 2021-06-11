enum TIPO_RUTA{
    DIAGONALSIMPLE,
    DIAGOBALDOBLE,
    DIAGONALVACIA
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
