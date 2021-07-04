let traductorC3D = new Traduccion();

let listaErrores=[];
let tem=0;
let c3d="";
function traducirOperacion(instruccion,entorno,tablaSimbolos){
    let valor1;
    let valor2;
    
    switch (instruccion.tipo) {
        case "NUMERO":  
            ++tem;
           traductorC3D.traducirAritmeticas("            t"+tem+"="+instruccion.valor+";\n");        
            return "t"+tem;
        case "OP_MAS":
           valor1=traducirOperacion(instruccion.valor1,entorno,tablaSimbolos);
           valor2=traducirOperacion(instruccion.valor2,entorno,tablaSimbolos);
           ++tem;
          traductorC3D.traducirAritmeticas("            t"+tem+"="+valor1+"+"+valor2+";\n");
           return "t"+tem;
        case "OP_MENOS":
            valor1=traducirOperacion(instruccion.valor1,entorno,tablaSimbolos);
            valor2=traducirOperacion(instruccion.valor2,entorno,tablaSimbolos);
            ++tem;
           traductorC3D.traducirAritmeticas("            t"+tem+"="+valor1+"-"+valor2+";\n");
            return "t"+tem;
        case "OP_MUL":
            valor1=traducirOperacion(instruccion.valor1,entorno,tablaSimbolos);
            valor2=traducirOperacion(instruccion.valor2,entorno,tablaSimbolos);
            ++tem;
           traductorC3D.traducirAritmeticas("            t"+tem+"="+valor1+"*"+valor2+";\n");
            return "t"+tem;
        case "OP_DIV":
            valor1=traducirOperacion(instruccion.valor1,entorno,tablaSimbolos);
            valor2=traducirOperacion(instruccion.valor2,entorno,tablaSimbolos);
            ++tem;
           traductorC3D.traducirAritmeticas("            t"+tem+"="+valor1+"/"+valor2+";\n");
            return "t"+tem;
        case "OP_NEG":
           
            valor1=traducirOperacion(instruccion.valor1,entorno,tablaSimbolos);
            ++tem;
           traductorC3D.traducirAritmeticas("            t"+tem+"= -"+valor1+";\n");
            return "t"+tem;
    }
    
}

