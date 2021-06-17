## Gramática XML Ascendente
```
S: INIT EOF         S.val:= INIT.val
;

INIT: VERSION       INIT.val:= VERSION.val
;

VERSION:
  eInicio inter xml version igual CADENA encoding igual FORMATO inter eFin OP   VERSION.val:= CADENA.lexval + FORMATO.lexval + OP.val
;

FORMATO:
    utf             FORMATO.val:= utf.lexval
  | ascii           FORMATO.val:= ascii.lexval
  | iso             FORMATO.val:= iso.lexval
  ;

OP:
   NODOS            OP.val:= NODOS.val
  |                 -
  ;

NODOS: 
    NODOS NODO      NODOS.val:= NODOS1.val + NODO.val
  | NODO            NODOS.val:= NODO.val
  ;

NODO: 
    eInicio ID ATRIBUTOS eFin NODOS eInicio barra ID eFin   NODO.val:= ID1.lexval + NODOS.val + ID2.lexval
  | eInicio ID ATRIBUTOS eFin TEXTO eInicio barra ID eFin   NODO.val:= ID1.lexval + ATRIBUTOS.val + TEXTO.val + ID2.lexval
  | eInicio ID ATRIBUTOS eFin eInicio barra ID eFin         NODO.val:= ID1.lexval + ATRIBUTOS.val + ID2.lexval
  | eInicio ID ATRIBUTOS barra eFin                         NODO.val:= ID1.lexval + ATRIBUTOS.val
  | eInicio ID eFin NODOS eInicio barra ID eFin             NODO.val:= ID1.lexval + NODOS.val + ID2.lexval
  | eInicio ID eFin TEXTO eInicio barra ID eFin             NODO.val:= ID1.lexval + TEXTO.val + ID2.lexval
  | eInicio ID  eFin eInicio barra ID eFin                  NODO.val:= ID1.lexval + ID2.lexval      
  | eInicio ID barra eFin                                   NODO.val:= ID.lexval
  ;

ATRIBUTOS: 
    ATRIBUTOS ATRIBUTO          ATRIBUTOS.val:= ATRIBUTOS1.val + ATRIBUTO.val
  | ATRIBUTO                    ATRIBUTOS.val:= ATRIBUTO.val
  ;

ATRIBUTO: 
    ID igual CADENA             ATRIBUTO.val:= ID.lexval + CADENA.lexval
  | ID igual CHAR               ATRIBUTO.val:= ID.lexval + CADENA.lexval
  ;

TEXTO: 
    TEXTO ID                    TEXTO.val:= TEXTO1.val + ID.lexval
  | TEXTO integer               TEXTO.val:= TEXTO1.val + integer.lexval
  | TEXTO double                TEXTO.val:= TEXTO1.val + double.lexval
  | TEXTO CADENA                TEXTO.val:= TEXTO1.val + CADENA.lexval
  | TEXTO barra                 TEXTO.val:= TEXTO1.val + barra.lexval
  | TEXTO inter                 TEXTO.val:= TEXTO1.val + inter.lexval
  | TEXTO igual                 TEXTO.val:= TEXTO1.val + igual.lexval
  | TEXTO utf                   TEXTO.val:= TEXTO1.val + utf.lexval
  | TEXTO version               TEXTO.val:= TEXTO1.val + version.lexval
  | TEXTO encoding              TEXTO.val:= TEXTO1.val + ENCODING.lexval
  | TEXTO CARACTER              TEXTO.val:= TEXTO1.val + CARACTER.lexval
  | TEXTO mayorque              TEXTO.val:= TEXTO1.val + mayorque.lexval
  | TEXTO menorque              TEXTO.val:= TEXTO1.val + menorque.lexval
  | TEXTO apostrofe             TEXTO.val:= TEXTO1.val + apostrofe.lexval
  | TEXTO comilla               TEXTO.val:= TEXTO1.val + comilla.lexval
  | TEXTO ampersand             TEXTO.val:= TEXTO1.val + ampersand.lexval
  | TEXTO xml                   TEXTO.val:= TEXTO1.val + xml.lexval
  | mayorque                    TEXTO.val:= mayorque.lexval
  | menorque                    TEXTO.val:= menorque.lexval
  | apostrofe                   TEXTO.val:= apostrofe.lexval
  | comilla                     TEXTO.val:= comilla.lexval
  | ampersand                   TEXTO.val:= ampersand.lexval
  | barra                       TEXTO.val:= barra.lexval
  | inter                       TEXTO.val:= inter.lexval
  | igual                       TEXTO.val:= igual.lexval
  | utf                         TEXTO.val:= utf.lexval
  | version                     TEXTO.val:= version.lexval
  | encoding                    TEXTO.val:= encoding.lexval
  | xml                         TEXTO.val:= XML.lexval
  | ID                          TEXTO.val:= ID.lexval
  | integer                     TEXTO.val:= integer.lexval
  | double                      TEXTO.val:= double.lexval
  | CADENA                      TEXTO.val:= CADENA.lexval
  | CARACTER                    TEXTO.val:= CARACTER.lexval
  ;
```
## Gramática XML Descendente
```
S: INIT EOF                             S.val:= INIT.val
;

INIT:
  eInicio inter xml version igual vers encoding igual FORMATO inter eFin NODOS     INIT.val:= vers.lexval + FORMATO.val + NODOS.val
  ;

FORMATO
  : utf                                 FORMATO:= utf.lexval
  | ascii                               FORMATO:= ascii.lexval
  | iso                                 FORMATO:= iso.lexval
  ;

NODOS
  : NODO NODOS                          NODOS.val:= NODO.val + NODOS1.val
  | ;                                   -

NODO
  : eInicio ID CONT                     NODO.val:= ID.lexval + CONT.val 
;

CONT
  : ATRIBUTOS CONT2                     CONT.val:= ATRIBUTOS.val
  | CONT2                               -
  ;

CONT2
  : eFin FINAL                          -
  | barra eFin                          -
  ;

FINAL
  : OPCIONES eInicio barra ID eFin      FINAL.val:= OPCIONES.val + ID.val
  | TEXTO eInicio barra ID eFin         FINAL.val:= TEXTO.val + ID.val
  | eInicio barra ID eFin               FINAL.val:= ID.val
  ;

ATRIBUTOS:  
  ATRIBUTO ATRIBUTOS                    ATRIBUTOS.val:= ATRIBUTO.val + ATRIBUTOS.val
  |ATRIBUTO                             ATRIBUTOS.val:= ATRIBUTO.val
  ;

ATRIBUTO
  : ID igual CADENA                     ATRIBUTO.val:= ID.val + CADENA.val
  | ID igual CHAR                       ATRIBUTO.val:= ID.val + CHAR.val
  ;

OPCIONES
  : OPCIONES NODO                       OPCIONES.val:= OPCIONES1.val + NODO.val
  | NODO                                OPCIONES.val:= NODO.val
  ;

TEXTO:
    PALABRA TEXTO                       TEXTO.val:= PALABRA.val + TEXTO1.val
  | PALABRA                             TEXTO.val:= PALABRA.val
  ;

PALABRA:
    ID                                  PALABRA.val:= ID.lexval
  | integer                             PALABRA.val:= integer.lexval
  | double                              PALABRA.val:= double.lexval
  | CADENA                              PALABRA.val:= CADENA.lexval
  | barra                               PALABRA.val:= barra.lexval
  | inter                               PALABRA.val:= inter.lexval
  | igual                               PALABRA.val:= igual.lexval
  | utf                                 PALABRA.val:= utf.lexval
  | version                             PALABRA.val:= version.lexval
  | encoding                            PALABRA.val:= encoding.lexval
  | xml                                 PALABRA.val:= xml.lexval
  | CARACTER                            PALABRA.val:= CARACTER.lexval
  | mayorque                            PALABRA.val:= mayorque.lexval
  | menorque                            PALABRA.val:= menorque.lexval
  | apostrofe                           PALABRA.val:= apostrofe.lexval
  | comilla                             PALABRA.val:= comilla.lexval
  | ampersand                           PALABRA.val:= ampersand.lexval
;
```
## Gramática Xpath Ascendente
```
S: INICIO EOF							S.val:= INICIO.val
;

INICIO:
	 INICIO diagonal id PREDICADO		INICIO:= INICIO1.val + diagonal.lexval + id.lexval + PREDICADO.lexval
	|diagonal id PREDICADO				INICIO:= diagonal.lexval + id.lexval + PREDICADO.val
	|INICIO diagonal id					INICIO:= INICIO1.lexval + diagonal.lexval + id.lexval
	|diagonal id						INICIO:= diagonal.lexval + id.lexval
	|INICIO diagonal EXPRESION			INICIO:= INICIO1.val + diagonal.lexval + EXPRESION.val
	|diagonal EXPRESION PREDICADO		INICIO:= diagonal.lexval + EXPRESION.val + PREDICADO.val
	|diagonal EXPRESION					INICIO:= diagonal.lexval + EXPRESION.val
	|INICIO diagonal EJES 				INICIO:= INICIO1.val + diagonal.lexval + EJES.val
	|diagonal EJES						INICIO:= diagonal.lexval + EJES.val
	|INICIO dobled id PREDICADO 		INICIO:= dobled.lexval + id.lexval + PREDICADO.val
	|dobled id PREDICADO				INICIO:= INICIO1.val + id.lexval + PREDICADO.val
	|INICIO dobled id					INICIO:= INICIO1.val + dobled.lexval + id.lexval
	|dobled id 							INICIO:= dobled.lexval + id.lexval
	|INICIO dobled EXPRESION 			INICIO:= INICIO.val + dobled.lexval + EXPRESION.val
	|dobled EXPRESION PREDICADO			INICIO:= dobled.lexval + EXPRESION.val + PREDICADO.val
	|dobled EXPRESION 					INICIO:= dobled.lexval + EXPRESION.val
	|INICIO dobled EJES 				INICIO:= INICIO1.val + EJES.val
	|dobled EJES						INICIO:= dobled.val + EJES.val
	|INICIO barra INICIO 				INICIO:= INICIO1.val + barra.lexval + INICIO.val
	|id PREDICADO						INICIO:= id.lexval + PREDICADO.val
	|punto 								INICIO:= punto.lexval
	|doblep 							INICIO:= doblep.lexval
	|INICIO diagonal punto				INICIO:= INICIO1.val diagonal.lexval + punto.lexval
	|INICIO diagonal doblep				INICIO:= INICIO1.val diagonal.lexval + doblep.lexval
	|diagonal punto						INICIO:= diagonal.lexval + punto.lexval
	|diagonal doblep					INICIO:= diagonal.lexval + doblep.lexval
	|INICIO dobled punto				INICIO:= INICIO1.val dobled.lexval + punto.lexval
	|INICIO dobled doblep				INICIO:= INICIO1.val dobled.lexval + doblep.lexval
	|dobled doblep						INICIO:= dobled.lexval + doblep.lexval
	|dobled punto						INICIO:= dobled.lexval + punto.lexval
	;

PREDICADO:
	 PREDICADO corizq EXPRESION corder	PREDICADO.val:= PREDICADO1.val + EXPRESION.val
	|corizq EXPRESION corder 			PREDICADO.val:= EXPRESION.val
	;

EXPRESION:
	 EXPRESION mas EXPRESION		EXPRESION.val:= EXPRESION1.val + mas.lexval + EXPRESION2.val
	|EXPRESION menos EXPRESION		EXPRESION.val:= EXPRESION1.val + menos.lexval + EXPRESION2.val
	|EXPRESION por EXPRESION		EXPRESION.val:= EXPRESION1.val + por.lexval + EXPRESION2.val
	|EXPRESION div EXPRESION		EXPRESION.val:= EXPRESION1.val + div.lexval + EXPRESION2.val
	|EXPRESION mod EXPRESION		EXPRESION.val:= EXPRESION1.val + mod.lexval + EXPRESION2.val
	|EXPRESION or EXPRESION 		EXPRESION.val:= EXPRESION1.val + or.lexval + EXPRESION2.val
	|EXPRESION and EXPRESION 		EXPRESION.val:= EXPRESION1.val + and.lexval + EXPRESION2.val
	|EXPRESION igual EXPRESION 		EXPRESION.val:= EXPRESION1.val + igual.lexval + EXPRESION2.val
	|EXPRESION dif EXPRESION		EXPRESION.val:= EXPRESION1.val + dif.lexval + EXPRESION2.val
	|EXPRESION menor EXPRESION 		EXPRESION.val:= EXPRESION1.val + menor.lexval + EXPRESION2.val
	|EXPRESION mayor EXPRESION		EXPRESION.val:= EXPRESION1.val + mayor.lexval + EXPRESION2.val
	|EXPRESION menori EXPRESION		EXPRESION.val:= EXPRESION1.val + menori.lexval + EXPRESION2.val
	|EXPRESION mayori EXPRESION 	EXPRESION.val:= EXPRESION1.val + mayori.lexval + EXPRESION2.val
	|EXPRESION diagonal EXPRESION 	EXPRESION.val:= EXPRESION1.val + diagonal.lexval + EXPRESION2.val
	|EXPRESION dobled EXPRESION 	EXPRESION.val:= EXPRESION1.val + dobled.lexval + EXPRESION2.val
	|parizq EXPRESION parder		EXPRESION.val:= cadenas.lexval
	|arroba EXPRESION 				EXPRESION.val:= arroba.lexval + EXPRESION1.val
	|por 							EXPRESION.val:= por.lexval
	|FUNCIONES 						EXPRESION.val:= FUNCIONES.val
	|cadena 						EXPRESION.val:= cadena.lexval
	|decimal 						EXPRESION.val:= decimal.lexval
	|entero 						EXPRESION.val:= entero.lexval
	|punto 							EXPRESION.val:= punto.lexval
	|doblep 						EXPRESION.val:= doblep.lexval
	|id 							EXPRESION.val:= id.lexval
	|cadenas 						EXPRESION.val:= cadenas.lexval
	|INICIO 						EXPRESION.val:= INICIO.val
	;

FUNCIONES: FUNCION parizq parder	FUNCIONES:= FUNCION.val
;

FUNCION:		
	 rlast			FUNCION.val:= rlast.lexval
	|rposition		FUNCION.val:= rposition.lexval
	|rnode			FUNCION.val:= rnode.lexval
	|rtext			FUNCION.val:= rtext.lexval
	;

EJES:
	 EJE dospuntos dospuntos CONTENIDO			EJES.val:= EJE.val + CONTENIDO.val
	|EJES EJE dospuntos dospuntos CONTENIDO		EJES.val:= EJES1.val + EJE.val + CONTENIDO.val
	;

EJE:
	 rancestros				EJE.val:= rancestros.lexval
	|rancestro 				EJE.val:= rancestro.lexval
	|ratributo 				EJE.val:= rratributo.lexval
	|rchild					EJE.val:= rchild.lexval
	|rdescenos				EJE.val:= rdescenos.lexval
	|rdescen 				EJE.val:= rdescen.lexval
	|rseguidorh				EJE.val:= rseguidorh.lexval
	|rseguidor 				EJE.val:= rseguidor.lexval
	|rnombres 				EJE.val:= rnombres.lexval
	|rparent				EJE.val:= rparent.lexval
	|rprecedings 			EJE.val:= rprecedings.lexval
	|rpre					EJE.val:= rpre.lexval
  ;

CONTENIDO:
	 id						CONTENIDO.val:= id.lexval
	|id parizq parder		CONTENIDO.val:= id.lexval
	|id PREDICADO			CONTENIDO.val:= id.lexval + PREDICADO.val
	|por					CONTENIDO.val:= por.lexval
	|por diagonal			CONTENIDO.val:= por.lexval diagonal.lexval
	|por dobled				CONTENIDO.val:= por.lexval diagonal.lexval
	|FUNCIONES				FUNCIONES.val:= FUNVIONES.val
	|EXPRESION				CONTENIDO.val:= EXPRESION.val
	;
```

