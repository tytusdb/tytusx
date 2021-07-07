import React, { useState } from 'react';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
// gramaticas
import analizador from './scripts2';
import XPATHScann from './scriptPath';
//reportes
import reporteTSXML from './reporteXML';  //tabla de simbolos
import reporteGramaticalXML from './reporteGramaticalXML';  //reporte gramatical
//**************************************************************

// aqui mismo van a estar las funciones del script

function App() {
	// control de pestañas
	const [ pestaña_actual, setPestaña_actual ] = useState(0);
	// control de data en los codemirror
	const [ code_xml, setCode_xml ] = useState('');
	const [ code_xpath, setCode_xpath ] = useState('');
	const [ code_xquery, setCode_xquery ] = useState('');
	const [ code_consola, setCode_consola ] = useState('');
	// hoocks para ver si esta active la pestaña
	const [ xml, setXml ] = useState('');
	const [ xpath, setXpath ] = useState('');
	const [ xquery, setXquery ] = useState('');
	const [ consola, setConsola ] = useState('');

	const pestañas = (pestaña: number) => {
		switch (pestaña) {
			case 1:
				setXml('active');
				setXpath('');
				setXquery('');
				setConsola('');
				setPestaña_actual(1);
				break;
			case 2:
				setXml('');
				setXpath('active');
				setXquery('');
				setConsola('');
				setPestaña_actual(2);
				break;
			case 3:
				setXml('');
				setXpath('');
				setXquery('active');
				setConsola('');
				setPestaña_actual(3);
				break;
			case 4:
				setXml('');
				setXpath('');
				setXquery('');
				setConsola('active');
				setPestaña_actual(4);
				break;
			default:
				break;
		}
	};
	// condición ? expr1 : expr2
	const analizar = (tipo: string) => {
		switch (pestaña_actual) {
			case 1:
				console.log(analizador(code_xml, tipo));
				alert('analizado archivo XML');
				break;
			case 2:
				//analizador(code_xml, tipo);
				console.log(XPATHScann(code_xpath, tipo, code_xml));
				setCode_consola(XPATHScann(code_xpath, tipo, code_xml).Salida);
				alert('analizado archivo XPATH');
				break;
			case 3:
				setCode_xquery('const setCode_xquery;');
				break;
			case 4:
				setCode_consola('const setCode_consola;');
				break;
			default:
				alert('primero escoga una pestaña');
				break;
		}
	};

	/******************** PARA LA TABLA DE SIMBOLOS XML ********************************** */
	const reporte_ts_xml_ascendente = (tipo: string) => {
		alert('Reporte generado correctamente');
		reporteTSXML(tipo);
	};
	/******************** TABLA GRAMATICAL XML ********************************** */
	const reporte_gramatical = (tipo: string) => {
		alert('Reporte generado correctamente');
		reporteGramaticalXML(tipo);
	};

	return (
		<div>
			{/* nav bar */}
			<div className="navbar">
				<div className="dropdown">
					<button className="dropbtn">
						Menu
						<i className="fa fa-caret-down" />
					</button>

					<div className="dropdown-content">
						<a onClick={() => alert('hola')}>Guardar</a>
					</div>
				</div>

				<div className="dropdown">
					<button className="dropbtn" onClick={() => analizar('a')}>
						Analizar Ascendente
						<i className="fa fa-caret-down" />
					</button>
				</div>
				<div className="dropdown">
					<button className="dropbtn" onClick={() => analizar('d')}>
						Analizar Descendente
						<i className="fa fa-caret-down" />
					</button>
				</div>

				{/* TS XML */}
				<div className="dropdown">
					<button className="dropbtn">
						TS XML
						<i className="fa fa-caret-down" />
					</button>

					<div className="dropdown-content">
						<a onClick={() => reporte_ts_xml_ascendente('a')}>Ascedente</a>
						<a onClick={() => reporte_ts_xml_ascendente('b')}>Descendente</a>
					</div>
				</div>

				{/* Reporte Gramatical */}
				<div className="dropdown">
					<button className="dropbtn">
						Reporte Gramatical
						<i className="fa fa-caret-down" />
					</button>

					<div className="dropdown-content">
						<a onClick={() => reporte_gramatical('a')}>Ascedente</a>
						<a onClick={() => reporte_gramatical('b')}>Descendente</a>
					</div>
				</div>

				<div className="dropdown">
					<a className="dropbtn" href="https://youtu.be/3040lq47N_Q" target="_blank">
						Ganemos Aux!
						<i className="fa fa-caret-down" />
					</a>
				</div>
			</div>
			{/* texto del grupo */}
			<div className="todo">
				<h1 className="iden">Grupo 28</h1>
				<h1 className="iden">---------------</h1>
				<h1 className="iden">Daniel Barillas || Adriana Gómez || Raul Quiñonez</h1>
			</div>
			{/* cajas */}
			<div id="box">
				<div>
					<div className="tab">
						<button className={`tablinks ${xml}`} id="tab_xml" onClick={() => pestañas(1)}>
							XML
						</button>
					</div>
					<CodeMirror
						value={code_xml}
						options={{
							theme: 'monokai',
							keyMap: 'sublime',
							lineNumbers: true,
							lineWrapping: true,
							matchBrackets: true,
							fullScreen: false,
							mode: 'javascript',
							tabSize: 4
						}}
						onChange={(value, options) => {
							setCode_xml(value.getDoc().getValue());
						}}
					/>
				</div>
				<div>
					<div className="tab">
						<button className={`tablinks ${xpath}`} onClick={() => pestañas(2)}>
							XPATH
						</button>
					</div>
					<CodeMirror
						value={code_xpath}
						options={{
							theme: 'monokai',
							keyMap: 'sublime',
							lineNumbers: true,
							lineWrapping: true,
							matchBrackets: true,
							fullScreen: false,
							mode: 'javascript',
							tabSize: 4
						}}
						onChange={(value, options) => {
							setCode_xpath(value.getDoc().getValue());
						}}
					/>
				</div>
			</div>
			<br />
			<br />
			<br />
			<div id="box">
				<div>
					<div className="tab">
						<button className={`tablinks ${xquery}`} onClick={() => pestañas(3)}>
							XQUERY
						</button>
					</div>
					<CodeMirror
						value={code_xquery}
						options={{
							theme: 'monokai',
							keyMap: 'sublime',
							lineNumbers: true,
							lineWrapping: true,
							matchBrackets: true,
							fullScreen: false,
							mode: 'javascript',
							tabSize: 4
						}}
						onChange={(value, options) => {
							setCode_xquery(value.getDoc().getValue());
						}}
					/>
				</div>
				<div>
					<div className="tab">
						<button className={`tablinks ${consola}`} onClick={() => pestañas(4)}>
							CONSOLA
						</button>
					</div>
					<CodeMirror
						value={code_consola}
						options={{
							theme: 'monokai',
							keyMap: 'sublime',
							lineNumbers: true,
							lineWrapping: true,
							matchBrackets: true,
							fullScreen: false,
							mode: 'javascript',
							tabSize: 4
						}}
						onChange={(value, options) => {
							setCode_consola(value.getDoc().getValue());
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
