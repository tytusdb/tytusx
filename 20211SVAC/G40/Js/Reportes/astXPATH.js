'use strict';

const init = function(e){
    mostrarAST(localStorage.getItem('astXPATH'));
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
