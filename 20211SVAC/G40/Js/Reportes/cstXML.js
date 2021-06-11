'use strict';

const init = function(e){
    mostrarCST(localStorage.getItem('cstXML'));
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
