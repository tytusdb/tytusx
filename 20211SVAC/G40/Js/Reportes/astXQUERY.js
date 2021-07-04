'use strict';

const init = function(e){
    mostrarAST(localStorage.getItem('astXQUERY'));
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
