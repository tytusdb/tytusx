import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';


class TablaErrores extends React.Component {

    constructor(props) {
        super(props);
        this.Mistakes = this.props.location.Mistakes;
        this.MistakesXPath = this.props.location.MistakesXPath;
        console.log("Aqui estan los errores XML");
        console.log(this.Mistakes);
        console.log("Aqui estan los errores XPath");
        console.log(this.MistakesXPath);
    }



    render() {
        return (
            <header className="App-header">

                <p></p>
                <p></p>
                <h1>OLC2 - Proyecto 2</h1>

                <div className="col-2 block">
                    <div className="row">
                        <Link to={{ pathname: "/" }}>
                            <button type="button" className="btn btn-primary btn-lg">Atrás</button>
                        </Link>
                    </div>
                </div>

                <p></p>
                <p></p>

                <div className="row">
                    <label> Tabla de Errores XML </label>
                </div>


                <p></p>
                <p></p>
                <p></p>

                <div className="container">
                    <div className="row">

                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Tipo</th>
                                    <th>Fila</th>
                                    <th>Columna</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.Mistakes.map(function (item) {
                                        return (
                                            <tr>
                                                <td>{item.Error}</td>
                                                <td>{item.tipo}</td>
                                                <td>{item.Linea}</td>
                                                <td>{item.columna}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>



                    </div>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <div className="row">
                    <label> Tabla de Errores XPath </label>
                </div>


                <p></p>
                <p></p>
                <p></p>

                <div className="container">
                    <div className="row">

                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Tipo</th>
                                    <th>Fila</th>
                                    <th>Columna</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.MistakesXPath.map(function (item) {
                                        return (
                                            <tr>
                                                <td>{item.Error}</td>
                                                <td>{item.tipo}</td>
                                                <td>{item.Linea}</td>
                                                <td>{item.columna}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>



                    </div>
                </div>

                <p></p>
                <p></p>
                <p></p>

                <footer className="bg-dark text-center text-lg-start">
                    <div className="text-center p-3 text-light ">
                        <font size="3">
                            <p>
                                Grupo 30 <br />
                            </p>
                        </font>
                    </div>
                </footer>
            </header>
        );
    }

}

export default TablaErrores;