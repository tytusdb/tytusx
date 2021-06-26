import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import React, { Component } from 'react';


class Gramatical extends React.Component {

    constructor(props) {
        super(props);
        this.TablaGramatical = this.props.location.TablaGramatical;
        this.TablaGramticalXPath = this.props.location.TablaGramticalXPath;
        console.log("Esto es lo que trae la tabla gramatical");
        console.log(this.TablaGramatical);
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
                    <label> Reporte Gramatical XML </label>
                </div>


                <p></p>
                <p></p>
                <p></p>

                <div className="container">
                    <div className="row">

                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>Producción</th>
                                    <th>Acción Semántica</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.TablaGramatical.map(function (item) {
                                        return (
                                            <tr>
                                                <td>{item.padre + " -> " + item.hijos}</td>
                                                <td>{item.produccion}</td>
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
                    <label> Reporte Gramatical XQuery </label>
                </div>


                <p></p>
                <p></p>
                <p></p>

                <div className="container">
                    <div className="row">

                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>Producción</th>
                                    <th>Acción Semántica</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.TablaGramticalXPath.map(function (item) {
                                        return (
                                            <tr>
                                                <td>{item.padre + " -> " + item.hijos}</td>
                                                <td>{item.produccion}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>



                    </div>
                </div>
            </header>
        );
    }

}

export default Gramatical;