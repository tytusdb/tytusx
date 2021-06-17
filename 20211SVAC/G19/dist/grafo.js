var nodos = new vis.DataSet();
var aristas = new vis.DataSet();
var bandera = false;
padre_id=i;
function newNodo(id,name){//creacion de nodos
    nodos.add([
        {id:id, label:name}
   ]);
  // console.log("id:", id, "label",name)
   i++;
}
function newArista(from, to){//creacion de aristas
   aristas.add([
        {from:from, to:to}
        
    ]);
   
    //console.log("padre", from, "hijo", to)
}
function graficar(){
    padre = ast.tree //nodo padre
    if (padre.name!=null){
        newNodo(i,padre.name);
        for (const n in padre.children){//si el nodo padre tiene hijos
            bandera=false;
            RecorrerChildren(padre.children[n],i-1)
        }
    }
    
    var contenedor= document.getElementById("grafo");//llama al contenedor
    var datos = {
        nodes: nodos,
        edges: aristas
    };
    var opciones = {//estética del grafo
        layout:{
            hierarchical:{
                levelSeparation:100,
                nodeSpacing:100,
                parentCentralization:true,
                
            }
        }
    };
    var graf = new vis.Network(contenedor, datos,opciones);//muestra grafo
    
}
function RecorrerChildren(actual,padre_id){
    
   if(actual.children !=undefined){//tiene hijos
        if (bandera==false){//para validar que cuando se llame recursivo si es falso cree el nodo del padre que está en metódo graficar
            newArista(padre_id,i)//si es true ya está creado no es necesario
            padre_id=i
            newNodo(i,actual.name)
            bandera=true
        }
        for(const child in actual.children){//recorre los hijos del nodo actual
            if (actual.children[child].children != undefined){//si el hijo actual contiene más hijos
                newArista(padre_id,i)   //crea la arista hacia el nuevo nodo
                newNodo(i,actual.children[child].name); //crea el nuevo nodo
                RecorrerChildren(actual.children[child],i-1) //vuelve a llamar metodo con el hijo actual, i-1 será el nuevp padre
                
            }
            else{
                newArista(padre_id,i)//no tiene hijos solo se crea la arista hacia la hoja
                newNodo(i,actual.children[child]); //se crea el nodo hoja
            }
        }
    }
}
