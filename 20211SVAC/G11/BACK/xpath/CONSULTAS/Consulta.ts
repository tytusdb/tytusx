

export class Consulta{
    public static l_consultas:Array<NodoConsulta>=new Array<NodoConsulta>();

    constructor(){
        Consulta.l_consultas=new Array<NodoConsulta>();
    }

    public static agregar(ba:string,id:string,val:any){
        let nuevo:NodoConsulta = new NodoConsulta(ba,id,val);
        Consulta.l_consultas.push(nuevo);
    }

    public static recorrer(){
        for(let i=0; i<Consulta.l_consultas.length; i++){
            console.log(Consulta.l_consultas[i].getid()+' '+Consulta.l_consultas[i].getval()+'->'+Consulta.l_consultas[i].getaccion());
        }
    }
}