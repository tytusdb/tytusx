'use strict';

const init = function(e){


    let btn_cstXML = document.querySelector("#cstXML");

    btn_cstXML.addEventListener('click', function(){     
        //window.document.location = './reportes/cstXML.html';
        window.open('./reportes/cstXML.html','_blank');
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

};


document.addEventListener('DOMContentLoaded', function(){
    init();});


    