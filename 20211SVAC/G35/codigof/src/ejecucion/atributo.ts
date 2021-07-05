import temporal from "../traduccion/temporal";

export class Atributo{
    public nombre:string;
    public valor:string;

    constructor(nombre,valor){
        this.nombre=nombre;
        this.valor=valor;
    }

    dameNombre(){
        return this.nombre;
    }
    dameValor(){
        return this.valor;
    }

    recorrer(e, nivel:number){
        let espacio=" - ".repeat(nivel);
        let salida= espacio+`ATRIBUTO: ${this.nombre} - Valor: ${this.valor} - Etiqueta: ${e}`+'\n';
        return salida;
    }


    //TRADUCCION

    generaCodigo3D(mitemp:temporal):string{
        //USAREMOS COMO PIVOTE CUANDO PASA DE NOMBRE A VALOR -3
        //Y CUANDO PASE DE VALOR A NOMBRE -2
        let contenido="";
        
        contenido+=mitemp.retornarString() + " = H;\n";
        for (let i=0;i<this.nombre.length;i++){
            contenido+=`heap[(int)H] = ${this.nombre.charCodeAt(i)};\n`;
            contenido+=`H = H+1;\n`;
        }
        contenido+=`heap[(int)H] = -3;\n`;
        contenido+=`H = H+1;\n`;

        for (let i=0;i<this.valor.length;i++){
            contenido+=`heap[(int)H] = ${this.valor.charCodeAt(i)};\n`;
            contenido+=`H = H+1;\n`;
        }
        contenido+=`heap[(int)H] = -2;\n`;
        contenido+=`H = H+1;\n`;

        mitemp.aumentar();
        return contenido;
    }

    //TRADUCCION
}