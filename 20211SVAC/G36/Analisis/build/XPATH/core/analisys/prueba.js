let tabla1 = {
    "ambito" : [
        {"nombre":"titulo","valor":"llamame", "tipo":0,"fila":"1","columna":"2","entorno":undefined},
        {"nombre":"autor","valor":"jose maria", "tipo":0,"fila":"1","columna":"2","entorno":undefined}
    ],
    "padre" : undefined
}

let tabla2 = {
    "ambito" : [
        {"nombre":"titulo","valor":"cosas de casa", "tipo":0,"fila":"1","columna":"2","entorno":undefined},
        {"nombre":"autor","valor":"amanecer", "tipo":0,"fila":"1","columna":"2","entorno":undefined}
    ],
    "padre" : undefined
}

let entornoGlobal ={
"ambito": [
    {"nombre":"libro","valor":"llamame", "tipo":3,"fila":1,"columna":2,"entorno":tabla1},
    {"nombre":"libro","valor":"callate", "tipo":3,"fila":"1","columna":"2","entorno":tabla2}
],
"padre":null
}
let global =  {"nombre":"global","valor":"", "tipo":3,"fila":0,"columna":0,"entorno":entornoGlobal}

module.exports = global;