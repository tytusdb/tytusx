function unir1(bloque1, bloque2) {
    var codigo=""
    codigo += bloque1.get3D()+"\n"
    for(let i =0; i<bloque2.length; i++){
        codigo +=bloque2[i].get3D()+"\n"
    }
    
    return codigo
}
function unir2(b1, b2, b3) {
    var codigo=""
    for(let i =0; i<b1.length; i++){
        codigo +=b1[i].get3D()+"\n"
    }
    codigo += b2.get3D()+"\n"
    for(let i =0; i<b3.length; i++){
        codigo +=b3[i].get3D()+"\n"
    }
    return codigo
}
function unir3(b1, b2) {
    var codigo=""
    for(let i =0; i<b1.length; i++){
        codigo +=b1[i].get3D()+"\n"
    }
    codigo += b2.get3D()+"\n"
    return codigo
}