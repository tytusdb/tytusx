import gramaticaA from './GramaticaXML/gramaticaA';
import gramaticaD from './GramaticaXML/gramaticaD';
let reglasArray: any[];

export default function htmlREPORT2(tipo:string) {
	let tipoAnalizado="";
	let tipoGramatical="";
	if(tipo == 'a'){
		reglasArray = [];
		reglasArray = gramaticaA.gramaticalArray;
		tipoAnalizado = "Ascendente";
		tipoGramatical = "GRAMATICAL-ASCENDENTE.html";

	}else{
		reglasArray = [];
		reglasArray = gramaticaD.gramaticalArrayD;
		tipoAnalizado = "Descendente";
		tipoGramatical = "GRAMATICAL-DESCENDENTE.html";
	}

	let htmlText =
		'<html>\n' +
		'<title>Reporte Gramatical</title>\n' +
		'<center>\n' +
		'<h1>\n' +
		'<font face="comic sans ms"><br> Reporte Gramatical </font>\n' +
		'<br> XML '+tipoAnalizado+'\n' +
		'</h1>\n' +
		'<br><br>\n' +
		'<table border="1">\n' +
		'<tr  bgcolor=#51c4d3>\n' +
		'<td><font face="comic sans ms">PRODUCCION GRAMATICAL</font></td>\n' +
		'<td><font face="comic sans ms">REGLA SEMANTICA</font></td>\n' +
		'</tr>\n';
    
		reglasArray.forEach((sym) => {
			htmlText += sym + '\n';
		});
    
	htmlText += '</table>\n' + '</center>\n' + '</html>';

	saveFile(htmlText, tipoGramatical);

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