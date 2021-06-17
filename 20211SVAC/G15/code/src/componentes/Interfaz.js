import React from 'react';
import AnalizadorXmlAsc from '../analizador/XML/dist';
import { Graphviz } from 'graphviz-react';
//import  AnalizarXPathAsc  from '../analizador/XPath/dist/ascendente/index';
import AnalizarXPathDesc from '../analizador/XPath/dist/descendente/index';
import  AnalizarXPathAsc, { recorrerXpathAsc }  from '../analizador/XPath/dist/ascendente/index';
//import TexteadorXml from './js/accionprueba';

//variable
	

	var RespuestaXML;
	var RespuestaXPath
	
//--------------XML
	//--------------Errores
		var StringHtmlAperturaErroresXML= "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>ErroresXML</title></head><body>";
		var StringHtmlCierreErroresXML="</body></html>";
		var StringHTMLErroresXML="";
	//-------------Gramatica 
		var StringHtmlAperturaGramaticaXML="<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>GramaticaXML</title></head><body>";
		var StringHtmlCierreGramaticaXML="</body></html>";
		var StringHTMLGramaticaXML="";
	//--------------Tabla de Simbolos
		var StringHtmlAperturaSimbolosXML="<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Tabla de Simbolos XML</title></head><body>";
		var StringHtmlCierraSimbolosXML="</body></html>";
		var StringHTMLSimbolosXML="";

//Metodo Guardar
 

//-------Metodo XML-----------------------------------


  

 

class Interfaz extends React.Component {


	generarTextoGuardar=(CodigoHTML)=>{
  
		var texto1 = CodigoHTML;
		  var texto = [];
		  texto.push(texto1);
		  return new Blob(texto, {
			type: 'text/plain'
		  });
	  }

