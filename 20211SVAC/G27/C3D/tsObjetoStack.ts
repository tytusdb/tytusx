class tsObjetoStack{
    tipo: any;
    apuntadorNombre: any;
    apuntadorAtributos: any;
    apuntadorHijos: any;
    apuntadorContenido: any;

    constructor(tipo: any, apuntadorName: any, apuntadorAtributos: any, apuntadorHijos: any, apuntadorContenido: any){
        this.tipo = tipo;
        this.apuntadorNombre = apuntadorName;
        this.apuntadorAtributos = apuntadorAtributos;
        this.apuntadorHijos = apuntadorHijos;
        this.apuntadorContenido = apuntadorContenido;
    }

    public getTipo(){
        return this.tipo;
    }

    public setTipo(tipo:any){
        this.tipo = tipo;
    }

    public getApuntadorNombre(){
        return this.apuntadorNombre;
    }
    public setApuntadorNombre(apuntadorNombre:any){
        this.apuntadorNombre = apuntadorNombre;
    }

    public getApuntadorAtributos(){
        return this.apuntadorAtributos;
    }
    public setApuntadorAtributos(apuntadorAtributos:any){
        this.apuntadorAtributos = apuntadorAtributos;
    }

    public getApuntadorHijos(){
        return this.apuntadorHijos;
    }
    public setApuntadorHijos(apuntadorHijos:any){
        this.apuntadorHijos = apuntadorHijos;
    }

    public getApuntadorContenido(){
        return this.apuntadorContenido;
    }
    public setApuntadorContenido(apuntadorContenido:any){
        this.apuntadorContenido = apuntadorContenido;
    }
}