'use strict';

const init = function(e){
    //console.log(localStorage.getItem('cstXML'));
    mostrarCST(localStorage.getItem('cstXML'));

};

document.addEventListener('DOMContentLoaded', function(){
    init();});
