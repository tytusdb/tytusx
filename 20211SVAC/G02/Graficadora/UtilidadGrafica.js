"use strict";
function generarArchivoReporte(nombre, extension, contenido) {
    extension = "html";
    contenido = contenido.replace(/\n/g, "\r\n");
    var textFileAsBlob = new Blob([contenido], { type: 'text/plain' });
    nombre = nombre + "." + extension;
    var downloadLink = document.createElement("a");
    downloadLink.download = nombre;
    downloadLink.innerHTML = "LINKTITLE";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
