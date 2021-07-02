var optimizador =/**@class */ (function(){
    
    function optimizador(bloque) {
        this.bloque = bloque
        this.reporte=""
    }
    optimizador.prototype.print = function(){
        var codigo=""
        for(let i=0; i<this.bloque.length; i++){
            codigo+= this.bloque[i].getOptimizado()
          }
          return codigo;
    }
    optimizador.prototype.optimizar= function() {
        this.regla1()
        this.regla2()
        this.regla3()
        this.regla4()
        this.regla5()
        this.regla6()
        this.regla7()
        
        this.regla8()
        
        this.regla9()
        
        this.regla10()
        
        this.regla11()
        
        this.regla12()
        
        this.regla13()
        
        this.regla14()
        
        this.regla15()
        
        this.regla16()
        
        this.regla17()
        
        this.regla18()
        
        
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
                                        this.reporte += "\n******original----REGLA 1-- --**\n"
                                        this.reporte += bl.getInstrucciones()[k].set3D()+"\n"
                                        this.reporte +=bl.getInstrucciones()[i].set3D()
                                        this.reporte +="****OPTIMIZADO****\n"
                                        this.reporte += bl.getInstrucciones()[k].set3D()+"\n"
                                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(), true)
                                        bl.getInstrucciones()[i].tipo=tipoInstr.NULL
                                        bl.getInstrucciones()[i].optimizado=true
                                        break;
                                    }else{
                                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                        bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                    }
                                }else{
                                    bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                    bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                    break
                                }
                                
                                
                            }else
                                bl.getInstrucciones()[i].setOptimizado(instr2.set3D(),false)
                        }
                    
                    }else
                        bl.getInstrucciones()[k].setOptimizado(instr1.set3D(),false)

                    
                }
                
            }
            bl.setOptimizado(bl.set3D())
        });
            
        
    }
   // goto L1;
   //<instrucciones>
   //L1: ----------------------> L1:
    optimizador.prototype.regla2=function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.GOTO){
                        for(let i=k+1; i<bl.getInstrucciones().length; i++){
                            var instr2=bl.getInstrucciones()[i]
                            if(instr2.getTipo()==tipoInstr.ETIQUETA){
                                if(instr1.id == instr2.id){
                                    this.reporte += "\n******original----REGLA 2-- --**\n"
                                    this.reporte += bl.getInstrucciones()[k].set3D()+"\n"
                                    this.reporte +=bl.getInstrucciones()[i].set3D()
                                    this.reporte +="****OPTIMIZADO****\n"
                                    this.reporte += bl.getInstrucciones()[i].set3D()+"\n"
                                    bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),true)
                                    bl.getInstrucciones()[k].tipo=tipoInstr.NULL
                                    bl.getInstrucciones()[k].optimizado=true
                                    break
                                }else{
                                    bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                    bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                    break
                                }
                            }else
                                bl.getInstrucciones()[i].setOptimizado(instr2.set3D(),false)

                            
                        }
                    }else
                        bl.getInstrucciones()[k].setOptimizado(instr1.set3D(),false)
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

    optimizador.prototype.regla4 = function(){
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
                                            this.reporte += "\n******original----REGLA 4-- --**\n"
                                            this.reporte += bl.getInstrucciones()[k].set3D()+"\n"
                                            this.reporte +=bl.getInstrucciones()[k+1].set3D()+"\n"
                                            this.reporte +=bl.getInstrucciones()[k+2].set3D()+"\n"
                                            this.reporte +=bl.getInstrucciones()[i].set3D()+"\n"
                                            
                                            bl.getInstrucciones()[k].invertirSigno()
                                            bl.getInstrucciones()[k].id=instr4.id
                                            this.reporte +="****OPTIMIZADO****\n"
                                            this.reporte += bl.getInstrucciones()[k].set3D()+"\n"
                                            this.reporte += bl.getInstrucciones()[i].set3D()+"\n"
                                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),true)
                                            bl.getInstrucciones()[k+1].tipo = tipoInstr.NULL
                                            bl.getInstrucciones()[k+2].tipo = tipoInstr.NULL
                                            bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),true)
                                            break
                                        }else{
                                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                            bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D(),false)
                                            bl.getInstrucciones()[k+2].setOptimizado(bl.getInstrucciones()[k+2].set3D(),false)
                                            bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                            
                                        }
                                    }else{
                                        bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                    }
                                }
                            }else{
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D(),false)
                                bl.getInstrucciones()[k+2].setOptimizado(bl.getInstrucciones()[k+2].set3D(),false)
                                break;
                            }
                            
                            
                        }else{
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                            bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D(),false)
                            bl.getInstrucciones()[k+2].setOptimizado(bl.getInstrucciones()[k+2].set3D(),false)
                            break
                        }
                    }else{
                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }

                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }

    /*if 1 == 1 goto L1;
    goto L2;*/
    
    optimizador.prototype.regla3 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.IF){
                        
                        //verificar que sean constantes y sean iguales
                        if(instr1.validarCondicion()){//si son numeros
                            var instr2=bl.getInstrucciones()[k+1]
                            if(instr2.getTipo()==tipoInstr.GOTO && instr2.id != instr1.id){
                                this.reporte += "\n******original----REGLA 3----****\n"
                                this.reporte += instr1.set3D()+"\n"
                                this.reporte +=instr2.set3D()+"\n"
                                
                                bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                                bl.getInstrucciones()[k].optimizado=true
                                bl.getInstrucciones()[k+1].id=instr1.id
                                this.reporte +="****OPTIMIZADO****\n"
                                this.reporte += "goto "+instr1.id+";\n"
                                bl.getInstrucciones()[k+1].setOptimizado("goto "+instr1.id+";\n",true)
                               
                            }else{
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D(),false)
                            }
                        }else{
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                        }
                    }else{
                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
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
                                this.reporte += "\n******original----REGLA 5-- --**\n"
                                    this.reporte += instr1.set3D()+"\n"
                                    this.reporte += instr2.set3D()
                                    this.reporte +="****OPTIMIZADO****\n"
                                    this.reporte += instr2.set3D()+"\n"
                                bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D(),true)
                                
                            }else{
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                                bl.getInstrucciones()[k+1].setOptimizado(bl.getInstrucciones()[k+1].set3D(),false)
                            }
                        }else{
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                        }
                    }else{
                        bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
/* 
 goto L1;
<instrucciones>
L1:
goto L2;

*/
    optimizador.prototype.regla6 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.GOTO){
                        for(let i=k+1; i<bl.getInstrucciones().length; i++){
                            var instr2=bl.getInstrucciones()[i]
                            if(instr2.getTipo()==tipoInstr.ETIQUETA && instr1.id==instr2.id){
                                var instr3=bl.getInstrucciones()[i+1]
                                if(instr3.getTipo()==tipoInstr.GOTO){
                                    this.reporte += "\n******original----REGLA 6-- --**\n"
                                    this.reporte += instr1.set3D()+"\n"
                                    this.reporte += instr2.set3D()+"\n"
                                    this.reporte += instr3.set3D()+"\n"
                                    
                                    instr1.id= instr3.id
                                    this.reporte +="****OPTIMIZADO****\n"
                                    this.reporte += instr1.set3D()+"\n"
                                    this.reporte += instr2.set3D()+"\n"
                                    this.reporte += instr3.set3D()+"\n"
                                }
                                        
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),true)
                                bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                bl.getInstrucciones()[i+1].setOptimizado(bl.getInstrucciones()[i+1].set3D(),false)
                                break;
                            }else{
                                bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                            }

                        }
                    }else
                      bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    /*

    if t9 >= t10 goto L1;
    <instrucciones>
    L1:
    goto L2;

    */
    optimizador.prototype.regla7 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()==tipoInstr.IF){
                        for(let i=k+1; i<bl.getInstrucciones().length; i++){
                            var instr2=bl.getInstrucciones()[i]
                            if(instr2.getTipo()==tipoInstr.ETIQUETA && instr1.id==instr2.id){
                                var instr3=bl.getInstrucciones()[i+1]
                                if(instr3.getTipo()==tipoInstr.GOTO){
                                    this.reporte += "\n******original----REGLA 7-- --**\n"
                                    this.reporte += instr1.set3D()+"\n"
                                    this.reporte += instr2.set3D()+"\n"
                                    this.reporte += instr3.set3D()+"\n"
                                    instr1.id= instr3.id
                                    this.reporte +="****OPTIMIZADO****\n"
                                    this.reporte += instr1.set3D()+"\n"
                                    this.reporte += instr2.set3D()+"\n"
                                    this.reporte += instr3.set3D()+"\n"
                                }
                                        
                                bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),true)
                                bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                                bl.getInstrucciones()[i+1].setOptimizado(bl.getInstrucciones()[i+1].set3D(),false)
                                break;
                            }else{
                                bl.getInstrucciones()[i].setOptimizado(bl.getInstrucciones()[i].set3D(),false)
                            }

                        }
                    }else
                      bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
