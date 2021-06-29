/*------HEADER------*/
#include <stdio.h>
#include <math.h>
double heap[30101999];
double stack[30101999];
double P;
double H;
double t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, t23, t24, t25, t26, t27, t28, t29, t30, t31, t32, t33, t34, t35, t36, t37, t38, t39, t40, t41, t42, t43, t44, t45, t46, t47, t48, t49, t50, t51, t52, t53, t54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t66, t67, t68, t69, t70, t71, t72, t73, t74, t75, t76, t77, t78, t79, t80, t81, t82, t83, t84, t85, t86, t87, t88, t89, t90, t91, t92, t93;


	//C3D funcion para comparar strings
void compararStrings() {

	t63 = P + 1;
	t64 = stack[(int)t63];
	t63 = t63 + 1;
	t65 = stack[(int)t63];

	//fin recuperacion de parametros

	t66 = heap[(int)t64];

	if(t66 == 42) goto L7;
	goto L6;
	L7:
goto L11;
	L6:
	t66 = heap[(int)t64];
	t67 = heap[(int)t65];
	if(t66 == t67) goto L8;
	goto L9;

	L8:

	if(t66 != -1) goto L10;
	goto L11;

	L10:
	t64 = t64 + 1;
	t65 = t65 + 1;
	goto L6;

	L9:
	stack[(int)P] = 0;
	return;

	L11:
	stack[(int)P] = 1;
	return;
}

	//C3D funcion para consulta simple
void consultaSimple() {

	//Obteniendo parametros
	t67 = P + 1;
	t68 = stack[(int)t67];
	t67 = t67 + 1;
	t69 = stack[(int)t67];

	//Accediendo al entorno actual
	t70 = heap[(int)t68];
	t71 = 1;
	t72 = t68 + 1;

	//Creacion de array de nuevos entornos
	t73 = H;
	t74 = t73 + 1;
	heap[(int)t73] = t70;
	t75 = t70 + 1;
	H = H + t75;
	t76 = 0;

	//Validacion de tamaño de array entornos
	if (t70 > 0) goto L10;
	goto L11;

	//Etiqueta para recorrer entornos
	L10:
	if (t71 <= t70) goto L12;
	goto L13;

	//Accediendo a tabla
	L12:
	t77 = heap[(int)t72];
	t78 = t77 + 1;
	t79 = heap[(int)t78];
	t80 = heap[(int)t79];
	t81 = 1;
	t82 = t79 + 1;
	//Creacion de nuevo entorno
	t83 = H;
	t84 = t83;
	H = H + 2;
	t85 = heap[(int)t77];
	heap[(int)t84] = t85;
	t84 = t84 + 1;
	t86 = H;
	H = H + 1;
	t87 = 0;

	//Validacion de tamaño de tabla
	if (t80 > 0) goto L14;
	goto L15;

	//Etiqueta para recorrer tabla
	L14:
	if (t81 <= t80) goto L16;
	goto L17;

	//Accediendo a simbolo actual
	L16:
	t88 = heap[(int)t82];
	t89 = t88 + 4;
	t90 = heap[(int)t89];

	//Validacion del tipo de simbolo
	if(t90 == 0) goto L19;
	goto L20;

	L19:
	goto L18;

	L20:
	if (t90 == 1) goto L18;
	goto L21;

	//Enviando parametros a funcion compararStrings
	L18:
	P = P + 3;
	t91 = P + 1;
	stack[(int)t91] = t69;
	t91 = t91 + 1;
	t92 = heap[(int)t88];
	stack[(int)t91] = t92;
	compararStrings();
	t93 = stack[(int)P];
	P = P - 3;

	//Validando si las cadenas nos iguales
	if (t93 == 1) goto L22;
	goto L23;

	//Agregando simbolo a entorno
	L22:
	heap[(int)H] = t88;
	H = H + 1;
	t87 = t87 + 1;

	L23:
	L21:
	t81 = t81 + 1;
	t82 = t82 + 1;
	goto L14;

	//Fin de recorrido de la tabla
	L17:
	heap[(int)t86] = t87;
	heap[(int)t84] = t86;

	//Validacion si hay simbolos en el entorno nuevo
	if (t87 > 0) goto L24;
	goto L25;

	//Agregar nuevo entorno a array de entornos
	L24:
	heap[(int)t74] = t83;
	t74 = t74 + 1;
	t76 = t76 + 1;

	L25:
	L15:
	t71 = t71 + 1;
	t72 = t72 + 1;
	goto L10;

	//Fin recorrido entornos
	L13:
	heap[(int)t73] = t76;
	//Entornos vacios
	L11:
	stack[(int)P] = t73;
	return;
}

