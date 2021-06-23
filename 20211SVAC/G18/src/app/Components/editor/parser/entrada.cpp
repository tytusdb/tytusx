 function ackermann( m:number,  n:number):number {
      
             let cuatro:number = ackermann(m - 1, 1);
            return cuatro;
        
}
console.log(ackermann(3,8)); //2045 se tardo 6 segundos
