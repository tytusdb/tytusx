import React from 'react'
import ReactDOM from 'react-dom'

export default class TablaSimbolosXQuery extends React.Component {
  constructor(props)
  {
    super(props)
    this.data=new Array()
    if(this.props.data!=undefined)
    {
      this.data = this.props.data
    }
    console.log(this.data)
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
            <th>Posición</th>
            <th>Fila</th> 
            <th>Columna</th> 
          </tr> 
        </thead>
        <tbody>
          { this.data.map(function(item){
            return (
              <tr>
                <td>{item.nombre}</td>
                <td>{item.tipo}</td>
                <td>{item.valor}</td>
                <td>{item.ambito}</td>
                <td>{item.posicion}</td>
                <td>{item.fila}</td>
                <td>{item.columna}</td>
              </tr>
            )
          }) }
        </tbody> 
      </table>
      
      
    )
  }
}

ReactDOM.render(
  <TablaSimbolo />,
  document.getElementById('root')
)