	descargarArchivo=(contenidoEnBlob, nombreArchivo)=> {
		//creamos un FileReader para leer el Blob
		var reader = new FileReader();
		//Definimos la función que manejará el archivo
		//una vez haya terminado de leerlo
		reader.onload = function (event) {
		  //Usaremos un link para iniciar la descarga
		  var save = document.createElement('a');
		  save.href = event.target.result;
		  save.target = '_blank';
		  //Truco: así le damos el nombre al archivo
		  save.download = nombreArchivo || 'archivo.dat';
		  var clicEvent = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		  });
		  //Simulamos un clic del usuario
		  //no es necesario agregar el link al DOM.
		  save.dispatchEvent(clicEvent);
		  //Y liberamos recursos...
		  (window.URL || window.webkitURL).revokeObjectURL(save.href);
		};
		//Leemos el blob y esperamos a que dispare el evento "load"
		reader.readAsDataURL(contenidoEnBlob);
	  };
	



	//--------------------XPATH
	MetodoXPath = (event) => {
		const name = event.target.value;
		if(name=="Menu_AscXPath"){
			var texto= document.getElementById("EntradaXPath").value;
			//var texto = editorXPath.getValue();
			if(texto==""){
			  alert("Debe Abrir un Archivo XPath");
			}else{
				//alert("Analisis Ascendente XPath");
				RespuestaXPath=AnalizarXPathAsc.AnalizarAsc(texto);
				//var rec=AnalizarXPathAsc.recorrerXpathAsc(RespuestaXPathAsc.nodo,RespuestaXML.entornoGlobal,RespuestaXML.ecoding);
				//console.log(AnalizarXPathAsc.EntornoAc);
				//var salida =AnalizarXPathAsc.printTable(AnalizarXPathAsc.EntornoAc);
				 
				
				//document.getElementById("ConsolaSalida").value =AnalizarXPathAsc.RUN(RespuestaXPathAsc.nodo,RespuestaXML.entornoGlobal,RespuestaXML.ecoding);
	
	
				var sal = AnalizarXPathAsc.RUN(RespuestaXPath.nodo,RespuestaXML.entornoGlobal,RespuestaXML.ecoding);
				  
				if(sal == ""){
					sal="NO SE ENCONTRO EL NODO REQUERIDO"
				}
	
				if(RespuestaXML.ecoding == "ASCII"){
					console.log("FORMATO ASCII");
				}else if (RespuestaXML.ecoding == "UTF-8"){
					console.log("FORMATO UTF-8")
				}else{
					console.log("FORMATO ISO-8859-1")
				}	
	
	
				document.getElementById("ConsolaSalida").value = sal;
				
				 //editorConsola.getDoc().setValue(objetos.codigo);
			}
		   
		}else if(name=="Menu_DesXPath"){
			var texto= document.getElementById("EntradaXPath").value;

			try {

				if(texto==""){
					alert("Debe Abrir un Archivo XPath");
				  }else{
					  
					  alert("XPath: Analisis Descendente");
					  RespuestaXPath= AnalizarXPathDesc.AnalizarDes(texto);
					  document.getElementById("ConsolaSalida").value =RespuestaXPath.msj;
					  alert("Analisis Terminado");
					  //Aqui va codigo
				  }
				
			} catch (error) {
				alert("XPath: ERROR Analisis Descendente")
				console.log(error);
			}
			//var texto = editorXPath.getValue();
			
		}else if(name=="Menu_AbrirXPath"){
			alert("Analisis Abrir XPath");
			var input = document.createElement('input');
			input.type = 'file';
			input.onchange = e => { 
			  // getting a hold of the file reference
			  var file = e.target.files[0]; 
			  // setting up the reader
			  var reader = new FileReader();
			  reader.readAsText(file,'UTF-8');
			  // here we tell the reader what to do when it's done reading...
			  reader.onload = readerEvent => {
				 var content = readerEvent.target.result; // this is the content!
				 //editorXPath.getDoc().setValue(content);
				  document.getElementById("EntradaXPath").value = content; //Consola secundaria 
			  }
		   }
		   input.click();
		  // var slcchange = document.getElementById("Menu");
		  //  slcchange.addEventListener("null", function() {
		  //  });
		}else if(name=="Menu_GuardarXPath"){
			alert("Analisis Guardar XPath");
			
		}else if(name=="Menu_ReporteErroresXPath"){
			alert("Reporte Error");
		}else if(name=="Menu_ReporteASTXPath"){
			alert("Reporte AST");
			
			var ReporteXPathAst=  "digraph G{ \n"+RespuestaXPath.DotAst + "}";
			alert(ReporteXPathAst);
			this.setState({dot:ReporteXPathAst})
			
	
		}
	
		document.getElementById("Menu_XPath").selectedIndex = 0;
		//setidiomatxt(name);
	  };



	//----------XML
	MetodoXML = (event) => {
		const name = event.target.value;
	
		//-------------MenuAscendente
		if(name=="Menu_AscXML"){
			try {
				var texto= document.getElementById("EntradaXML").value;
				//var texto =  editorXML.getValue();
				if(texto==""){
					alert("Debe Abrir un Archivo XML");
				}else{
					alert("Analisis Ascendente XML");
					RespuestaXML=AnalizadorXmlAsc.AnalizarXMLASC(texto);
					alert("Analisis Terminado")
					document.getElementById("ConsolaSalida").value =RespuestaXML.msj;//objetos.codigo
				  
					  //alert("Analisis Desc Terminado")
					  //document.getElementById("ConsolaSalida").value =objetos.codigo;
					  //editorXPath.setValue(objetos.codigo);
				}
			} catch (error) {
				console.log(error);
			}
	
		//-------------Descendente
		}else if(name=="Menu_DesXML"){
			try {
				var texto= document.getElementById("EntradaXML").value;
				//var texto =  editorXML.getValue();
				if(texto==""){
					alert("Debe Abrir un Archivo XML");
				}else{
					alert("Analisis Descendente XML");
					RespuestaXML= AnalizadorXmlAsc.AnalizarXMLDESC(texto);
					alert("Analisis Terminado")
					document.getElementById("ConsolaSalida").value =RespuestaXML.msj;//objetos.codigo
				
					//alert("Analisis Desc Terminado")
					//document.getElementById("ConsolaSalida").value =objetos.codigo;
					//editorXPath.setValue(objetos.codigo);
				}
			} catch (error) {
				console.log(error);
			}
			
	
		}else if(name=="Menu_GuardarXML"){
			alert("Guardar XML");
		}else if(name=="Menu_AbrirXML"){
			alert("Abrir XML")
			var input = document.createElement('input');
			input.type = 'file';
			input.onchange = e => { 
			  // getting a hold of the file reference
			  var file = e.target.files[0]; 
			  // setting up the reader
			  var reader = new FileReader();
			  reader.readAsText(file,'UTF-8');
			  // here we tell the reader what to do when it's done reading...
			  reader.onload = readerEvent => {
				 var content = readerEvent.target.result; // this is the content!
				 //editorXPath.getDoc().setValue(content);
				  document.getElementById("EntradaXML").value = content; //Consola secundaria 
			  }
		   }
		   input.click();
	
		}else if(name=="Menu_ReporteErroresXML"){
			var ReporteXMLErrores=AnalizadorXmlAsc.PintarReporteErrores(RespuestaXML.Errores);
			var HtmlErroresApertura="<center><h1>Tabla de Errores</h1><table border=1><tr><td>Tipo</td><td>Descripcion</td><td>fila</td><td>columna</td></tr>"
			var HtmlErroresCierra="</table></center>"
			StringHTMLErroresXML= StringHtmlAperturaErroresXML + HtmlErroresApertura + ReporteXMLErrores +HtmlErroresCierra + StringHtmlCierreErroresXML;
			
			this.descargarArchivo(this.generarTextoGuardar(StringHTMLErroresXML), 'TablaErroesXML.html');
			
			alert("Reporte de Errores");
		}else if(name=="Menu_ReporteGramaticaXML"){
			var ReporteXMLGramatica= AnalizadorXmlAsc.PintarReporteGramatical(RespuestaXML.ReporteGr)
			var HtmlGramaticaApertura="<center><h1>Tabla de Gramatica</h1><table border=1><tr><td>No.</td><td>Produccion</td><td>Regla Gramatical</td></tr>";
			var HtmlGramaticaCierre="</table></center>"
			StringHTMLGramaticaXML= StringHtmlAperturaGramaticaXML+HtmlGramaticaApertura + ReporteXMLGramatica + HtmlGramaticaCierre + StringHtmlCierreGramaticaXML;
			this.descargarArchivo(this.generarTextoGuardar(StringHTMLGramaticaXML), 'ReporteGramaticaXML.html');
			alert("Reporte de Errores");
			
	
		}else if(name=="Menu_ReporteCSTXML"){
			var ReporteXMLCst= AnalizadorXmlAsc.PintarCST(RespuestaXML.objetos)
			alert(ReporteXMLCst);
			this.setState({dot:ReporteXMLCst})
			alert("Grafica CST");
		}else if(name=="Menu_ReporteTablaDeSimbolos"){
			var ReporteXMLSimobolos =AnalizadorXmlAsc.PintarTablasSimbolos(RespuestaXML.entornoGlobal);
			var HtmlSimboloApertura="<center><h1>Tabla de Simbolos</h1><table border=1><tr><td>Identificador</td><td>Valor</td><td>Tipo</td><td>Ambito</td><td>Fila</td><td>columna</td></tr>";
			var HtmlSimboloCierre="</table></center>";
			StringHTMLSimbolosXML= StringHtmlAperturaSimbolosXML+HtmlSimboloApertura+ReporteXMLSimobolos + HtmlSimboloCierre + StringHtmlCierraSimbolosXML;
			this.descargarArchivo(this.generarTextoGuardar(StringHTMLSimbolosXML), 'TabladeSimbolos.html');
			alert("Reporte de Taabla de Simbolos");
		}
	
		document.getElementById("Menu_XML").selectedIndex = 0;
		
	  };


	constructor(){
		super();
	}
	state={
		dot:" graph{ }",
	}
    render() {

        return (
            <>
			
			<main role="main" className="flex-shrink-0 mt-5">
 
		        <div className="container">
		  	  		<div className="PanelMenu">
						<table className="tablaMenu">
							<tr>
								<td>
									<select native name ="Menu_XML" class="Menu_XML" id="Menu_XML" onChange={this.MetodoXML} >
                            			<option value =" null " disabled selected  selected="selected">Opciones XML</option>".
                                		<option value = "Menu_AbrirXML" >Abrir Xml</option>
                                		<option value = "Menu_GuardarXML"id="save">Guardar Xml</option>     
                                		<option value = "Menu_AscXML">Analizar Ascendente </option>
                            			<option value = "Menu_DesXML" >Analizar Descendente</option>
										<option value = "Menu_ReporteErroresXML" >Reporte Errores</option>
										<option value = "Menu_ReporteGramaticaXML" >Reporte Gramatica</option>     
										<option value = "Menu_ReporteCSTXML" >Grafica CST</option> 
										<option value = "Menu_ReporteTablaDeSimbolos" >Reporte Tabla de Simbolos</option> 
                        			</select>
								</td>
								<td>
									<select name ="Menu_XPath" class="Menu_XPath" id="Menu_XPath" onChange={this.MetodoXPath} >
                            			<option value =" null " disabled selected  selected="selected">Opciones Xpath</option>".
                            			<option value = "Menu_AbrirXPath" >Abrir XPath</option> 
                            			<option value = "Menu_GuardarXPath" id="save">Guardar XPath</option>
                            			<option value = "Menu_AscXPath"> Analizar Ascendente</option>
                           				<option value = "Menu_DesXPath" >Analizar Descendente</option> 
										<option value = "Menu_ReporteErroresXPath" >Reporte Errores</option>
										<option value = "Menu_ReporteASTXPath" >Grafica AST</option>
                       				 </select>	
								</td>
							</tr>
						</table>

					</div>
		  	     	<div className="TablasConsola"> 
					   <table className="tablageneral" id="tablageneral" name="tablageneral">
						   <tr>
								<td>
									<table className="tablaEntrada">
								   		<tr>
                        					<td>
                           						<h3>Consola Entrada XML</h3>
                            					<textarea Multiline="true"  name="EntradaXML"  id="EntradaXML" placeholder="Consola Entrada XML" class="entrada"></textarea>
                        					</td>
                        					<td>
                            					<h3>Consola Entrada XPath</h3>
                            					<textarea Multiline="true"  name="EntradaXPath" id= "EntradaXPath" placeholder="Consola Entrada XPath"  class="entrada"></textarea>
     
                        					</td>
                    					</tr>
								   </table>
							   </td>
						   </tr>
						   <tr>
								<td>
								<h4>Consola de Salida</h4>
								<center>
								<textarea id ="ConsolaSalida" name="ConsolaSalida"  readonly="readonly" Multiline="true" placeholder="Consola Salida" class="consola"></textarea>
								</center>
							   </td>		   
						   </tr>

						   <tr>
							   <td>
							  
							   </td>
						   </tr>
						   <div className="GraphizDiv">
								   <center>
								   		<Graphviz dot={this.state.dot} options={{zoom:true,width:1200,height:300}} />
								   </center>
							   
							</div>


					   </table>
					</div>


					<div className="Foother">
						
							<div className="Hijo">Diseñado por G15- Universidad San Carlos de Guatemala - Curso Organizacion de Lenguajes y Compiladores 2 </div>
						
					</div>
		        </div>
				
	  		</main>
 
	  	
	  		</>
   
        )
      
    }
   
  }
   
  export default Interfaz;