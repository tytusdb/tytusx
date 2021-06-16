class Consulta {
  constructor(entorno) {
    this.entorno = entorno;
  }
  
  ejecutar( AST) {
    indiceAux=0;
    let retorno =new Acceso();
    let consulta=retorno.getValorImplicito(this.entorno, AST);
    console.log("Devolviendo respuesta");
    
    console.log(this.entorno);
    if(consulta){
      
      imprimiConsola(consulta);
    }else{
        imprimiConsola("No hay resultados");
    }
  }
}
