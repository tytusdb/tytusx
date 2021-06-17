function crear_tabla() {

    let body = document.getElementsByTagName("body")[0];
    let tabla = document.createElement("table");
    let tblBody = document.createElement("tbody");

    //CREAR ENCABEZADO
    let encabezado = document.createElement("tr");
    encabezado.style.color = "white";
    encabezado.style.background = 'black';
    let numero = document.createElement("td");
    let tipo = document.createElement("td");
    let descripcion = document.createElement("td");
    let fila = document.createElement("td");
    let columna = document.createElement("td");
    let t_numero = document.createTextNode("Linea #");
    let t_tipo = document.createTextNode("Tipo");
    let t_descripcion = document.createTextNode("Descripcion");
    let t_fila = document.createTextNode("Fila");
    let t_columna = document.createTextNode("Columna");
    numero.appendChild(t_numero);
    tipo.appendChild(t_tipo);
    descripcion.appendChild(t_descripcion);
    fila.appendChild(t_fila);
    columna.appendChild(t_columna);
    encabezado.appendChild(numero)
    encabezado.appendChild(tipo)
    encabezado.appendChild(descripcion)
    encabezado.appendChild(fila)
    encabezado.appendChild(columna)    
    tblBody.appendChild(encabezado);
    
    
    //CREAR CUERPO
    for (let j = 1; j < 10; j++) {
        let Fila = document.createElement("tr");
        
        for (let columna = 0; columna < 5; columna++) {            
            let celda = document.createElement("td");
            let textoCelda = document.createTextNode("celda");
            celda.appendChild(textoCelda);
            Fila.appendChild(celda);
        }        
        tblBody.appendChild(Fila);
    }


    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    //tabla.setAttribute("border", "2");
}