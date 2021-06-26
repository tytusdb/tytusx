'use strict';

const init = function(e){
    mostrarAST(localStorage.getItem('astXPATHDesc'));
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
