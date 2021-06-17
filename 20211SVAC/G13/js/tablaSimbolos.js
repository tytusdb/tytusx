function hacerTablaSimbolos(objeto) {
    
    const resultArray = [];
    addNestedChildrenToArray(objeto, resultArray);

    return resultArray;
}

function addNestedChildrenToArray(obj, resultArray, padre) {
	resultArray.push({nombre: obj.etiqueta_id, linea: obj.linea, columna: obj.columna, tipo: "objeto", ambito: padre || 'global'});
    if(obj.lista_atributos.length > 0) {
        obj.lista_atributos.forEach(atr => resultArray.push({nombre: atr.atributo, tipo: "atributo", linea: atr.fila, columna: atr.columna, ambito: obj.etiqueta_id}))
    }
    obj.lista_objetos.forEach(child => addNestedChildrenToArray(child, resultArray, obj.etiqueta_id));
}

module.exports.hacerTablaSimbolos = hacerTablaSimbolos;
