import logo from '../logo.svg';


function Navigation(){

    /*function getText ()  {
        console.log("getText Button clicked");
        let text = document.getElementById("InputTextarea").value;
        console.log("El texto es: \n"+text);
    }*/
    var XML = {
        tipo : '',
        texto : '',
        atributos : [],
        hijos : []
    }

    function setText(){
        console.log("setText Button clicked");
        let text = document.getElementById("InputTextarea").value;

        var parser = require('../code/analizadorXPath/Xpath');
        var funcion = parser.parse(text);
        var respuesta=funcion.Ejecutar(XML);
        document.getElementById("OutputTextarea").innerHTML = respuesta; 
    }

    function inicio(){
        document.getElementById('files').addEventListener('change', cargar, false);
    }
    
    function cargar(ev) {
        var arch=new FileReader();
        arch.addEventListener('load',leer,false);
        arch.readAsText(ev.target.files[0]);
    }
    
    function leer(ev) {
        document.getElementById('XMLTextarea').value=ev.target.result;
        var analizadorXML = require('../code/analizadorXML/analizadorXML')
        var resultado = analizadorXML.Ejecutar(ev.target.result)
        XML = resultado
    }
  


    return(
        //tag principal
        <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
                Organización de Lenguajes y Compiladores 2
            <p></p>
            <p></p>
            <p></p>

            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="custom-file">
                            <input className="custom-file-input" type="file" id="files" onClick={inicio}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary btn-lg" onClick={setText}>Compilar</button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-primary btn-lg">Reportes</button>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 block">
                        <textarea className="Text" placeholder="Bienvenido" id="InputTextarea" ></textarea>
                    </div>
                    <div className="col-6 block">
                        <textarea className="Text" placeholder="Bienvenido" id="OutputTextarea" ></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <label className="labelClass">Archivo XML</label>
                    <div className="text-center">
                        <textarea className="Text" placeholder="Bienvenido" id="XMLTextarea" ></textarea>
                    </div>
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>

            <footer className="bg-dark text-center text-lg-start">
            <div className="text-center p-3 text-light ">
                <font size="3">
                <p>
                Grupo 17 <br/>
                Jorge Ambrocio - Marcelo Marroquín - Viany Juárez<br/>
                Organización de Lenguajes y Compiladores 2<br/>
                Escuela de Vacaciones Junio 2021<br/>                
                </p>
                </font>   
            </div>
            </footer>

            
            
            
        </header>
        
    );
}



export default Navigation;