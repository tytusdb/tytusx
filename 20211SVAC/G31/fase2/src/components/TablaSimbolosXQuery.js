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
    console.log('Tabla',this.data)
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
                <td>{item.id}</td>
                <td>{item.tipo}</td>
                <td>{item.valor.toString()}</td>
                <td>{item.ambito}</td>
                <td>{item.posicion}</td>
                <td>{item.linea}</td>
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
  <TablaSimbolosXQuery />,
  document.getElementById('root')
)