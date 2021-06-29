const textoPrueba = `
// Regla 5
t1 = b;
funcionRandom1();
funcionRandom2();
t8 = 4;
funcionRandom1();
funcionRandom2();
t2 = t3 + 1;
b = t1;
t5 = t9;
t9 = t5;

//Regla 6, 7, 8, 9
t5 = t5 + 0;
t7=t7-0;
t9 = t9* 1 ;
t2 = t3 + 3;
t8 = t8 / 1;
`;

consolaC3D.value = textoPrueba;