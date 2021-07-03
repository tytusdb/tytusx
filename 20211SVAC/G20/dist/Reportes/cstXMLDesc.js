'use strict';

const init = function(e){
    //console.log(localStorage.getItem('cstXML'));
    mostrarCST(localStorage.getItem('cstXMLDesc'));

};

document.addEventListener('DOMContentLoaded', function(){
    init();});