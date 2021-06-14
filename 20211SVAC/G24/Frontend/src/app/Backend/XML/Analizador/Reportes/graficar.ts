import nodoAST from '../Abstracto/nodoAST';
let cuerpo = '';
let contador = 0;

export default function graficarArbol(arbolitos:nodoAST){
    contador = 1;
    cuerpo = '';
    graphAST('0',arbolitos);
    cuerpo+="raiz "+arbolitos.getValor();
}

function graphAST(texto:String,padre:nodoAST){
    for(let hijo of padre.getHijos()){
        let nombreHijo = contador;
        cuerpo+= nombreHijo+" = "+hijo.getValor();
        contador++;
        graphAST(nombreHijo.toString(),hijo);

    }
}