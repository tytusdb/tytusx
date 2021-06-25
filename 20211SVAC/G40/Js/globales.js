'use strict';

const init = function(e){


    let btn_cstXML = document.querySelector("#cstXML");

    btn_cstXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/cstXML.html','_blank');
    });

    let btn_cstXMLDesc = document.querySelector("#cstXMLDesc");

    btn_cstXMLDesc.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/cstXMLDesc.html','_blank');
    });

    let btn_errXML = document.querySelector("#erroresXML");

    btn_errXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/erroresXML.html','_blank');
    });

    let btn_tsXML = document.querySelector("#tsXML");

    btn_tsXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/tablaSimbolosXML.html','_blank');
    });

    let btn_rgXML = document.querySelector("#rgXML");

    btn_rgXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/gramaticalXML.html','_blank');
    });

    let btn_rgXMLdesc = document.querySelector("#rgXMLdesc");

    btn_rgXMLdesc.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/gramaticalXMLDesc.html','_blank');
    });

    let btn_astXP = document.querySelector("#astXP");

    btn_astXP.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/astXPATH.html','_blank');
    });

    let btn_astXPDesc = document.querySelector("#astXPDesc");

    btn_astXPDesc.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/astXPATHDesc.html','_blank');
    });

    let btn_astXQ = document.querySelector("#astXQ");

    btn_astXQ.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/astXQUERY.html','_blank');
    });

    let btn_heap = document.querySelector("#heap");

    btn_heap.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/heap.html','_blank');
    });

    let btn_stack = document.querySelector("#stack");

    btn_stack.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/stack.html','_blank');
    });

    let btn_opC3D = document.querySelector("#opC3D");

    btn_opC3D.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/optimizaciones.html','_blank');
    });

};


document.addEventListener('DOMContentLoaded', function(){
    init();});


    