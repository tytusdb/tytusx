import { GeneradorC3D } from "./GeneradorC3D";

export class Nativas {

    public generarNativas() {
        this.nativa_print_str();
        //this.nativa_print_integer();
        this.nativa_compararIgual_str_str();
       // this.nativa_compararNoIgual_str_str();
        //this.nativa_ToUpperCase();
        //this.nativa_ToLowerCase();
        this.nativa_concat_str_str();
     //this.nativa_concat_dbl_str();
      //  this.nativa_concat_str_dbl();
        this.nativa_concat_int_str();
        this.nativa_concat_str_int();
        //this.nativa_concat_str_bol();
        // this.nativa_concat_bol_str();
        //this.nativa_lenght_str();
        return GeneradorC3D.getInstancia().getNativas();
    }

    nativa_lenght_str() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let next = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_lenght_str');
        gen.isFunc = '\t';
        gen.genExpresion(t0, 'p', '1', '+');
        gen.genGetStack(t1, t0);
        gen.genAsignacion(t3, '0');
        gen.genLabel(next);
        gen.genGetHeap(t2, t1);
        gen.genIf(t2, '-1', '==', fin);
        gen.genExpresion(t3, t3, '1', '+');
        gen.genExpresion(t1, t1, '1', '+');
        gen.genGoto(next);
        gen.genLabel(fin);
        gen.genSetStack('p', t3);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t0);
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
    }

    nativa_print_str() {
        const gen = GeneradorC3D.getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let next = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_print_str');
        gen.isFunc = '\t';
        gen.genGetStack(t1, 'p');
        gen.genLabel(next);
        gen.genGetHeap(t2, t1);
        gen.genIf(t2, '-1', '==', fin);
        gen.genPrint('c', t2);
        gen.genExpresion(t1, t1, '1', '+');
        gen.genGoto(next);
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
    }
    /*
        nativa_print_integer() {
            const gen = GeneradorC3D.getInstancia();
            let t1 = gen.newTemporal();
            let t2 = gen.newTemporal();
            let t3 = gen.newTemporal();
            let inicio = gen.newLabel();
            let nextPos = gen.newLabel();
            let nextPrt = gen.newLabel();
            let fin = gen.newLabel();
    
            gen.genFuncion('nativa_print_integer');
            gen.isFunc = '\t';
            gen.genGetStack(t1, 'p');
            gen.genIf(t1, '0', '>=', inicio);
            gen.genPrint('c', '45');
            gen.genExpresion(t1, t1, '-1', '*');
            gen.genLabel(inicio);
            gen.genAsignacion(t3, 'p');
            gen.genSetStack(t3, '-1');
            gen.genExpresion(t3, t3, '1', '+');
            gen.genLabel(nextPos);
            gen.genIf(t1, '0', '==', nextPrt);
            gen.genCode(`${t2} = fmod(${t1}, 10);`);
            gen.genSetStack(t3, t2);
            gen.genExpresion(t3, t3, '1', '+');
            gen.genExpresion(t1, t1, '10', '/');
            gen.genGoto(nextPos);
            gen.genLabel(nextPrt);
            gen.genExpresion(t3, t3, '1', '-');
            gen.genGetStack(t1, t3);
            gen.genIf(t1, '-1', '==', fin);
            gen.genPrint('i', t1);
            gen.genGoto(nextPrt);
            gen.genLabel(fin);
            gen.genCode('return;');
            gen.genEndFuncion();
            gen.isFunc = '';
            gen.freeTemp(t1);
            gen.freeTemp(t2);
            gen.freeTemp(t3);
        }*/

    nativa_compararIgual_str_str() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let c1 = gen.newTemporal();
        let c2 = gen.newTemporal();
        let lblfalse = gen.newLabel();
        let lbltrue = gen.newLabel();
        let l2 = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_compararIgual_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t0, 'p', '1', '+');
        gen.genGetStack(p1, t0);
        gen.genExpresion(t0, 'p', '2', '+');
        gen.genGetStack(p2, t0);

        gen.genIf(p1, '-1', '==', l2);
        gen.genIf(p2, '-1', '==', lblfalse);
        gen.genGoto(inicio);
        gen.genLabel(l2);
        gen.genIf(p2, '-1', '==', lbltrue);
        gen.genGoto(lblfalse);

        gen.genLabel(inicio);
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);

        gen.genLabel(nextPos);
        gen.genIf(c1, c2, '!=', lblfalse);
        gen.genIf(c1, '-1', '==', lbltrue);
        gen.genExpresion(p1, p1, '1', '+');
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genGoto(nextPos);

        gen.genLabel(lbltrue);
        gen.genSetStack('p', '1');
        gen.genGoto(fin);
        gen.genLabel(lblfalse);
        gen.genSetStack('p', '0');

        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(p1);
        gen.freeTemp(p2);
        gen.freeTemp(c1);
        gen.freeTemp(c2);
    }

    nativa_compararNoIgual_str_str() {
        const gen = GeneradorC3D.getInstancia();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let c1 = gen.newTemporal();
        let c2 = gen.newTemporal();
        let lblfalse = gen.newLabel();
        let lbltrue = gen.newLabel();
        let l2 = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_compararNoIgual_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genIf(p1, '-1', '==', l2);
        gen.genIf(p2, '-1', '==', lbltrue);
        gen.genGoto(inicio);
        gen.genLabel(l2);
        gen.genIf(p2, '-1', '==', lblfalse);
        gen.genGoto(lbltrue);

        gen.genLabel(inicio);
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);

        gen.genLabel(nextPos);
        gen.genIf(c1, c2, '!=', lbltrue);
        gen.genIf(c1, '-1', '==', lblfalse);
        gen.genExpresion(p1, p1, '1', '+');
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genGoto(nextPos);

        gen.genLabel(lbltrue);
        gen.genSetStack('p', '1');
        gen.genGoto(fin);
        gen.genLabel(lblfalse);
        gen.genSetStack('p', '0');

        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
        gen.freeTemp(c1);
        gen.freeTemp(c2);
    }

    nativa_ToUpperCase() {
        const gen = GeneradorC3D.getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let nextPos = gen.newLabel();
        let setChar = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_ToUpperCase');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(t2, t1); // carga la referencia del string
        gen.genAsignacion(t3, 'h');  // inicio de posicion vacia del heap

        gen.genLabel(nextPos);
        gen.genGetHeap(t4, t2);
        gen.genIf(t4, '-1', '==', fin);
        gen.genIf(t4, '97', '<', setChar);
        gen.genIf(t4, '122', '>', setChar);
        gen.genExpresion(t4, t4, '32', '-');

        gen.genLabel(setChar);
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t2, t2, '1', '+');
        gen.genGoto(nextPos);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t3);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
    }

    nativa_ToLowerCase() {
        const gen = GeneradorC3D.getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let nextPos = gen.newLabel();
        let setChar = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_ToLowerCase');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(t2, t1); // carga la referencia del string
        gen.genAsignacion(t3, 'h');  // inicio de posicion vacia del heap

        gen.genLabel(nextPos);
        gen.genGetHeap(t4, t2);
        gen.genIf(t4, '-1', '==', fin);
        gen.genIf(t4, '65', '<', setChar);
        gen.genIf(t4, '90', '>', setChar);
        gen.genExpresion(t4, t4, '32', '+');

        gen.genLabel(setChar);
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t2, t2, '1', '+');
        gen.genGoto(nextPos);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t3);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
    }

    nativa_concat_str_str() {
        const gen = GeneradorC3D.getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t1, 'h');
        gen.genLabel(str1);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', str2);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str1);

        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t1);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }

    nativa_concat_int_str() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_int_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t0, 'h');

        gen.genIf(p1, '0', '>=', inicio);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '-1', '*');

        gen.genLabel(inicio);
        gen.genAsignacion(t1, '0');

        gen.genLabel(nextPos);
        gen.genIf(p1, '0', '==', validar);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${p1}, 10);`);
        //gen.genExpresion(t2, '(int)' + p1, '10', '%');
        gen.genExpresion(t1, t1, t2, '+');
        gen.genExpresion(p1, p1, '10', '/');
        gen.genCode(p1 + ' = (int)' + p1 + ';');
        gen.genGoto(nextPos);

        gen.genLabel(validar);
        gen.genIf(t1, '0', '!=', str1);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();

        gen.genLabel(str1);
        gen.genIf(t1, '0', '==', str2);
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        //gen.genExpresion(t2, '(int)' + t1, '10', '%');
        gen.genExpresion(t2, t2, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(t1 + ' = (int)' + t1 + ';');
        gen.genGoto(str1);

        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);

        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }

    nativa_concat_str_int() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_str_int');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t0, 'h');

        gen.genLabel(str2);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', pre);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str2);

        gen.genLabel(pre);
        gen.genIf(p2, '0', '>=', inicio);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '-1', '*');

        gen.genLabel(inicio);
        gen.genAsignacion(t1, '0');


        gen.genLabel(nextPos);
        gen.genIf(p2, '0', '==', validar);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${p2}, 10);`);
        //gen.genExpresion(t2, '(int)' + p2, '10', '%');
        gen.genExpresion(t1, t1, t2, '+');
        gen.genExpresion(p2, p2, '10', '/');
        gen.genCode(p2 + ' = (int)' + p2 + ';');
        gen.genGoto(nextPos);

        gen.genLabel(validar);
        gen.genIf(t1, '0', '!=', str1);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();

        gen.genLabel(str1);
        gen.genIf(t1, '0', '==', fin);
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        //gen.genExpresion(t2, '(int)' + t1, '10', '%');
        gen.genExpresion(t2, t2, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(t1 + ' = (int)' + t1 + ';');
        gen.genGoto(str1);


        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);

        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }

    nativa_concat_dbl_str() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let strd = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_dbl_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t0, 'h');

        gen.genIf(p1, '0', '>=', pre);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '-1', '*');

        gen.genLabel(pre);
        gen.genCode(`${t1} = (int)${p1};`);
        //gen.genCode(`${t2} = fmod(${p1}, 1);`);
        gen.genAsignacion(t3, '0');

        gen.genLabel(inicio);
        gen.genIf(t1, '0', '==', validar);
        gen.genExpresion(t3, t3, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genExpresion(t3, t3, t2, '+');
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(`${t1} = (int)${t1};`);
        gen.genGoto(inicio);

        gen.genLabel(validar);
        gen.genIf(t3, '0', '!=', nextPos);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();

        gen.genLabel(nextPos);
        gen.genIf(t3, '0', '==', str1);
        gen.genCode(`${t1} = fmod(${t3}, 10);`);
        gen.genExpresion(t3, t3, '10', '/');
        gen.genCode(`${t3} = (int)${t3};`);
        gen.genExpresion(t2, t1, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genGoto(nextPos);

        gen.genLabel(str1);
        gen.genSetHeap('h', '46');
        gen.avanzarHeap();
        gen.genAsignacion(t3, '0');
        gen.genCode(`${t1} = fmod(${p1}, 1);`);

        gen.genLabel(strd);
        gen.genIf(t3, '3', '==', str2);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genCode(`${t2} = (int)${t2};`);
        gen.genExpresion(t4, t2, '48', '+');
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t3, t3, '1', '+');
        gen.genGoto(strd);

        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);

        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }

    nativa_concat_str_dbl() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let sig = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let strd = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_str_dbl');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t0, 'h');

        gen.genLabel(str2);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', sig);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str2);

        gen.genLabel(sig);
        gen.genIf(p2, '0', '>=', pre);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '-1', '*');

        gen.genLabel(pre);
        gen.genCode(`${t1} = (int)${p2};`);
        //gen.genCode(`${t2} = fmod(${p2}, 1);`);
        gen.genAsignacion(t3, '0');

        gen.genLabel(inicio);
        gen.genIf(t1, '0', '==', validar);
        gen.genExpresion(t3, t3, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genExpresion(t3, t3, t2, '+');
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(`${t1} = (int)${t1};`);
        gen.genGoto(inicio);

        gen.genLabel(validar);
        gen.genIf(t3, '0', '!=', nextPos);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();

        gen.genLabel(nextPos);
        gen.genIf(t3, '0', '==', str1);
        gen.genCode(`${t1} = fmod(${t3}, 10);`);
        gen.genExpresion(t3, t3, '10', '/');
        gen.genCode(`${t3} = (int)${t3};`);
        gen.genExpresion(t2, t1, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genGoto(nextPos);

        gen.genLabel(str1);
        gen.genSetHeap('h', '46');
        gen.avanzarHeap();
        gen.genAsignacion(t3, '0');
        gen.genCode(`${t1} = fmod(${p2}, 1);`);

        gen.genLabel(strd);
        gen.genIf(t3, '3', '==', fin);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genCode(`${t2} = (int)${t2};`);
        gen.genExpresion(t4, t2, '48', '+');
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t3, t3, '1', '+');
        gen.genGoto(strd);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);

        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }

    nativa_concat_str_bol() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str1 = gen.newLabel();
        let bol = gen.newLabel();
        let lblf = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_str_bol');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t0, 'h');

        gen.genLabel(str1);
        gen.genGetHeap(t1, p1);
        gen.genIf(t1, '-1', '==', bol);
        gen.genSetHeap('h', t1);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str1);

        gen.genLabel(bol);
        gen.genIf(p2, '1', '!=', lblf);
        gen.genSetHeap('h', '116');
        gen.avanzarHeap();
        gen.genSetHeap('h', '114');
        gen.avanzarHeap();
        gen.genSetHeap('h', '117');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genGoto(fin);
        gen.genLabel(lblf);
        gen.genSetHeap('h', '102');
        gen.avanzarHeap();
        gen.genSetHeap('h', '97');
        gen.avanzarHeap();
        gen.genSetHeap('h', '108');
        gen.avanzarHeap();
        gen.genSetHeap('h', '115');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }

    nativa_concat_bol_str() {
        const gen = GeneradorC3D.getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str2 = gen.newLabel();
        let lblf = gen.newLabel();
        let fin = gen.newLabel();

        gen.genFuncion('nativa_concat_bol_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);

        gen.genAsignacion(t0, 'h');

        gen.genIf(p1, '1', '!=', lblf);
        gen.genSetHeap('h', '116');
        gen.avanzarHeap();
        gen.genSetHeap('h', '114');
        gen.avanzarHeap();
        gen.genSetHeap('h', '117');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genGoto(str2);
        gen.genLabel(lblf);
        gen.genSetHeap('h', '102');
        gen.avanzarHeap();
        gen.genSetHeap('h', '97');
        gen.avanzarHeap();
        gen.genSetHeap('h', '108');
        gen.avanzarHeap();
        gen.genSetHeap('h', '115');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();

        gen.genLabel(str2);
        gen.genGetHeap(t1, p2);
        gen.genIf(t1, '-1', '==', fin);
        gen.genSetHeap('h', t1);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);

        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }



}