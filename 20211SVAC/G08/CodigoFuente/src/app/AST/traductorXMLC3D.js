"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraductorXML_C3D = void 0;
class TraductorXML_C3D{ 
     
    constructor(){
        this.xml_C3D="";
        this.temporal_0="";
        this.temporal_1="";      
        this.contTempos=0;
        this.HP=0;
        this.SP=2;
        this.T_0=0;
        this.T_1=0;
        this.heap=[];
        this.stack=[];
    }

    getTraduccion(){
        
    }
   
    traducir(objetos){

        var objetosAux = objetos;
        this.stack[0]=0;        
        this.xml_C3D = "";
        this.temporal_0 = "t"+this.contTempos;
        this.contTempos++;
        this.temporal_1 = "t"+this.contTempos;
        this.contTempos++;
        this.xml_C3D += "\n\t//en la posicion 1 del heap se comienza a almacenar el XML";
        this.recorrer_Lista_Objetos(objetosAux);
        this.xml_C3D += "\n\t//incrementa en 1 el puntero Heap";
        this.xml_C3D += "\n\tHP = HP + 1;";
        this.HP = this.HP + 1;
        this.xml_C3D += "\n\t//almacenar la posicion donde termina el xml en el heap"
        this.xml_C3D += "\n\t" + this.temporal_0 + " =  HP;" ;
        this.T_0 = this.HP;
        this.xml_C3D += "\n\t//almacenar en la posicion 1 del stack, donde termina el xml en el heap"; 
        this.xml_C3D += "\n\tstack[(int)1]= t0;";
        this.stack[0]=this.T_0;
        this.finalXML = this.T_0;
        return this.xml_C3D;

    }

