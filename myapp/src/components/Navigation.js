import logo from '../logo.svg';

function Navigation(){

    /*function getText ()  {
        console.log("getText Button clicked");
        let text = document.getElementById("InputTextarea").value;
        console.log("El texto es: \n"+text);
    }*/

    function setText(){
        console.log("setText Button clicked");
        let text = document.getElementById("InputTextarea").value;

        var parser = require('../code/grammar');
        var respuesta = parser.parse(text);

        document.getElementById("OutputTextarea").innerHTML = respuesta;
    }

    return(
        //tag principal
        <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
                Organización de Lenguajes y Compiladores 2
            <p></p>
            <p></p>
            <p></p>

            <div className="row">
                <div className="MiniColumn">
                <button type="submit" className="btn btn-primary" onClick={setText}>Compilar</button>
                </div>
                <div className="MiniColumn">
                    <button type="button" className="btn btn-primary">Reportes</button>
                    <input type="text" id="nombreArchivo"></input>
                </div>
                <div className="MiniColumn">
                <button type="button" className="btn btn-primary">Limpiar</button>
                </div>
                
            </div>

            <div className="row">
                <div className="column">
                    <textarea className="Text" placeholder="Bienvenido" id="InputTextarea" ></textarea>
                </div>
                <div className="column">
                    <textarea className="Text" placeholder="Bienvenido" id="OutputTextarea" ></textarea>
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>

            <footer className="bg-dark text-center text-lg-start">
            <div className="text-center p-3 text-light ">
                <font size="3">
                <p>
                Viany Paola Juárez Hernández <br/>
                201700659<br/>
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