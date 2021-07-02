var optimizador =/**@class */ (function(){
    
    function optimizador(bloque) {
        this.bloque = bloque
    }

    optimizador.prototype.optimizar= function() {
        //this.regla1()
        //this.regla2()
       // this.regla3()
        //this.regla4()
        this.regla5()
    }
  //  t2 = b;
    //b = t2;
    optimizador.prototype.regla1= function () {
        
        this.bloque.forEach(bl => {
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1 = bl.getInstrucciones()[k]
                    if(instr1.getTipo() == tipoInstr.ASIGNACION_OPERACION){//toma la primera tipo asig_operacion
                        for(let i=k+1; i<bl.getInstrucciones().length; i++){
                            var instr2 = bl.getInstrucciones()[i]
                            if(instr2.getTipo() == tipoInstr.ASIGNACION_OPERACION){//toma la segunda tipo asig_operacion
                                if(instr1.id != instr2.id){
                                    if(instr1.id== instr2.expr && instr2.id == instr1.expr){//compara
                                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                        bl.getInstrucciones()[i].tipo=tipoInstr.NULL
                                        break;
                                    }else{
                                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                        bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                    }
                                }else{
                                    bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                    bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                    break
                                }
                                
                                
                            }else
                                bl.getInstrucciones()[i].setOptimizado(instr2.set3D())
                        }
                    
                    }else
                        bl.getInstrucciones()[k].setOptimizado(instr1.set3D())

                    
                }
                
            }
            bl.setOptimizado(bl.set3D())
        });
            
        
    }
   // goto L1;
   //<instrucciones>
   //L1: ----------------------> L1:
    optimizador.prototype.regla4=function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.GOTO){
                        for(let i=k+1; i<bl.getInstrucciones().length; i++){
                            var instr2=bl.getInstrucciones()[i]
                            if(instr2.getTipo()==tipoInstr.ETIQUETA){
                                if(instr1.id == instr2.id){
                                    bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                    bl.getInstrucciones()[k].tipo=tipoInstr.NULL
                                    break
                                }else{
                                    bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                    bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                    break
                                }
                            }else
                                bl.getInstrucciones()[i].setOptimizado(instr2.set3D())

                            
                        }
                    }else
                        bl.getInstrucciones()[k].setOptimizado(instr1.set3D())
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    /*if a == 10 goto L1;
    goto L2;
    L1:
    <instrucciones>
    L2:*/

    /*if a != 10 goto L2;
    <instrucciones>
    L2:*/

    optimizador.prototype.regla3 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.IF){
                        var instr2=bl.getInstrucciones()[k+1]
                        var instr3=bl.getInstrucciones()[k+2]
                        if(instr2.getTipo()==tipoInstr.GOTO && instr3.getTipo()== tipoInstr.ETIQUETA){//si despues del if sigue un goto y luego etiqueta
                            if(instr3.id == instr1.id){//validar que la etiqueta sea igual al goto del if
                                for(let i= k+3; i<bl.getInstrucciones().length; i++){
                                    var instr4=bl.getInstrucciones()[i]
                                    if(instr4.getTipo()==tipoInstr.ETIQUETA){//encontrar la siguiente etiqueta
                                        if(instr4.id== instr2.id){
                                            bl.getInstrucciones()[k].invertirSigno()
                                            bl.getInstrucciones()[k].id=instr4.id
                                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                            bl.getInstrucciones()[k+1].tipo = tipoInstr.NULL
                                            bl.getInstrucciones()[k+2].tipo = tipoInstr.NULL
                                            bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                            break
                                        }else{
                                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                            bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D())
                                            bl.getInstrucciones()[k+2].setOptimizado(bl.getInstrucciones()[k+2].set3D())
                                            bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                            
                                        }
                                    }else{
                                        bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D())
                                    }
                                }
                            }else{
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D())
                                bl.getInstrucciones()[k+2].setOptimizado(bl.getInstrucciones()[k+2].set3D())
                                break;
                            }
                            
                            
                        }else{
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                            bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D())
                            bl.getInstrucciones()[k+2].setOptimizado(bl.getInstrucciones()[k+2].set3D())
                            break
                        }
                    }else{
                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                    }

                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }

    /*if 1 == 1 goto L1;
    goto L2;*/
    
    optimizador.prototype.regla2 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.IF){
                        
                        //verificar que sean constantes y sean iguales
                        if(instr1.validarCondicion()){//si son numeros
                            var instr2=bl.getInstrucciones()[k+1]
                            if(instr2.getTipo()==tipoInstr.GOTO && instr2.id != instr1.id){
                                bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                                bl.getInstrucciones()[k+1].setOptimizado("goto "+instr1.id+";\n")
                                break
                            }else{
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D())
                            }
                        }else{
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                        }
                    }else{
                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                    }
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    /*if 1 == 0 goto L1;
    goto L2;

---->goto L2;*/
    optimizador.prototype.regla5 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.IF){
                        
                        
                        if(!instr1.validarCondicion()){//si  no se cumple condicion
                            var instr2=bl.getInstrucciones()[k+1]
                            if(instr2.getTipo()==tipoInstr.GOTO && instr2.id != instr1.id){
                                bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D())
                                break
                            }else{
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D())
                            }
                        }else{
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                        }
                    }else{
                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                    }
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }

    return optimizador
}())