    recorrer_Lista_Objetos(objetos){
       console.log(objetos);
        var _this = this;
        var _counter = 0;
        objetos.forEach(function (objeto){
            if(_counter != 0){
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1; 
                _this.xml_C3D += "\n\t//almacena un -9 para indicar que empieza un hermano";
                _this.xml_C3D += "\n\theap[(int)HP] = -9;";
                _this.heap.push(-9);
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1; 
            }

            _this.xml_C3D += "\n\t//almacena un -1 para indicar que comienza un objeto";
            _this.xml_C3D += "\n\theap[(int)HP] = -1;";
            _this.heap.push(-1);
            _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
            _this.xml_C3D += "\n\tHP = HP + 1;";
            _this.HP = _this.HP + 1;

            _this.xml_C3D += "\n\t//El temporal " + _this.temporal_0 + " tiene el valor del Puntero Heap";
            _this.xml_C3D += "\n\t" + _this.temporal_0 + " = HP;";
            _this.T_0 = _this.HP;
                
            _this.xml_C3D += "\n\t//El temporal " + _this.temporal_1 + " tiene el valor del stack \n";
            _this.xml_C3D += "\n\t" + _this.temporal_1 + " = SP;";
            _this.T_1 = _this.SP;

            var etiqueta_aux = objeto.getId();

            _this.xml_C3D += "\n\t//almacena en el stack la referencia al heap del OBJETO -> "  + etiqueta_aux;
            _this.xml_C3D += "\n\tstack[(int)"+ _this.temporal_1 + "] = "+ _this.temporal_0 + ";";
            _this.stack.push(_this.T_0);
            objeto.setPosicion(_this.T_1);
            _this.xml_C3D += "\n\t//incrementa en 1 el temporal -> "+ _this.temporal_1;
            _this.xml_C3D += "\n\t" + _this.temporal_1 + " = " + _this.temporal_1 + " + 1;" ;
            _this.T_1 = _this.T_1 + 1;
            _this.SP = _this.T_1;                
            _this.xml_C3D += "\n\t//empieza almacenar la etiqueta -> " + etiqueta_aux;
            
            for(var i = 0; i<etiqueta_aux.length; i++){
                _this.xml_C3D += "\n\t//almacena la letra -> " + etiqueta_aux[i];
                _this.xml_C3D += "\n\theap[(int)HP] = " + etiqueta_aux.codePointAt(i) + ";";
                _this.heap.push(etiqueta_aux.codePointAt(i));
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
            }
            _this.HP = _this.HP - 1;
            if (objeto.getAtributos().length > 0){
                objeto.getAtributos().forEach(function (atributo){
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    _this.xml_C3D += "\n\t//almacena un -2 para indicar que comienza un ATRIBUTO";
                    _this.xml_C3D += "\n\theap[(int)HP] = -2;";
                    _this.heap.push(-2);
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    _this.xml_C3D += "\n\t//almacenamos en "+ _this.temporal_0 + " la posicion del heap para el siguiente objeto o atributo";
                    _this.xml_C3D += "\n\t" + _this.temporal_0 + " = HP;";
                    _this.T_0 = _this.HP;
                    _this.T_1 = _this.SP;
    
                    _this.xml_C3D += "\n\t//almacena en el stack la referencia al heap del ATRIBUTO -> " + atrib_aux;
                    _this.xml_C3D += "\n\tstack[(int)"+ _this.temporal_1 + "] = "+ _this.temporal_0 + ";";
                    _this.stack.push(_this.T_0);
                    atributo.setPosicion(_this.T_1);
                    _this.xml_C3D += "\n\t//incrementa en 1 el temporal -> "+ _this.temporal_1;
                    _this.xml_C3D += "\n\t" + _this.temporal_1 + " = " + _this.temporal_1 + " + 1;" ;
                    _this.T_1 = _this.T_1 + 1;
                    _this.SP = _this.T_1;

                    var atrib_aux = atributo.getId();
                    _this.xml_C3D += "\n\t//empieza almacenar el id del ATRIBUTO -> " + atrib_aux;                    
                    for(var i = 0; i<atrib_aux.length; i++){                      
                        _this.xml_C3D += "\n\t//almacenamos la letra ->" + atrib_aux[i];
                        _this.xml_C3D += "\n\theap[(int)HP] = " + atrib_aux.codePointAt(i) + ";";
                        _this.heap.push(atrib_aux.codePointAt(i));
                        _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                        _this.xml_C3D += "\n\tHP = HP + 1;";
                        _this.HP = _this.HP + 1;
                    }
                    _this.xml_C3D += "\n\t//almacena un -3 para indicar comienza el valor del ATROBUTO";
                    _this.xml_C3D += "\n\theap[(int)HP] = -3;";
                    _this.heap.push(-3);
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    var valor_aux = atributo.getValor();
                    _this.xml_C3D += "\n\t//empieza almacenar el valor del ATRIBUTO -> " + atrib_aux + " = " + valor_aux;

                    for(var i = 0; i<valor_aux.length; i++){                      
                        _this.xml_C3D += "\n\t//almacena el caracter -> " + valor_aux[i];
                        _this.xml_C3D += "\n\theap[(int)HP] = " + valor_aux.codePointAt(i) + ";";
                        _this.heap.push(valor_aux.codePointAt(i));
                        _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                        _this.xml_C3D += "\n\tHP = HP + 1;";
                        _this.HP = _this.HP + 1;
                    }

                    _this.HP = _this.HP - 1;
                    
                });
            }
            
            if (objeto.getTexto() != ""){
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                var text_aux = objeto.getTexto();
                _this.xml_C3D += "\n\t//almacena un -4 para indicar que comienza TEXTO -> " + text_aux;
                _this.xml_C3D += "\n\theap[(int)HP] = -4;";
                _this.heap.push(-4);

                for(var i = 0; i<text_aux.length; i++){
                    _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                    _this.xml_C3D += "\n\tHP = HP + 1;";
                    _this.HP = _this.HP + 1;
                    _this.xml_C3D += "\n\t//almacena la letra -> " + text_aux[i];
                    _this.xml_C3D += "\n\theap[(int)HP] = " + text_aux.codePointAt(i) + ";";
                    _this.heap.push(text_aux.codePointAt(i));
                }

                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.xml_C3D += "\n\t//almacena un -5 para indicar fin del TEXTO -> " + text_aux;
                _this.xml_C3D += "\n\theap[(int)HP] = -5;";
                _this.heap.push(-5);
            }

            if (objeto.getObjetos().length > 0){
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.xml_C3D += "\n\t//almacena un -7 para indicar que comienza HIJO";
                _this.xml_C3D += "\n\theap[(int)HP] = -7;";
                _this.heap.push(-7);
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.recorrer_Lista_Objetos(objeto.getObjetos());
                _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
                _this.xml_C3D += "\n\tHP = HP + 1;";
                _this.HP = _this.HP + 1;
                _this.xml_C3D += "\n\t//almacena un -8 para indicar que se retorna al PADRE -> " + etiqueta_aux;
                _this.xml_C3D += "\n\theap[(int)HP] = -8;";
                _this.heap.push(-8);
            }

            _this.xml_C3D += "\n\t//incrementa en 1 el Puntero Heap";
            _this.xml_C3D += "\n\tHP = HP + 1;";
            _this.HP = _this.HP + 1;
            _this.xml_C3D += "\n\t//almacena un -6 para indicar fin del OBJETO -> " + etiqueta_aux;
            _this.xml_C3D += "\n\theap[(int)HP] = -6;";
            _this.heap.push(-6);
            _counter++;
        });       
    }       
}
exports.TraductorXML_C3D = TraductorXML_C3D;