/*-----MAIN-----*/
void main() {
	P = 0; H = 0;

	//C3D entorno book
	t0 = H;
	t1 = t0;
	H = H + 2;
	heap[(int)t1] = -1;
	t1 = t1 + 1;
	t2 = H;
	t3 = t2 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t1] = t2;
	stack[(int)0] =  t0;

	//C3D nodo book
	t4 = H;
	t5 = t4;
	H = H + 5;
	t6 = H;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t5] = t6;
	t5 = t5 + 1;
	t7 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t5] = t7;
	t5 = t5 + 1;
	t8 = H;
	t9 = t8 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t5] = t8;
	t5 = t5 + 1;

	t10 = stack[(int)0];
	heap[(int)t5] = t10;
	t5 = t5 + 1;
	heap[(int)t5] = 1;
	stack[(int)1] = t4;

	//C3D atributo a : b
	t11 = H;
	t12 = t11;
	H = H + 3;
	t13 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t12] = t13;
	t12 = t12 + 1;
	t14 = H;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t12] = t14;
	t12 = t12 + 1;
	heap[(int)t12] = 2;
	stack[(int)2] = t11;

	//C3D atributo c : d
	t15 = H;
	t16 = t15;
	H = H + 3;
	t17 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t16] = t17;
	t16 = t16 + 1;
	t18 = H;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t16] = t18;
	t16 = t16 + 1;
	heap[(int)t16] = 2;
	stack[(int)3] = t15;

	//C3D entorno bookstore
	t19 = H;
	t20 = t19;
	H = H + 2;
	heap[(int)t20] = -1;
	t20 = t20 + 1;
	t21 = H;
	t22 = t21 + 1;
	heap[(int)H] = 3;
	H = H + 4;

	t23 = stack[(int)2];
	heap[(int)t22] = t23;
	t22 = t22 + 1;

	t24 = stack[(int)3];
	heap[(int)t22] = t24;
	t22 = t22 + 1;

	t25 = stack[(int)1];
	heap[(int)t22] = t25;
	t22 = t22 + 1;

	heap[(int)t20] = t21;
	stack[(int)4] =  t19;

	//Agregando entorno a childs
	t26 = stack[(int)0];
	t26 = t26 + 0;
	t27 = stack[(int)4];
	heap[(int)t26] = t27;

	//C3D nodo bookstore
	t28 = H;
	t29 = t28;
	H = H + 5;
	t30 = H;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t29] = t30;
	t29 = t29 + 1;
	t31 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t29] = t31;
	t29 = t29 + 1;
	t32 = H;
	t33 = t32 + 1;
	heap[(int)H] = 2;
	H = H + 3;

	t34 = stack[(int)2];
	heap[(int)t33] = t34;
	t33 = t33 + 1;

	t35 = stack[(int)3];
	heap[(int)t33] = t35;
	t33 = t33 + 1;

	heap[(int)t29] = t32;
	t29 = t29 + 1;

	t36 = stack[(int)4];
	heap[(int)t29] = t36;
	t29 = t29 + 1;
	heap[(int)t29] = 1;
	stack[(int)5] = t28;

	//C3D entorno global
	t37 = H;
	t38 = t37;
	H = H + 2;
	heap[(int)t38] = -1;
	t38 = t38 + 1;
	t39 = H;
	t40 = t39 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t41 = stack[(int)5];
	heap[(int)t40] = t41;
	t40 = t40 + 1;

	heap[(int)t38] = t39;
	stack[(int)6] =  t37;

	//C3D consulta tipo  1
	t42 = H;
	t43 = t42;
	H = H + 2;
	heap[(int)t43] = 1;
	t43 = t43 + 1;
	t44 = H;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t43] = t44;
	stack[(int)7] = t42;

	//C3D Arreglo de consultas
	t45 = H;
	t46 = t45 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t47 = stack[(int)7];
	heap[(int)t46] = t47;
	t46 = t46 + 1;
	stack[(int)8] = t45;

	//C3D Arreglo de entornos inicial
	t48 = H;
	t49 = t48 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t50 = stack[(int)6];
	heap[(int)t49] = t50;
	t49 = t49 + 1;
	stack[(int)9] = t48;

	//C3D para recorrer cosultas
	t51 = stack[(int)6];
	t52 = heap[(int)t51];
	t53 = 1;
	t54 = t51 + 1;
	t55 = stack[(int)7];

printf("%f", (float)t52);
	if (t52 > 0) goto L0;
	goto L1;

	L0:
	if (t53 <= t52) goto L2;
	goto L3;

	L2:
	t56 = heap[(int)t54];
	t57 = heap[(int)t56];
	t58 = t56 + 1;
	t59 = heap[(int)t58];

	if (t57 == 1) goto L4;
	goto L5;

	L4:
	P = P + 10;
	t60 = P + 1;
	stack[(int)t60] = t55;
	t60 = t60 + 1;
	stack[(int)t60] = t59;
	consultaSimple();
	t61 = stack[(int)P];
	P = P - 10;
t1 = t61 + 5;
	t2 = heap[(int)t1];
	t3 = t2 + 5;
	t4 = heap[(int)t3];
	while ((int)t4 != -1) {
	    printf("%c", (char)t4);
	    t3++;
	    t4 = heap[(int)t3];
	}
printf("\n");

	t55 = t61;
	L5:
	L3:
	L1:
for (int i = 0; i < 100; i++) {
	    t5 = heap[(int)i];
	    printf("%d\t\t- %f\n", i, (float)t5);
	}
	printf("\n");
	for (int i = 0; i < 25; i++) {
	    t5 = stack[(int)i];
	    printf("%d\t\t- %f\n", i, (float)t5);
	}
	return;
}