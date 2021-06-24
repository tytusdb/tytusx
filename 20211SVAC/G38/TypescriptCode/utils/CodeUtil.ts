class CodeUtil{
    public static readonly METHOD_CARGARXML:string= "cargarXml()";

    private static _cadSalida:string="";
    private static _sp:number;
    private static _hp:number;
    private static _rp:number;
    private static _temporal:number;

    constructor() {
    }

    public static init(){
        this._cadSalida="";
        this._sp=0;
        this._hp=0;
        this._rp=0;
        this._temporal=0;
        this.initCad();
    }

    public static printWithComment(cadena:string, comentario:string){
        CodeUtil._cadSalida+=cadena+((comentario==null)?"":"\t\t\t//"+comentario)+"\n";
    }

    public static print(cadena:string){
        CodeUtil._cadSalida+=cadena+"\n";
    }

    public static printComment(comentario:string){
        CodeUtil._cadSalida+="//"+comentario+"\n";
    }

    public static initCad(){
        this._cadSalida ="";
        this._cadSalida+="float Heap[1000000]; //estructura heap\n"
        this._cadSalida+="float Stack[1000000]; //estructura stack\n";
        this._cadSalida+="float Repository[2000000]; //estructura repository\n"
        this._cadSalida+="int SP=0;\n";
        this._cadSalida+="int HP=0;\n";
        this._cadSalida+="int RP=0;\n";
        CodeUtil.print("");
        
    }

    public static getDefinitionTemps():string{
        var cadFinal = "";
        var cad = "float ";
        for (var _i = 0; _i <= this._temporal; _i++) {
            cad+=(cad == "float ")?"":",";
            cad+=" t"+_i;
            if(cad.length>150){
                cadFinal+=cad+";\n";
                cad="float ";
            }
        }
        cad += ";";
        cadFinal +=cad;
        return cadFinal;
    }



    public static generarTemporal():string{
        var temporal = "t"+this._temporal;
        this._temporal+=1;
        return temporal;
    }


    public static crearMain(){
        CodeUtil.print("int main()");
        CodeUtil.print("{");
        CodeUtil.print(CodeUtil.METHOD_CARGARXML+";");
        CodeUtil.print("}");

    }

    public static createTemps(){
        this._cadSalida = this.getDefinitionTemps()+"\n"+this._cadSalida;
    }

    public static createLibs(){
        this._cadSalida = "#include <stdio.h>\n\n"+this._cadSalida;
    }

    public static finalizeCad(){
        CodeUtil.crearMain();
        CodeUtil.createTemps();
        CodeUtil.createLibs();
    }


}