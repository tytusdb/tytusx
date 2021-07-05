import gramaticaA from './GramaticaXML/gramaticaA';
import gramaticaD from './GramaticaXML/gramaticaD';

export default function htmlREPORT(tipo:string) {
	let tokensArray: any[];
	let tipoAnalizado="";
	let tipoTabla="";
	if(tipo == 'a'){
		tokensArray = [];
		tokensArray = gramaticaA.tokenArray;
		tipoAnalizado = "Ascendente";
		tipoTabla = "TS-XML-ASCENDENTE.html";

	}else{
		tokensArray = [];
		tokensArray = gramaticaD.tokenArrayD;
		tipoAnalizado = "Descendente";
		tipoTabla = "TS-XML-DESCENDENTE.html";
	}

	let htmlText =
		'<html>\n' +
		'<title>Reporte TS XML</title>\n' +
		'<center>\n' +
		'<h1>\n' +
		'<font face="comic sans ms"><br> Tabla de Simbolos </font>\n' +
		'<br> XML '+tipoAnalizado+'\n' +
		'</h1>\n' +
		'<br><br>\n' +
		'<table border="1">\n' +
		'<tr  bgcolor=#51c4d3>\n' +
		'<td><font face="comic sans ms">ID</font></td>\n' +
		'<td><font face="comic sans ms">TIPO</font></td>\n' +
		'<td><font face="comic sans ms">AMBITO</font></td>\n' +
		'<td><font face="comic sans ms">VALOR</font></td>\n' +
		'<td><font face="comic sans ms">FILA</font></td>\n' +
		'<td><font face="comic sans ms">COLUMNA</font></td>\n' +
		'</tr>\n';

	tokensArray.forEach((sym) => {
		htmlText += sym + '\n';
	});
	htmlText += '</table>\n' + '</center>\n' + '</html>';

	saveFile(htmlText, tipoTabla);

	//return tokensArray;
}

function saveFile(text: string, name: string) {
	// get the textbox data...
	let textToWrite = text;
	// put the data in a Blob object...
	var textFileAsBlob = new Blob([ textToWrite ], { type: 'text/plain' });
	// create a hyperlink <a> element tag that will be automatically clicked below...
	var downloadLink = document.createElement('a');
	// set the file name...
	downloadLink.download = name;
	// set the <a> tag href as a URL to point to the Blob
	downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	// automatically click the <a> element to go to the URL to save the textFileAsBlob...
	downloadLink.click();
}
