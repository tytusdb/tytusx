class Etiqueta{
    constructor(nombre,texto,contenido){
        this.nombre=nombre;
        this.texto=texto;
        this.contenido=contenido;
        this.cuerpo="";
    }
    obtenerXML(){
        this.cuerpo+="<"+this.nombre+">\n";

        if(this.texto!=""&&this.texto!=undefined){
            this.cuerpo+=this.texto+"\n";
        }
        if(this.contenido!=""&&this.contenido!=undefined){
            this.cuerpo+=this.contenido+"\n";
        }
  
        this.cuerpo+="</"+this.nombre+">\n";

        return this.cuerpo;
    }
    
}