## Gramática Xpath Descendente
```
S: INICIO EOF									S.val:= INICIO.val
;

INICIO:
	 diagonal LDIAGONAL							INICIO.val:= diagonal.lexval + LDIAGONAL.val
	|dobled LDIAGONAL							INICIO.val:= dobled.lexval + LDIAGONAL.val
	|id	LID										INICIO.val:= id.lexval + LID.val
	|punto INICIOP								INICIO.val:= punto.lexval + INICIOP.val
	|doblep INICIOP								INICIO.val:= doblep.lexval + INICIO.val
;

LDIAGONAL:
	 id LID										LDIAGONAL.val:= id.lexval + LID.val
	|EXPRESION LID								LDIAGONAL.val:= EXPRESION.val + INICIOP.val
	|EJES INICIOP								LDIAGONAL.val:= EJES.val + INICIOP.val
	|punto	INICIOP 							LDIAGONAL.val:= punto.lexval + INICIOP.val
	|doblep INICIOP								LDIAGONAL.val:= doblep.lexval + INICIOP.val
;

LID:
	 INICIOP									LID.val:= INICIOP.val
	|PREDICADO INICIOP							LID.val:= PREDICADO.val + INICIOP.val
	;

INICIOP:
	 diagonal LDIAGONAL 						INICIOP.val:= diagonal.lexval + LDIAGONAL.val
	|dobled LDIAGONAL 							INICIOP.val:= dobled.lexval + LDIAGONAL.val
	|barra INICIO INICIOP						INICIOP.val:= INICIO.val + INICIOP.val
	|	;

PREDICADO: corizq EXPRESION corder LPREDICADO	predicado.val:= EXPRESION.VAL + LPREDICADO.val
;

LPREDICADO:
	 corizq EXPRESION corder LPREDICADO		LPREDICADO.val:= EXPRESION.val + LPREDICADO1
	|	;

EXPRESION:
	 parizq EXPRESION parder EXPRESIONP 	EXPRESION.val:= EXPRESION1.val + EXPRESIONP.val
	|arroba EXPRESION EXPRESIONP			EXPRESION.val:= arrobal.lexval + EXPRESION1.val + EXPRESIONP.val
	|por EXPRESIONP							EXPRESION.val:= por.lexval + EXPRESIONP.val
	|FUNCIONES EXPRESIONP					EXPRESION.val:= FUNCIONES.val + EXPRESIONP.val
	|cadena EXPRESIONP						EXPRESION.val:= cadena.lexval + EXPRESIONP.val
	|decimal EXPRESIONP						EXPRESION.val:= decimal.lexval + EXPRESIONP.val
	|entero EXPRESIONP						EXPRESION.val:= entero.lexval + EXPRESIONP.val
	|punto EXPRESIONP						EXPRESION.val:= punto.lexval + EXPRESIONP.val
	|doblep EXPRESIONP						EXPRESION.val:= doblep.lexval + EXPRESIONP.val
	|id EXPRESIONP							EXPRESION.val:= id.lexval + EXPRESIONP.val
	|cadenas EXPRESIONP						EXPRESION.val:= cadenas.lexval + EXPRESIONP.val
	|INICIO EXPRESIONP						EXPRESION.val:= INICIO.val + EXPRESIONP.val
;

EXPRESIONP:
	 mas EXPRESION 	EXPRESIONP		EXPRESIONP.val:= mas.lexval + EXPRESION.val + EXPRESIONP1.val
	|menos EXPRESION EXPRESIONP		EXPRESIONP.val:= menos.lexval + EXPRESION.val + EXPRESIONP1.val
	|por EXPRESION EXPRESIONP		EXPRESIONP.val:= por.lexval + EXPRESION.val + EXPRESIONP1.val
	|div EXPRESION EXPRESIONP		EXPRESIONP.val:= div.lexval + EXPRESION.val + EXPRESIONP1.val
	|mod EXPRESION EXPRESIONP		EXPRESIONP.val:= mod.lexval + EXPRESION.val + EXPRESIONP1.val
	|or EXPRESION EXPRESIONP		EXPRESIONP.val:= or.lexval + EXPRESION.val + EXPRESIONP1.val
	|and EXPRESION EXPRESIONP		EXPRESIONP.val:= and.lexval + EXPRESION.val + EXPRESIONP1.val
	|igual EXPRESION EXPRESIONP		EXPRESIONP.val:= igual.lexval + EXPRESION.val + EXPRESIONP1.val
	|dif EXPRESION EXPRESIONP		EXPRESIONP.val:= dif.lexval + EXPRESION.val + EXPRESIONP1.val
	|menor EXPRESION EXPRESIONP		EXPRESIONP.val:= menor.lexval + EXPRESION.val + EXPRESIONP1.val
	|mayor EXPRESION EXPRESIONP		EXPRESIONP.val:= mayor.lexval + EXPRESION.val + EXPRESIONP1.val
	|menori EXPRESION EXPRESIONP	EXPRESIONP.val:= menori.lexval + EXPRESION.val + EXPRESIONP1.val
	|mayori EXPRESION EXPRESIONP	EXPRESIONP.val:= mayori.lexval + EXPRESION.val + EXPRESIONP1.val
	|diagonal EXPRESION EXPRESIONP	EXPRESIONP.val:= diagonal.lexval + EXPRESION.val + EXPRESIONP1.val
	|dobled EXPRESION EXPRESIONP	EXPRESIONP.val:= dobled.lexval + EXPRESION.val + EXPRESIONP1.val
	| 								-
	;

FUNCIONES: FUNCION parizq parder	FUNCIONES.val:= FUNCION.val 
;

FUNCION:
	 rlast			FUNCION.val:= rlast.lexval
	|rposition		FUNCION.val:= rposition.lexval
	|rnode			FUNCION.val:= rnode.lexval
	|rtext			FUNCION.val:= rtext.lexval
	;

EJES:
	 EJE dospuntos dospuntos CONTENIDO EJESP 	EJES.val:= EJE.val + CONTENIDO.val + EJESP.val
	 ;

EJESP:
	 EJE dospuntos dospuntos CONTENIDO EJESP	EJESP.val:= EJE.val + CONTENIDO.val + EJESP.val
	| 											-
	;

EJE:
	 rancestros			EJE.val:= rancestros.lexval
	|rancestro			EJE.val:= rancestro.lexval
	|ratributo			EJE.val:= ratributo.lexval
	|rchild				EJE.val:= rchild.lexval
	|rdescenos			EJE.val:= rdescenos.lexval
	|rdescen			EJE.val:= rdescen.lexval
	|rseguidorh			EJE.val:= rseguidorh.lexval
	|rseguidor 			EJE.val:= rseguidor.lexval
	|rnombres 			EJE.val:= rnombres.lexval
	|rparent 			EJE.val:= rparent.lexval
	|rprecedings		EJE.val:= rprecedings.lexval
	|rpreceding			EJE.val:= rpreceding.lexval
	|rself				EJE.val:= rself.lexval
	;

CONTENIDO:
	 id LIDCONTENIDO	CONTENIDO.val:= id.lexval CONTENIDO.val
	|por LPORCONTENIDO	CONTENIDO.val:= por.lexval + LPORCONTENIDO.val
	|FUNCIONES			CONTENIDO.val:= FUNCIONES.val
	|EXPRESION			CONTENIDO.val:= EXPRESION.val
	|	;

LIDCONTENIDO:
	 parizq parder		-
	|PREDICADO			LIDCONTENIDO.val:= PREDICADO.val
	|	;

LPORCONTENIDO:
	 diagonal			LPORCONTENIDO.val:= diagonal.lexval;
	| ;
```
