import React from 'react'
import ReactDOM from 'react-dom'

export default class SimboloXQ extends React.Component {
  constructor(props)
  {
    super(props)
    this.data=new Array()
    if(this.props.data!=undefined)
    {
      this.data = this.props.data
    }
  }
  render() {
    return (
      <table className="table table-dark"> 
        <thead> 
          <tr> 
            <th>Nombre</th> 
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ambito</th> 
            <th>Fila</th> 
            <th>Columna</th>
            <th>PosicionStack</th> 
          </tr> 
        </thead>
        <tbody>
          { this.data.map(function(item){
            return (
              <tr>
                <td>{item.nombre}</td>
                <td>{item.tipo}</td>
                {/* <td>{item.valor}</td>
                <td>{item.ambito}</td> */}
                <td>{item.fila}</td>
                <td>{item.columna}</td>
                {/* <td>{item.stackPosition}</td> */}
              </tr>
            )
          }) }
        </tbody> 
      </table>
    )
  }
}

ReactDOM.render(
  <SimboloXQ />,
  document.getElementById('root')
)

