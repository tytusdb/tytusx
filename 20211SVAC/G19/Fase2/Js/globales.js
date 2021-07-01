'use strict';

const init = function(e){


    let btn_cstXML = document.querySelector("#cstXML");

    btn_cstXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/cstXML.html','_blank');
    });

    let btn_cstXMLDesc = document.querySelector("#cstXMLDesc");

    btn_cstXMLDesc.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/cstXMLDesc.html','_blank');
    });

    let btn_errXML = document.querySelector("#erroresXML");

    btn_errXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/erroresXML.html','_blank');
    });

    let btn_tsXML = document.querySelector("#tsXML");

    btn_tsXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/tablaSimbolosXML.html','_blank');
    });

    let btn_rgXML = document.querySelector("#rgXML");

    btn_rgXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/gramaticalXML.html','_blank');
    });

    let btn_rgXMLdesc = document.querySelector("#rgXMLdesc");

    btn_rgXMLdesc.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/gramaticalXMLDesc.html','_blank');
    });

    let btn_astXP = document.querySelector("#astXP");

    btn_astXP.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/astXPATH.html','_blank');
    });

    let btn_astXPDesc = document.querySelector("#astXPDesc");

    btn_astXPDesc.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/astXPATHDesc.html','_blank');
    });

    let btn_astXQ = document.querySelector("#astXQ");

    btn_astXQ.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/astXQUERY.html','_blank');
    });

    let btn_heap = document.querySelector("#heap");

    btn_heap.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./fase2/reportes/heap.html','_blank');
    });

};


document.addEventListener('DOMContentLoaded', function(){
    init();});


    