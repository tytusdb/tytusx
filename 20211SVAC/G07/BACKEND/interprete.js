function interpretar(intruccion,entorno) {
    
    let ejecucion=new Consulta(entorno);
    ejecucion.ejecutar(intruccion);
}
let graphviz_code="";
function generarAST(intruccion){
    //console.log(AST_xPath);
    graphviz_code="";
    graphviz_code+='digraph  { ';
    
    graficarNodo(intruccion,null);

    graphviz_code+='}';
    d3.select("#graph").graphviz().renderDot(graphviz_code);
   // console.log(graphviz_code);
    
}
function generarAST_gramatical(intruccion){
    //console.log(AST_xPath);
    graphviz_code="";
    graphviz_code+='digraph  { ';
    Padre=0;
    graficarNodo_g(intruccion,null);

    graphviz_code+='}';
    d3.select("#graph").graphviz().renderDot(graphviz_code);
    console.log(graphviz_code);
    
}

let etiqueta=0;

function  graficarNodo(AST_xPath,Padre){

    ++etiqueta;
    if(AST_xPath.valor){
        if (AST_xPath.valor === `"`) {
            let escaparCaracter = AST_xPath.replaceAll(`"`,`\"`);
            graphviz_code+=etiqueta+'[label= "'+ escaparCaracter +'" fillcolor="#d62728" shape="circle"];\n';
        } else {
            graphviz_code+=etiqueta+'[label= "'+AST_xPath.valor+'" fillcolor="#d62728" shape="circle"];\n';
        }
        
    }else{
        if (AST_xPath.valor === `"`) {
            let escaparCaracter = AST_xPath.replaceAll(`"`,`\"`);
            graphviz_code+=etiqueta+'[label= "'+ escaparCaracter +'" fillcolor="#d62728" shape="circle"];\n';
        } else {
            graphviz_code+=etiqueta+'[label= "'+AST_xPath+'" fillcolor="#d62728" shape="circle"];\n';
        }
        
    }
    
    let actual=etiqueta;
    if(Padre!=null){
        graphviz_code+=Padre+"->"+etiqueta+";\n";
    }
    //console.log(AST_xPath.hijos);
    if(AST_xPath.hijos!=null){
        for(let i=0;AST_xPath.hijos.length>i;i++){
            graficarNodo(AST_xPath.hijos[i],actual);
        }
    }
    
    
    
}
function  graficarNodo_g(AST_xPath,Padre){
    
   
    if(AST_xPath.hijos==null){
        ++etiqueta;
        console.log(AST_xPath);
        graphviz_code+=etiqueta+'[label= "'+AST_xPath+'" fillcolor="#d62728" shape="circle"];\n';
        if(Padre!=null&&Padre>0){
            graphviz_code+=Padre+"->"+etiqueta+";\n";
        }
    }else{
        
        
    }
    
    let actual=etiqueta;
    
    //console.log(AST_xPath.hijos);
    if(AST_xPath.hijos!=null){
        for(let i=0;AST_xPath.hijos.length>i;i++){
            graficarNodo_g(AST_xPath.hijos[i],actual);
        }
    }
    
    
    
}
/*
NO BORRAR
listaErrores.push(new TokenError("xPATH","ERROR Sintactico",str, hash.loc.last_line, hash.loc.last_column ));
        generTabla();

*/