function traducirOperacionW(instruccion,tabla){
    let cod="";
    let valor1;
    let valor2;
    switch (instruccion.tipo) {
        case "OP_MAS":
           valor1=traducirOperacionW(instruccion.valor1,tabla);
           valor2=traducirOperacionW(instruccion.valor2,tabla);
           ++tem;
          traductorC3D.traducirAritmeticas("\n            t"+tem+"="+valor1+"+"+valor2+";");
           return "t"+tem;
        case "OP_MENOS":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            ++tem;
           traductorC3D.traducirAritmeticas("\n            t"+tem+"="+valor1+"-"+valor2+";");
            return "t"+tem;
        case "OP_MUL":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            ++tem;
           traductorC3D.traducirAritmeticas("\n            t"+tem+"="+valor1+"*"+valor2+";");
            return "t"+tem;
        case "OP_DIV":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            ++tem;
           traductorC3D.traducirAritmeticas("\n            t"+tem+"="+valor1+"/"+valor2+";");
            return "t"+tem;
        case "OP_NEG":
            
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            traductorC3D.traducirAritmeticas("\n            t"+tem+"= -"+valor1+";");
            ++tem;
            return "t"+tem;

        case "MAYOR":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            traductorC3D.Ls=traductorC3D.Ls+1;
            cod="\n\tif("+valor1+" > "+valor2+") goto LA"+ traductorC3D.Ls+" ;"
            cod+="\n\tgoto LA"+ (traductorC3D.Ls+1)+" ;"
            cod+="\n\tLA"+traductorC3D.Ls+":\n";
            ++tem;
            cod+="\tt"+tem+"=1;\n";
            cod+="\tLA"+(traductorC3D.Ls+1)+":\n";
            ++tem;
            cod+="\tt"+tem+"=0;\n";
            traductorC3D.traducirAritmeticas("\n            "+cod);
            traductorC3D.Ls=traductorC3D.Ls+1;
            return "t"+tem;

        case "MAYOR_IGUAL":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            traductorC3D.Ls=traductorC3D.Ls+1;
            cod="\n\tif("+valor1+" >= "+valor2+") goto LA"+ traductorC3D.Ls+" ;"
            cod+="\n\tgoto LA"+ (traductorC3D.Ls+1)+" ;"
            cod+="\n\tLA"+traductorC3D.Ls+":\n";
            ++tem;
            cod+="\tt"+tem+"=1;\n";
            cod+="\tLA"+(traductorC3D.Ls+1)+":\n";
            ++tem;
            cod+="\tt"+tem+"=0;\n";
            traductorC3D.traducirAritmeticas("\n            "+cod);
            traductorC3D.Ls=traductorC3D.Ls+1;
            return "t"+tem;

        case "MENOR":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            traductorC3D.Ls=traductorC3D.Ls+1;
            cod="\n\tif("+valor1+" < "+valor2+") goto LA"+ traductorC3D.Ls+" ;"
            cod+="\n\tgoto LA"+ (traductorC3D.Ls+1)+" ;"
            cod+="\n\tLA"+traductorC3D.Ls+":\n";
            ++tem;
            cod+="\tt"+tem+"=1;\n";
            cod+="\tLA"+(traductorC3D.Ls+1)+":\n";
            ++tem;
            cod+="\tt"+tem+"=0;\n";
            traductorC3D.traducirAritmeticas("\n            "+cod);
            traductorC3D.Ls=traductorC3D.Ls+1;
            return "t"+tem;

        case "MENOR_IGUAL":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            traductorC3D.Ls=traductorC3D.Ls+1;
            cod="\n\tif("+valor1+" <= "+valor2+") goto LA"+ traductorC3D.Ls+" ;"
            cod+="\n\tgoto LA"+ (traductorC3D.Ls+1)+" ;"
            cod+="\n\tLA"+traductorC3D.Ls+":\n";
            ++tem;
            cod+="\tt"+tem+"=1;\n";
            cod+="\tLA"+(traductorC3D.Ls+1)+":\n";
            ++tem;
            cod+="\tt"+tem+"=0;\n";
            traductorC3D.traducirAritmeticas("\n            "+cod);
            traductorC3D.Ls=traductorC3D.Ls+1;
            return "t"+tem;

        case "IGUAL":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            traductorC3D.Ls=traductorC3D.Ls+1;
            cod="\n\tif("+valor1+" == "+valor2+") goto LA"+ traductorC3D.Ls+" ;"
            cod+="\n\tgoto LA"+ (traductorC3D.Ls+1)+" ;"
            cod+="\n\tLA"+traductorC3D.Ls+":\n";
            ++tem;
            cod+="\tt"+tem+"=1;\n";
            cod+="\tLA"+(traductorC3D.Ls+1)+":\n";
            ++tem;
            cod+="\tt"+tem+"=0;\n";
            traductorC3D.traducirAritmeticas("\n            "+cod);
            traductorC3D.Ls=traductorC3D.Ls+1;
            return "t"+tem;

        case "DIFERENTE":
            valor1=traducirOperacionW(instruccion.valor1,tabla);
            valor2=traducirOperacionW(instruccion.valor2,tabla);
            traductorC3D.Ls=traductorC3D.Ls+1;
            cod="\n\tif("+valor1+" != "+valor2+") goto LA"+ traductorC3D.Ls+" ;"
            cod+="\n\tgoto LA"+ (traductorC3D.Ls+1)+" ;"
            cod+="\n\tLA"+traductorC3D.Ls+":\n";
            ++tem;
            cod+="\tt"+tem+"=1;\n";
            cod+="\tLA"+(traductorC3D.Ls+1)+":\n";
            ++tem;
            cod+="\tt"+tem+"=0;\n";
            traductorC3D.traducirAritmeticas("\n            "+cod);
            traductorC3D.Ls=traductorC3D.Ls+1;
            return "t"+tem;

        case "NUMERO":
            ++tem;
            traductorC3D.traducirAritmeticas("\n            t"+tem+"="+instruccion.valor+";");        
            return "t"+tem;
        case "CADENA":
            ++tem;
            return "t"+tem;
        case "VARIABLE":
            ++tem;
            return "t"+tem;

        default:
            return false;
           
    }
}
// traductorC3D.traducirFuncion('<book pages="');
// traductorC3D.imprimirNumero(ref1);
// traductorC3D.traducirFuncion('">');
// traductorC3D.imprimirCadena(ref2);
// traductorC3D.traducirFuncion(`</book>\n`);

// traductorC3D.traducirFuncion('<book pages="');
// traductorC3D.imprimirNumero(ref3);
// traductorC3D.traducirFuncion('">');
// traductorC3D.imprimirCadena(ref4);
// traductorC3D.traducirFuncion(`</book>\n`);


// traductorC3D.traducirFuncion('<book pages="');
// traductorC3D.imprimirNumero(ref1);
// traductorC3D.traducirFuncion('">');
// traductorC3D.imprimirCadena(ref4);
// traductorC3D.traducirFuncion(`</book>\n`);



// console.log(traductorC3D.obtenerCodigo());