//x = x + 0; 
    optimizador.prototype.regla8 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id == instr1.expr1 && instr1.operador =="+" && instr1.expr2=="0"){
                            this.reporte += "\n******original----REGLA 8-- --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            this.reporte += "--se elimina--\n"
                            bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = x - 0; 
    optimizador.prototype.regla9 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id == instr1.expr1 && instr1.operador =="-" && instr1.expr2=="0"){
                            this.reporte += "\n******original----REGLA 9-- --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            this.reporte += "--se elimina--\n"
                            bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = x *1; 
    optimizador.prototype.regla10 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id == instr1.expr1 && instr1.operador =="*" && instr1.expr2=="1"){
                            this.reporte += "\n******original----REGLA 1--0 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            this.reporte += "--se elimina--\n"
                            bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = x /1; 
    optimizador.prototype.regla11 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id == instr1.expr1 && instr1.operador =="/" && instr1.expr2=="1"){
                            this.reporte += "\n******original----REGLA 1--1 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            this.reporte += "--se elimina--\n"
                            bl.getInstrucciones()[k].tipo = tipoInstr.NULL
                         }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }

    //x = y + 0; 
    optimizador.prototype.regla12 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr1 && instr1.operador =="+" && instr1.expr2=="0"){
                            this.reporte += "\n******original----REGLA 1--2 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+";\n")
                            this.reporte += instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = y - 0; 
    optimizador.prototype.regla13 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr1 && instr1.operador =="-" && instr1.expr2=="0"){
                            this.reporte += "\n******original----REGLA 1--3 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+";\n")
                            this.reporte+= instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = y *1; 
    optimizador.prototype.regla14 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr1 && instr1.operador =="*" && instr1.expr2=="1"){
                            this.reporte += "\n******original----REGLA 1--4 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+";\n",true)
                            this.reporte+= instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = y /1; 
    optimizador.prototype.regla15 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr1 && instr1.operador =="/" && instr1.expr2=="1"){
                            this.reporte += "\n******original----REGLA 1--5 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+";\n")
                            this.reporte+=instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = y *2; 
    optimizador.prototype.regla16 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr1 && instr1.operador =="*" && instr1.expr2=="2"){
                            this.reporte += "\n******original----REGLA 1--6 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            bl.getInstrucciones()[k].expr2= bl.getInstrucciones()[k].expr1
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+ " + "+ instr1.expr2+";\n")
                            this.reporte+= instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = y *0; 
    optimizador.prototype.regla17 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr1 && instr1.operador =="*" && instr1.expr2=="0"){
                            this.reporte += "\n******original----REGLA 1--2 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            bl.getInstrucciones()[k].expr1= bl.getInstrucciones()[k].expr2
                            bl.getInstrucciones()[k].expr2=""
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+";\n")
                            this.reporte+= instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D())
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    //x = 0/y; 
    optimizador.prototype.regla18 = function(){
        this.bloque.forEach(bl=>{
            if(bl.getTipo() == TipoBloque.MAIN ||bl.getTipo() == TipoBloque.FUNCTION ){//
                for(let k=0; k<bl.getInstrucciones().length; k++){//busca en instrucciones dentro del bloque
                    var instr1=bl.getInstrucciones()[k]
                    if(instr1.getTipo()== tipoInstr.ASIGNACION_DOS_EXPR){
                        if(instr1.id != instr1.expr2 && instr1.operador =="/" && instr1.expr1=="0"){
                            this.reporte += "\n******original----REGLA 1--2 --**\n"
                            this.reporte += instr1.set3D()+"\n"
                            this.reporte +="****OPTIMIZADO****\n"
                            bl.getInstrucciones()[k].expr2=""
                            bl.getInstrucciones()[k].setOptimizado(instr1.id+" = "+instr1.expr1+";\n",true)
                            this.reporte += instr1.getOptimizado()
                        }else
                            bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                    }else
                         bl.getInstrucciones()[k].setOptimizado(bl.getInstrucciones()[k].set3D(),false)
                }
            }
            bl.setOptimizado(bl.set3D())
        })
    }
    return optimizador
}())