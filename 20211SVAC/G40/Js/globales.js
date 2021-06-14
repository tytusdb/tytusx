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

};


document.addEventListener('DOMContentLoaded', function(){
    init();});


    