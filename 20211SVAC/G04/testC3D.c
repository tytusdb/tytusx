/*------HEADER------*/
#include <stdio.h>
#include <math.h>
double heap[30101999];
double stack[30101999];
double P;
double H;
double t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21, t22, t23, t24, t25, t26, t27, t28, t29, t30, t31, t32, t33, t34, t35, t36, t37, t38, t39, t40, t41, t42, t43, t44, t45, t46, t47, t48, t49, t50, t51, t52, t53, t54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t66, t67, t68, t69, t70, t71, t72, t73, t74, t75, t76, t77, t78, t79, t80, t81, t82, t83, t84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t100, t101, t102, t103, t104, t105, t106, t107, t108, t109, t110, t111, t112, t113, t114, t115, t116, t117, t118, t119, t120, t121, t122, t123, t124, t125, t126, t127, t128, t129, t130, t131, t132, t133, t134, t135, t136, t137, t138, t139, t140, t141, t142, t143, t144, t145, t146, t147, t148, t149, t150, t151, t152, t153, t154, t155, t156, t157, t158, t159, t160, t161, t162, t163, t164, t165, t166, t167, t168, t169, t170, t171, t172, t173, t174, t175, t176, t177, t178, t179, t180, t181, t182, t183, t184, t185, t186, t187, t188, t189, t190, t191, t192, t193, t194, t195, t196, t197, t198, t199, t200, t201, t202, t203, t204, t205, t206, t207, t208, t209, t210, t211, t212, t213, t214, t215, t216, t217, t218, t219, t220, t221, t222, t223, t224, t225, t226, t227, t228, t229, t230, t231, t232, t233, t234, t235, t236, t237, t238, t239, t240, t241, t242, t243, t244, t245, t246, t247, t248, t249, t250, t251, t252, t253, t254, t255, t256, t257, t258, t259, t260, t261, t262, t263, t264, t265, t266, t267, t268, t269, t270, t271, t272, t273, t274, t275, t276, t277, t278, t279, t280, t281, t282, t283, t284, t285, t286, t287, t288, t289, t290, t291, t292, t293, t294, t295, t296, t297, t298, t299, t300, t301, t302, t303, t304, t305, t306, t307, t308, t309, t310, t311, t312, t313, t314, t315, t316, t317, t318, t319, t320, t321, t322, t323, t324, t325, t326, t327, t328, t329, t330, t331, t332, t333, t334, t335, t336, t337, t338, t339, t340, t341, t342, t343, t344, t345, t346, t347, t348, t349, t350, t351, t352, t353, t354, t355, t356, t357, t358, t359, t360, t361, t362, t363, t364, t365, t366, t367, t368, t369, t370, t371, t372, t373, t374, t375, t376, t377, t378, t379, t380, t381, t382, t383, t384, t385, t386, t387, t388, t389, t390, t391, t392, t393, t394, t395, t396, t397, t398, t399, t400, t401, t402, t403, t404, t405, t406, t407, t408, t409, t410, t411, t412, t413, t414, t415, t416, t417, t418, t419, t420, t421, t422, t423, t424, t425, t426, t427, t428, t429, t430, t431, t432, t433, t434, t435, t436, t437, t438, t439, t440, t441, t442, t443, t444, t445, t446, t447, t448, t449, t450, t451, t452, t453, t454, t455, t456, t457, t458, t459, t460, t461, t462, t463, t464, t465, t466, t467, t468, t469, t470, t471, t472, t473, t474, t475, t476, t477, t478, t479, t480, t481, t482, t483, t484, t485, t486, t487, t488, t489, t490, t491, t492, t493, t494, t495, t496, t497, t498, t499, t500, t501, t502, t503, t504, t505, t506, t507, t508, t509, t510, t511, t512, t513, t514, t515, t516, t517, t518, t519, t520, t521, t522, t523, t524, t525, t526, t527, t528, t529, t530, t531, t532, t533, t534, t535, t536, t537, t538, t539, t540, t541, t542, t543, t544, t545, t546, t547, t548, t549, t550, t551, t552, t553, t554, t555, t556, t557, t558, t559, t560, t561, t562, t563, t564, t565, t566, t567, t568, t569, t570, t571, t572, t573, t574, t575, t576, t577, t578, t579, t580, t581, t582, t583, t584, t585, t586, t587, t588, t589, t590, t591, t592, t593, t594, t595, t596, t597, t598, t599, t600, t601, t602, t603, t604, t605, t606, t607, t608, t609, t610, t611, t612, t613, t614, t615, t616, t617, t618, t619, t620, t621, t622, t623, t624, t625, t626, t627, t628, t629, t630, t631, t632, t633, t634, t635, t636, t637, t638, t639, t640, t641, t642, t643, t644, t645, t646, t647, t648, t649, t650, t651, t652, t653, t654, t655, t656, t657, t658, t659, t660, t661, t662, t663, t664, t665, t666, t667, t668, t669, t670, t671, t672, t673, t674, t675, t676, t677, t678, t679, t680, t681, t682, t683, t684, t685, t686, t687, t688, t689, t690, t691, t692, t693, t694, t695, t696, t697, t698, t699, t700, t701, t702, t703, t704, t705, t706, t707, t708, t709, t710, t711, t712, t713, t714, t715, t716, t717, t718, t719, t720, t721, t722, t723, t724, t725, t726, t727, t728, t729, t730, t731, t732, t733, t734, t735, t736, t737, t738, t739, t740, t741, t742, t743, t744, t745, t746, t747, t748, t749, t750, t751, t752, t753, t754, t755, t756, t757, t758, t759, t760, t761, t762, t763, t764, t765, t766, t767, t768, t769, t770, t771, t772, t773, t774, t775, t776, t777, t778, t779, t780, t781, t782, t783, t784, t785, t786, t787, t788, t789, t790, t791, t792, t793, t794, t795, t796, t797, t798, t799, t800, t801, t802, t803, t804, t805, t806, t807, t808, t809, t810, t811, t812, t813, t814, t815, t816, t817, t818, t819, t820, t821, t822, t823, t824, t825, t826, t827, t828, t829, t830, t831, t832, t833, t834, t835, t836, t837, t838, t839, t840, t841, t842, t843, t844, t845, t846, t847, t848, t849, t850, t851, t852, t853, t854, t855, t856, t857, t858, t859, t860, t861, t862, t863, t864, t865, t866, t867, t868, t869, t870, t871, t872, t873, t874, t875, t876, t877, t878, t879, t880, t881, t882, t883, t884, t885, t886, t887, t888, t889, t890, t891, t892, t893, t894, t895, t896, t897, t898, t899, t900, t901, t902, t903, t904, t905, t906, t907, t908, t909, t910, t911, t912, t913, t914, t915, t916, t917, t918, t919, t920, t921, t922, t923, t924, t925, t926, t927, t928, t929, t930, t931, t932, t933, t934, t935, t936, t937, t938, t939, t940, t941, t942, t943, t944, t945, t946, t947, t948, t949, t950, t951, t952, t953, t954, t955, t956, t957, t958, t959, t960, t961, t962, t963, t964, t965, t966, t967, t968, t969, t970, t971, t972, t973, t974, t975, t976, t977, t978, t979, t980, t981, t982, t983, t984, t985, t986, t987, t988, t989, t990, t991, t992, t993, t994, t995, t996, t997, t998, t999, t1000, t1001, t1002, t1003, t1004, t1005, t1006, t1007, t1008, t1009, t1010, t1011, t1012, t1013, t1014, t1015, t1016, t1017, t1018, t1019, t1020, t1021, t1022, t1023, t1024, t1025, t1026, t1027, t1028, t1029, t1030, t1031, t1032, t1033, t1034, t1035, t1036, t1037, t1038, t1039, t1040, t1041, t1042, t1043, t1044, t1045, t1046, t1047, t1048, t1049, t1050, t1051, t1052, t1053, t1054, t1055, t1056, t1057, t1058, t1059, t1060, t1061, t1062, t1063, t1064, t1065, t1066, t1067, t1068, t1069, t1070, t1071, t1072, t1073, t1074, t1075, t1076, t1077, t1078, t1079, t1080, t1081, t1082, t1083, t1084, t1085, t1086, t1087, t1088, t1089, t1090, t1091, t1092, t1093, t1094, t1095, t1096, t1097, t1098, t1099, t1100, t1101, t1102, t1103, t1104, t1105, t1106, t1107, t1108, t1109, t1110, t1111, t1112, t1113, t1114, t1115, t1116, t1117, t1118, t1119, t1120, t1121, t1122, t1123, t1124, t1125, t1126, t1127, t1128, t1129, t1130, t1131, t1132, t1133, t1134, t1135, t1136, t1137, t1138, t1139, t1140, t1141, t1142, t1143, t1144, t1145, t1146, t1147, t1148, t1149, t1150, t1151, t1152, t1153, t1154, t1155, t1156, t1157, t1158, t1159, t1160, t1161, t1162, t1163, t1164, t1165, t1166, t1167, t1168, t1169, t1170, t1171, t1172, t1173, t1174, t1175, t1176;


	//C3D funcion para comparar strings
void compararStrings() {

	t1046 = P + 1;
	t1047 = stack[(int)t1046];
	t1046 = t1046 + 1;
	t1048 = stack[(int)t1046];

	//fin recuperacion de parametros

	t1049 = heap[(int)t1047];

	if(t1049 == 42) goto L1;
	goto L0;
	L1:
goto L5;
	L0:
	t1049 = heap[(int)t1047];
	t1050 = heap[(int)t1048];
	if(t1049 == t1050) goto L2;
	goto L3;

	L2:

	if(t1049 != -1) goto L4;
	goto L5;

	L4:
	t1047 = t1047 + 1;
	t1048 = t1048 + 1;
	goto L0;

	L3:
	stack[(int)P] = 0;
	return;

	L5:
	stack[(int)P] = 1;
	return;
}

	//C3D funcion para consulta simple
void consultaSimple() {

	//Obteniendo parametros
	t1050 = P + 1;
	t1051 = stack[(int)t1050];
	t1050 = t1050 + 1;
	t1052 = stack[(int)t1050];

	//Accediendo al entorno actual
	t1053 = heap[(int)t1051];
	t1054 = 1;
	t1055 = t1051 + 1;

	//Creacion de array de nuevos entornos
	t1056 = H;
	t1057 = t1056 + 1;
	heap[(int)t1056] = t1053;
	t1058 = t1053 + 1;
	H = H + t1058;
	t1059 = 0;

	//Validacion de tamaño de array entornos
	if (t1053 > 0) goto L4;
	goto L5;

	//Etiqueta para recorrer entornos
	L4:
	if (t1054 <= t1053) goto L6;
	goto L7;

	//Accediendo a tabla
	L6:
	t1060 = heap[(int)t1055];
	t1061 = t1060 + 1;
	t1062 = heap[(int)t1061];
	t1063 = heap[(int)t1062];
	t1064 = 1;
	t1065 = t1062 + 1;
	//Creacion de nuevo entorno
	t1066 = H;
	t1067 = t1066;
	H = H + 2;
	t1068 = heap[(int)t1060];
	heap[(int)t1067] = t1068;
	t1067 = t1067 + 1;
	t1069 = H;
	H = H + 1;
	t1070 = 0;

	//Validacion de tamaño de tabla
	if (t1063 > 0) goto L8;
	goto L9;

	//Etiqueta para recorrer tabla
	L8:
	if (t1064 <= t1063) goto L10;
	goto L11;

	//Accediendo a simbolo actual
	L10:
	t1071 = heap[(int)t1065];
	t1072 = t1071 + 2;
	t1073 = heap[(int)t1072];

	//Validacion del tipo de simbolo
	if(t1073 == 0) goto L13;
	goto L14;

	L13:
	goto L12;

	L14:
	if (t1073 == 1) goto L12;
	goto L15;

	//Enviando parametros a funcion compararStrings
	L12:
	P = P + 3;
	t1074 = P + 1;
	stack[(int)t1074] = t1052;
	t1074 = t1074 + 1;
	t1075 = heap[(int)t1071];
	stack[(int)t1074] = t1075;
	compararStrings();
	t1076 = stack[(int)P];
	P = P - 3;

	//Validando si las cadenas nos iguales
	if (t1076 == 1) goto L16;
	goto L17;

	//Agregando simbolo a entorno
	L16:
	heap[(int)H] = t1071;
	H = H + 1;
	t1070 = t1070 + 1;

	L17:
	L15:
	t1064 = t1064 + 1;
	t1065 = t1065 + 1;
	goto L8;

	//Fin de recorrido de la tabla
	L11:
	heap[(int)t1069] = t1070;
	heap[(int)t1067] = t1069;

	//Validacion si hay simbolos en el entorno nuevo
	if (t1070 > 0) goto L18;
	goto L19;

	//Agregar nuevo entorno a array de entornos
	L18:
	heap[(int)t1057] = t1066;
	t1057 = t1057 + 1;
	t1059 = t1059 + 1;

	L19:
	L9:
	t1054 = t1054 + 1;
	t1055 = t1055 + 1;
	goto L4;

	//Fin recorrido entornos
	L7:
	heap[(int)t1056] = t1059;
	//Entornos vacios
	L5:
	stack[(int)P] = t1056;
	return;
}
void entornosHijos() {

	//Recuperando array de entornos
	t1077 = P + 1;
	t1078 = stack[(int)t1077];
	//Accediendo al entorno actual
	t1079 = heap[(int)t1078];
	t1080 = 1;
	t1081 = t1078 + 1;

	//Creacion de array de nuevos entornos
	t1082 = H;
	H = H + 1;
	t1083 = 0;
	//Validacion de tamaño de array entornos
	if (t1079 > 0) goto L20;
	goto L21;

	//Etiqueta para recorrer entornos
	L20:
	if (t1080 <= t1079) goto L22;
	goto L23;

	L22:
	t1084 = heap[(int)t1081];
	t1085 = t1084 + 1;
	t1086 = heap[(int)t1085];
	t1087 = heap[(int)t1086];
	t1088 = 1;
	t1089 = t1086 + 1;
	//Validando tamaño de tabla
	if (t1087 > 0) goto L24;
	goto L25;
	//Validando iterador con tamaño
	L24:
	if (t1088 <= t1087) goto L26;
	goto L27;
	//Obteniendo tipo de simbolo
	L26:
	t1090 = heap[(int)t1089];
	t1091 = t1090 + 2;
	t1092 = heap[(int)t1091];
	//Validando el tipo de simbolo
	if (t1092 == 0) goto L28;
	goto L29;
	L28:
	goto L30;
	L29:
	if (t1092 == 1) goto L30;
	goto L31;
	//Obteniendo entorno y agregangolo a nuevos entornos
	L30:
	t1093 = t1090 + 4;
	t1094 = heap[(int)t1093];
	heap[(int)H] = t1094;
	H = H + 1;
	t1083 = t1083 + 1;
	L31:
	t1088 = t1088 + 1;
	t1089 = t1089 + 1;
	goto L24;
	L27:
	L25:
	t1080 = t1080 + 1;
	t1081 = t1081 + 1;
	goto L20;
	L23:
	heap[(int)t1082] = t1083;
	L21:
	stack[(int)P] = t1082;
	return;
}

//C3D para recorrer cosultas
void recorrerConsultas() {

	//Recuperando parametros
	t1093 = P + 1;
	t1094 = stack[(int)t1093];
	t1093 = t1093 + 1;
	t1095 = stack[(int)t1093];

	//Obteniendo tamaño de consultas
	t1096 = heap[(int)t1094];
	t1097 = 1;
	t1098 = t1094 + 1;
	//Validando tamaño de array consultas
	if (t1096 > 0) goto L32;
	goto L33;

	//Recorrer consultas
	L32:
	if (t1097 <= t1096) goto L34;
	goto L35;

	//Accediendo a primera consulta
	L34:
	t1099 = heap[(int)t1098];
	t1100 = heap[(int)t1099];
	t1101 = t1099 + 1;
	t1102 = heap[(int)t1101];

	//Validando tipo de consulta
	if (t1100 == 1) goto L36;
	goto L37;

	//Enviando parametros a consultaSmple()
	L36:
	P = P + 3;
	t1103 = P + 1;
	stack[(int)t1103] = t1095;
	t1103 = t1103 + 1;
	stack[(int)t1103] = t1102;
	consultaSimple();
	t1104 = stack[(int)P];
	P = P - 3;
	t1095 = t1104;
	L37:
	//Generando array de entornos de hijos
	P = P + 3;
	t1105 = P + 1;
	stack[(int)t1105] = t1095;
	entornosHijos();
	t1106 = stack[(int)P];
	P = P - 3;
	t1097 = t1097 + 1;
	t1098 = t1098 + 1;
	if (t1097 <= t1096) goto L38;
	goto L39;

	L38:
	t1107 = heap[(int)t1098];
	t1108 = heap[(int)t1107];
	//Validando tipo de consulta
	if (t1108 == 1) goto L40;
	goto L41;

	L40:
	t1095 = t1106;
	L41:
	L39:
	goto L32;
	L35:
	L33:
	stack[(int)P] = t1095;
	return;
}
void printString() {

	//Recuperando referencia a string
	t1109 = P + 1;
	t1110 = stack[(int)t1109];
	t1111 = heap[(int)t1110];
	//Validando fin de cadena
	L42:
	if (t1111 != -1) goto L43;
	goto L44;
	//Imprimir caracter actual
	L43:
	printf("%c", (char)t1111);
	t1110 = t1110 + 1;
	t1111 = heap[(int)t1110];
	goto L42;
	//Fin impresion de id
	L44:
	return;
}
void printAttribs() {


	//Recuperando referencia a atributos
	t1112 = P + 1;
	t1113 = stack[(int)t1112];

	//Tamaño de atributos;
	t1114 = heap[(int)t1113];
	t1115 = 1;
	t1116 = t1113 + 1;

	//Validando tamaño;
	if (t1114 > 0) goto L45;
	goto L46;
	L45:
	if (t1115 <= t1114) goto L47;
	goto L48;
	L47:
	t1117 = heap[(int)t1116];
	t1118 = heap[(int)t1117];

	//Imprimiendo nombre parametro
	printf("%c", (char)32);
	P = P + 2;
	t1119 = P + 1;
	stack[(int)t1119] = t1118;
	printString();
	t1120 = stack[(int)P];
	P = P - 2;
	printf("%c", (char)61);

	//Imprimiendo valor parametro
	printf("%c", (char)34);
	t1121 = t1117 + 1;
	t1122 = heap[(int)t1121];
	P = P + 2;
	t1123 = P + 1;
	stack[(int)t1123] = t1122;
	printString();
	t1124 = stack[(int)P];
	P = P - 2;
	printf("%c", (char)34);

	//Aumentando iterador y atributo
	t1115 = t1115 + 1;
	t1116 = t1116 + 1;
	goto L45;
	;
	;
	L48:
	L46:
	stack[(int)P] = 33333;
	return;
}
void toTag() {

	//Recuperando simbolo
	t1125 = P + 1;
	t1126 = stack[(int)t1125];

	//Obteniendo tipo de simbolo
	t1127 = t1126 + 2;
	t1128 = heap[(int)t1127];

	//Validando tipo de simbolo
	if (t1128 == 1) goto L47;
	goto L48;

	//Impresion de etiqueta de apertura
	L47:
	printf("%c", (char)60);
	t1129 = heap[(int)t1126];
	double temp = t1129;

	//Imprimiendo id simbolo
	P = P + 2;
	t1130 = P + 1;
	stack[(int)t1130] = t1129;
	printString();
	t1131 = stack[(int)P];
	P = P - 2;

	//Imprimiendo atributos
	P = P + 2;
	t1132 = P + 1;
	t1133 = t1126 + 3;
	t1134 = heap[(int)t1133];
	stack[(int)t1132] = t1134;
	printAttribs();
	t1135 = stack[(int)P];
	P = P - 2;
	printf("%c", (char)62);

	//Imprimiendo texto de etiqueta
	P = P + 2;
	t1136 = P + 1;
	t1137 = t1126 + 1;
	t1138 = heap[(int)t1137];
	stack[(int)t1136] = t1138;
	printString();
	t1139 = stack[(int)P];
	P = P - 2;

	//Imprimiendo hijos
	t1140 = t1126 + 4;
	t1141 = heap[(int)t1140];
	t1142 = t1141 + 1;
	t1143 = heap[(int)t1142];
	double t1144 = heap[(int)t1143];
	double t1145 = 1;
	double t1146 = t1143 + 1;
	//Validando tamaño de tabla
	if (t1144 > 0) goto L49;
	goto L50;
	//Validando iterador con tamaño
	L49:
	if (t1145 <= t1144) goto L51;
	goto L52;
	//Obteniendo tipo de simbolo
	L51:
	t1147 = heap[(int)t1146];
	t1148 = t1147 + 2;
	t1149 = heap[(int)t1148];
	//Validando el tipo de simbolo
	if (t1149 == 0) goto L53;
	goto L54;
	L53:
	goto L55;
	L54:
	if (t1149 == 1) goto L55;
	goto L56;
	//Enviando simbolo a funcion toTag
	L55:
	P = P + 2;
	t1150 = P + 1;
	stack[(int)t1150] = t1147;
	toTag();
	t1151 = stack[(int)P];
	P = P - 2;
	//No es un nodo
	L56:
	t1145 = t1145 + 1;
	t1146 = t1146 + 1;
	goto L49;
	//Fin recorrido de tabla
	L52:
	L50:

	//Impresion de etiqueta de cierre
	printf("%c", (char)60);
	printf("%c", (char)47);

	//Imprimiendo id simbolo
	P = P + 2;
	t1152 = P + 1;
	stack[(int)t1152] = temp;
	printString();
	t1153 = stack[(int)P];
	P = P - 2;
	printf("%c", (char)62);
	printf("\n");
	goto L57;

	//Etiqueta autocerrada
	L48:
	printf("%c", (char)60);
	t1154 = heap[(int)t1126];

	//Imprimiendo id simbolo
	P = P + 2;
	t1155 = P + 1;
	stack[(int)t1155] = t1154;
	printString();
	t1156 = stack[(int)P];
	P = P - 2;

	//Imprimiendo atributos
	P = P + 2;
	t1157 = P + 1;
	t1158 = t1126 + 3;
	t1159 = heap[(int)t1158];
	stack[(int)t1157] = t1159;
	printAttribs();
	t1160 = stack[(int)P];
	P = P - 2;
	printf("%c", (char)47);
	printf("%c", (char)62);
	L57:
	stack[(int)P] = 22222;
	return;
}
void imprimirResultado() {

	//Recuperando array de entornos
	t1161 = P + 1;
	t1162 = stack[(int)t1161];
	//Obteniendo informacion del array de entorno
	t1163 = heap[(int)t1162];
	t1164 = 1;
	t1165 = t1162 + 1;
	//Validando tamaño de array de entornos
	if (t1163 > 0) goto L58;
	goto L59;
	//Validando iterador
	L58:
	if (t1164 <= t1163) goto L60;
	goto L61;
	L60:
	t1166 = heap[(int)t1165];
	t1167 = t1166 + 1;
	t1168 = heap[(int)t1167];
	t1169 = heap[(int)t1168];
	t1170 = 1;
	t1171 = t1168 + 1;
	//Validando tamaño de tabla
	if (t1169 > 0) goto L62;
	goto L63;
	//Validando iterador con tamaño
	L62:
	if (t1170 <= t1169) goto L64;
	goto L65;
	//Obteniendo tipo de simbolo
	L64:
	t1172 = heap[(int)t1171];
	t1173 = t1172 + 2;
	t1174 = heap[(int)t1173];
	//Validando el tipo de simbolo
	if (t1174 == 0) goto L66;
	goto L67;
	L66:
	goto L68;
	L67:
	if (t1174 == 1) goto L68;
	goto L69;
	//Enviando simbolo a funcion toTag
	L68:
	P = P + 2;
	t1175 = P + 1;
	stack[(int)t1175] = t1172;
	toTag();
	t1176 = stack[(int)P];
	P = P - 2;
	//No es un nodo
	L69:
	t1170 = t1170 + 1;
	t1171 = t1171 + 1;
	goto L62;
	//Fin recorrido de tabla
	L65:
	L63:
	t1164 = t1164 + 1;
	t1165 = t1165 + 1;
	goto L58;
	//Fin recorrido entornos
	L61:
	L59:
	stack[(int)P] = 11111;
	return;
}

/*-----MAIN-----*/
void main() {
	P = 0; H = 0;

	//C3D atributo lang : en
	t0 = H;
	t1 = t0;
	H = H + 3;
	t2 = H;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t1] = t2;
	t1 = t1 + 1;
	t3 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t1] = t3;
	t1 = t1 + 1;
	heap[(int)t1] = 2;
	stack[(int)0] = t0;

	//C3D entorno title
	t4 = H;
	t5 = t4;
	H = H + 2;
	heap[(int)t5] = -1;
	t5 = t5 + 1;
	t6 = H;
	t7 = t6 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t8 = stack[(int)0];
	heap[(int)t7] = t8;
	t7 = t7 + 1;

	heap[(int)t5] = t6;
	stack[(int)1] =  t4;

	//C3D nodo title
	t9 = H;
	t10 = t9;
	H = H + 5;
	t11 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t10] = t11;
	t10 = t10 + 1;
	t12 = H;
	heap[(int)H] = 34;
	H = H + 1;
	heap[(int)H] = 69;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 73;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 34;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t10] = t12;
	t10 = t10 + 1;
	heap[(int)t10] = 1;
	t10 = t10 + 1;
	t13 = H;
	t14 = t13 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t15 = stack[(int)0];
	heap[(int)t14] = t15;
	t14 = t14 + 1;

	heap[(int)t10] = t13;
	t10 = t10 + 1;

	t16 = stack[(int)1];
	heap[(int)t10] = t16;
	stack[(int)2] = t9;

	//C3D entorno author
	t17 = H;
	t18 = t17;
	H = H + 2;
	heap[(int)t18] = -1;
	t18 = t18 + 1;
	t19 = H;
	t20 = t19 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t18] = t19;
	stack[(int)3] =  t17;

	//C3D nodo author
	t21 = H;
	t22 = t21;
	H = H + 5;
	t23 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t22] = t23;
	t22 = t22 + 1;
	t24 = H;
	heap[(int)H] = 39;
	H = H + 1;
	heap[(int)H] = 71;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 68;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 76;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 39;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t22] = t24;
	t22 = t22 + 1;
	heap[(int)t22] = 1;
	t22 = t22 + 1;
	t25 = H;
	t26 = t25 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t22] = t25;
	t22 = t22 + 1;

	t27 = stack[(int)3];
	heap[(int)t22] = t27;
	stack[(int)4] = t21;

	//C3D entorno year
	t28 = H;
	t29 = t28;
	H = H + 2;
	heap[(int)t29] = -1;
	t29 = t29 + 1;
	t30 = H;
	t31 = t30 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t29] = t30;
	stack[(int)5] =  t28;

	//C3D nodo year
	t32 = H;
	t33 = t32;
	H = H + 5;
	t34 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t33] = t34;
	t33 = t33 + 1;
	t35 = H;
	heap[(int)H] = 60;
	H = H + 1;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = 62;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t33] = t35;
	t33 = t33 + 1;
	heap[(int)t33] = 1;
	t33 = t33 + 1;
	t36 = H;
	t37 = t36 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t33] = t36;
	t33 = t33 + 1;

	t38 = stack[(int)5];
	heap[(int)t33] = t38;
	stack[(int)6] = t32;

	//C3D entorno price
	t39 = H;
	t40 = t39;
	H = H + 2;
	heap[(int)t40] = -1;
	t40 = t40 + 1;
	t41 = H;
	t42 = t41 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t40] = t41;
	stack[(int)7] =  t39;

	//C3D nodo price
	t43 = H;
	t44 = t43;
	H = H + 5;
	t45 = H;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t44] = t45;
	t44 = t44 + 1;
	t46 = H;
	heap[(int)H] = 38;
	H = H + 1;
	heap[(int)H] = 51;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 46;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 38;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t44] = t46;
	t44 = t44 + 1;
	heap[(int)t44] = 1;
	t44 = t44 + 1;
	t47 = H;
	t48 = t47 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t44] = t47;
	t44 = t44 + 1;

	t49 = stack[(int)7];
	heap[(int)t44] = t49;
	stack[(int)8] = t43;

	//C3D entorno book
	t50 = H;
	t51 = t50;
	H = H + 2;
	heap[(int)t51] = -1;
	t51 = t51 + 1;
	t52 = H;
	t53 = t52 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t51] = t52;
	stack[(int)9] =  t50;

	//C3D nodo book
	t54 = H;
	t55 = t54;
	H = H + 5;
	t56 = H;
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
	heap[(int)t55] = t56;
	t55 = t55 + 1;
	t57 = H;
	heap[(int)H] = 66;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t55] = t57;
	t55 = t55 + 1;
	heap[(int)t55] = 1;
	t55 = t55 + 1;
	t58 = H;
	t59 = t58 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t55] = t58;
	t55 = t55 + 1;

	t60 = stack[(int)9];
	heap[(int)t55] = t60;
	stack[(int)10] = t54;

	//C3D entorno book
	t61 = H;
	t62 = t61;
	H = H + 2;
	heap[(int)t62] = -1;
	t62 = t62 + 1;
	t63 = H;
	t64 = t63 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t62] = t63;
	stack[(int)11] =  t61;

	//C3D nodo book
	t65 = H;
	t66 = t65;
	H = H + 5;
	t67 = H;
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
	heap[(int)t66] = t67;
	t66 = t66 + 1;
	t68 = H;
	heap[(int)H] = 66;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t66] = t68;
	t66 = t66 + 1;
	heap[(int)t66] = 1;
	t66 = t66 + 1;
	t69 = H;
	t70 = t69 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t66] = t69;
	t66 = t66 + 1;

	t71 = stack[(int)11];
	heap[(int)t66] = t71;
	stack[(int)12] = t65;

	//C3D atributo lang : en
	t72 = H;
	t73 = t72;
	H = H + 3;
	t74 = H;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t73] = t74;
	t73 = t73 + 1;
	t75 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t73] = t75;
	t73 = t73 + 1;
	heap[(int)t73] = 2;
	stack[(int)13] = t72;

	//C3D entorno title
	t76 = H;
	t77 = t76;
	H = H + 2;
	heap[(int)t77] = -1;
	t77 = t77 + 1;
	t78 = H;
	t79 = t78 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t80 = stack[(int)13];
	heap[(int)t79] = t80;
	t79 = t79 + 1;

	heap[(int)t77] = t78;
	stack[(int)14] =  t76;

	//C3D nodo title
	t81 = H;
	t82 = t81;
	H = H + 5;
	t83 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t82] = t83;
	t82 = t82 + 1;
	t84 = H;
	heap[(int)H] = 72;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 80;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t82] = t84;
	t82 = t82 + 1;
	heap[(int)t82] = 1;
	t82 = t82 + 1;
	t85 = H;
	t86 = t85 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t87 = stack[(int)13];
	heap[(int)t86] = t87;
	t86 = t86 + 1;

	heap[(int)t82] = t85;
	t82 = t82 + 1;

	t88 = stack[(int)14];
	heap[(int)t82] = t88;
	stack[(int)15] = t81;

	//C3D entorno author
	t89 = H;
	t90 = t89;
	H = H + 2;
	heap[(int)t90] = -1;
	t90 = t90 + 1;
	t91 = H;
	t92 = t91 + 1;
	heap[(int)H] = 2;
	H = H + 3;

	t93 = stack[(int)10];
	heap[(int)t92] = t93;
	t92 = t92 + 1;

	t94 = stack[(int)12];
	heap[(int)t92] = t94;
	t92 = t92 + 1;

	heap[(int)t90] = t91;
	stack[(int)16] =  t89;

	//Agregando entorno a childs
	t95 = stack[(int)9];
	t95 = t95 + 0;
	t96 = stack[(int)16];
	heap[(int)t95] = t96;
	t97 = stack[(int)11];
	t97 = t97 + 0;
	t98 = stack[(int)16];
	heap[(int)t97] = t98;

	//C3D nodo author
	t99 = H;
	t100 = t99;
	H = H + 5;
	t101 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t100] = t101;
	t100 = t100 + 1;
	t102 = H;
	heap[(int)H] = 74;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 75;
	H = H + 1;
	heap[(int)H] = 46;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 82;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 119;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t100] = t102;
	t100 = t100 + 1;
	heap[(int)t100] = 1;
	t100 = t100 + 1;
	t103 = H;
	t104 = t103 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t100] = t103;
	t100 = t100 + 1;

	t105 = stack[(int)16];
	heap[(int)t100] = t105;
	stack[(int)17] = t99;

	//C3D entorno year
	t106 = H;
	t107 = t106;
	H = H + 2;
	heap[(int)t107] = -1;
	t107 = t107 + 1;
	t108 = H;
	t109 = t108 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t107] = t108;
	stack[(int)18] =  t106;

	//C3D nodo year
	t110 = H;
	t111 = t110;
	H = H + 5;
	t112 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t111] = t112;
	t111 = t111 + 1;
	t113 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t111] = t113;
	t111 = t111 + 1;
	heap[(int)t111] = 1;
	t111 = t111 + 1;
	t114 = H;
	t115 = t114 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t111] = t114;
	t111 = t111 + 1;

	t116 = stack[(int)18];
	heap[(int)t111] = t116;
	stack[(int)19] = t110;

	//C3D atributo category : cat en price
	t117 = H;
	t118 = t117;
	H = H + 3;
	t119 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t118] = t119;
	t118 = t118 + 1;
	t120 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t118] = t120;
	t118 = t118 + 1;
	heap[(int)t118] = 2;
	stack[(int)20] = t117;

	//C3D entorno price
	t121 = H;
	t122 = t121;
	H = H + 2;
	heap[(int)t122] = -1;
	t122 = t122 + 1;
	t123 = H;
	t124 = t123 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t125 = stack[(int)20];
	heap[(int)t124] = t125;
	t124 = t124 + 1;

	heap[(int)t122] = t123;
	stack[(int)21] =  t121;

	//C3D nodo price
	t126 = H;
	t127 = t126;
	H = H + 5;
	t128 = H;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t127] = t128;
	t127 = t127 + 1;
	t129 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = 46;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t127] = t129;
	t127 = t127 + 1;
	heap[(int)t127] = 1;
	t127 = t127 + 1;
	t130 = H;
	t131 = t130 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t132 = stack[(int)20];
	heap[(int)t131] = t132;
	t131 = t131 + 1;

	heap[(int)t127] = t130;
	t127 = t127 + 1;

	t133 = stack[(int)21];
	heap[(int)t127] = t133;
	stack[(int)22] = t126;

	//C3D atributo lang : en
	t134 = H;
	t135 = t134;
	H = H + 3;
	t136 = H;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t135] = t136;
	t135 = t135 + 1;
	t137 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t135] = t137;
	t135 = t135 + 1;
	heap[(int)t135] = 2;
	stack[(int)23] = t134;

	//C3D entorno title
	t138 = H;
	t139 = t138;
	H = H + 2;
	heap[(int)t139] = -1;
	t139 = t139 + 1;
	t140 = H;
	t141 = t140 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t142 = stack[(int)23];
	heap[(int)t141] = t142;
	t141 = t141 + 1;

	heap[(int)t139] = t140;
	stack[(int)24] =  t138;

	//C3D nodo title
	t143 = H;
	t144 = t143;
	H = H + 5;
	t145 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t144] = t145;
	t144 = t144 + 1;
	t146 = H;
	heap[(int)H] = 88;
	H = H + 1;
	heap[(int)H] = 81;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 75;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 83;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t144] = t146;
	t144 = t144 + 1;
	heap[(int)t144] = 1;
	t144 = t144 + 1;
	t147 = H;
	t148 = t147 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t149 = stack[(int)23];
	heap[(int)t148] = t149;
	t148 = t148 + 1;

	heap[(int)t144] = t147;
	t144 = t144 + 1;

	t150 = stack[(int)24];
	heap[(int)t144] = t150;
	stack[(int)25] = t143;

	//C3D entorno author
	t151 = H;
	t152 = t151;
	H = H + 2;
	heap[(int)t152] = -1;
	t152 = t152 + 1;
	t153 = H;
	t154 = t153 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t152] = t153;
	stack[(int)26] =  t151;

	//C3D nodo author
	t155 = H;
	t156 = t155;
	H = H + 5;
	t157 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t156] = t157;
	t156 = t156 + 1;
	t158 = H;
	heap[(int)H] = 74;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 77;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 71;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t156] = t158;
	t156 = t156 + 1;
	heap[(int)t156] = 1;
	t156 = t156 + 1;
	t159 = H;
	t160 = t159 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t156] = t159;
	t156 = t156 + 1;

	t161 = stack[(int)26];
	heap[(int)t156] = t161;
	stack[(int)27] = t155;

	//C3D entorno author
	t162 = H;
	t163 = t162;
	H = H + 2;
	heap[(int)t163] = -1;
	t163 = t163 + 1;
	t164 = H;
	t165 = t164 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t163] = t164;
	stack[(int)28] =  t162;

	//C3D nodo author
	t166 = H;
	t167 = t166;
	H = H + 5;
	t168 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t167] = t168;
	t167 = t167 + 1;
	t169 = H;
	heap[(int)H] = 80;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 66;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t167] = t169;
	t167 = t167 + 1;
	heap[(int)t167] = 1;
	t167 = t167 + 1;
	t170 = H;
	t171 = t170 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t167] = t170;
	t167 = t167 + 1;

	t172 = stack[(int)28];
	heap[(int)t167] = t172;
	stack[(int)29] = t166;

	//C3D entorno author
	t173 = H;
	t174 = t173;
	H = H + 2;
	heap[(int)t174] = -1;
	t174 = t174 + 1;
	t175 = H;
	t176 = t175 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t174] = t175;
	stack[(int)30] =  t173;

	//C3D nodo author
	t177 = H;
	t178 = t177;
	H = H + 5;
	t179 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t178] = t179;
	t178 = t178 + 1;
	t180 = H;
	heap[(int)H] = 75;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 67;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t178] = t180;
	t178 = t178 + 1;
	heap[(int)t178] = 1;
	t178 = t178 + 1;
	t181 = H;
	t182 = t181 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t178] = t181;
	t178 = t178 + 1;

	t183 = stack[(int)30];
	heap[(int)t178] = t183;
	stack[(int)31] = t177;

	//C3D entorno author
	t184 = H;
	t185 = t184;
	H = H + 2;
	heap[(int)t185] = -1;
	t185 = t185 + 1;
	t186 = H;
	t187 = t186 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t185] = t186;
	stack[(int)32] =  t184;

	//C3D nodo author
	t188 = H;
	t189 = t188;
	H = H + 5;
	t190 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t189] = t190;
	t189 = t189 + 1;
	t191 = H;
	heap[(int)H] = 74;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 76;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t189] = t191;
	t189 = t189 + 1;
	heap[(int)t189] = 1;
	t189 = t189 + 1;
	t192 = H;
	t193 = t192 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t189] = t192;
	t189 = t189 + 1;

	t194 = stack[(int)32];
	heap[(int)t189] = t194;
	stack[(int)33] = t188;

	//C3D entorno author
	t195 = H;
	t196 = t195;
	H = H + 2;
	heap[(int)t196] = -1;
	t196 = t196 + 1;
	t197 = H;
	t198 = t197 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t196] = t197;
	stack[(int)34] =  t195;

	//C3D nodo author
	t199 = H;
	t200 = t199;
	H = H + 5;
	t201 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t200] = t201;
	t200 = t200 + 1;
	t202 = H;
	heap[(int)H] = 86;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 78;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 106;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t200] = t202;
	t200 = t200 + 1;
	heap[(int)t200] = 1;
	t200 = t200 + 1;
	t203 = H;
	t204 = t203 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t200] = t203;
	t200 = t200 + 1;

	t205 = stack[(int)34];
	heap[(int)t200] = t205;
	stack[(int)35] = t199;

	//C3D entorno year
	t206 = H;
	t207 = t206;
	H = H + 2;
	heap[(int)t207] = -1;
	t207 = t207 + 1;
	t208 = H;
	t209 = t208 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t207] = t208;
	stack[(int)36] =  t206;

	//C3D nodo year
	t210 = H;
	t211 = t210;
	H = H + 5;
	t212 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t211] = t212;
	t211 = t211 + 1;
	t213 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 51;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t211] = t213;
	t211 = t211 + 1;
	heap[(int)t211] = 1;
	t211 = t211 + 1;
	t214 = H;
	t215 = t214 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t211] = t214;
	t211 = t211 + 1;

	t216 = stack[(int)36];
	heap[(int)t211] = t216;
	stack[(int)37] = t210;

	//C3D entorno price
	t217 = H;
	t218 = t217;
	H = H + 2;
	heap[(int)t218] = -1;
	t218 = t218 + 1;
	t219 = H;
	t220 = t219 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t218] = t219;
	stack[(int)38] =  t217;

	//C3D nodo price
	t221 = H;
	t222 = t221;
	H = H + 5;
	t223 = H;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t222] = t223;
	t222 = t222 + 1;
	t224 = H;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = 46;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t222] = t224;
	t222 = t222 + 1;
	heap[(int)t222] = 1;
	t222 = t222 + 1;
	t225 = H;
	t226 = t225 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t222] = t225;
	t222 = t222 + 1;

	t227 = stack[(int)38];
	heap[(int)t222] = t227;
	stack[(int)39] = t221;

	//C3D atributo lang : en
	t228 = H;
	t229 = t228;
	H = H + 3;
	t230 = H;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t229] = t230;
	t229 = t229 + 1;
	t231 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t229] = t231;
	t229 = t229 + 1;
	heap[(int)t229] = 2;
	stack[(int)40] = t228;

	//C3D entorno title
	t232 = H;
	t233 = t232;
	H = H + 2;
	heap[(int)t233] = -1;
	t233 = t233 + 1;
	t234 = H;
	t235 = t234 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t236 = stack[(int)40];
	heap[(int)t235] = t236;
	t235 = t235 + 1;

	heap[(int)t233] = t234;
	stack[(int)41] =  t232;

	//C3D nodo title
	t237 = H;
	t238 = t237;
	H = H + 5;
	t239 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t238] = t239;
	t238 = t238 + 1;
	t240 = H;
	heap[(int)H] = 76;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 88;
	H = H + 1;
	heap[(int)H] = 77;
	H = H + 1;
	heap[(int)H] = 76;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t238] = t240;
	t238 = t238 + 1;
	heap[(int)t238] = 1;
	t238 = t238 + 1;
	t241 = H;
	t242 = t241 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t243 = stack[(int)40];
	heap[(int)t242] = t243;
	t242 = t242 + 1;

	heap[(int)t238] = t241;
	t238 = t238 + 1;

	t244 = stack[(int)41];
	heap[(int)t238] = t244;
	stack[(int)42] = t237;

	//C3D entorno author
	t245 = H;
	t246 = t245;
	H = H + 2;
	heap[(int)t246] = -1;
	t246 = t246 + 1;
	t247 = H;
	t248 = t247 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t246] = t247;
	stack[(int)43] =  t245;

	//C3D nodo author
	t249 = H;
	t250 = t249;
	H = H + 5;
	t251 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t250] = t251;
	t250 = t250 + 1;
	t252 = H;
	heap[(int)H] = 69;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 84;
	H = H + 1;
	heap[(int)H] = 46;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 82;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t250] = t252;
	t250 = t250 + 1;
	heap[(int)t250] = 1;
	t250 = t250 + 1;
	t253 = H;
	t254 = t253 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t250] = t253;
	t250 = t250 + 1;

	t255 = stack[(int)43];
	heap[(int)t250] = t255;
	stack[(int)44] = t249;

	//C3D entorno year
	t256 = H;
	t257 = t256;
	H = H + 2;
	heap[(int)t257] = -1;
	t257 = t257 + 1;
	t258 = H;
	t259 = t258 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t257] = t258;
	stack[(int)45] =  t256;

	//C3D nodo year
	t260 = H;
	t261 = t260;
	H = H + 5;
	t262 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t261] = t262;
	t261 = t261 + 1;
	t263 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 51;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t261] = t263;
	t261 = t261 + 1;
	heap[(int)t261] = 1;
	t261 = t261 + 1;
	t264 = H;
	t265 = t264 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t261] = t264;
	t261 = t261 + 1;

	t266 = stack[(int)45];
	heap[(int)t261] = t266;
	stack[(int)46] = t260;

	//C3D entorno price
	t267 = H;
	t268 = t267;
	H = H + 2;
	heap[(int)t268] = -1;
	t268 = t268 + 1;
	t269 = H;
	t270 = t269 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t268] = t269;
	stack[(int)47] =  t267;

	//C3D nodo price
	t271 = H;
	t272 = t271;
	H = H + 5;
	t273 = H;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t272] = t273;
	t272 = t272 + 1;
	t274 = H;
	heap[(int)H] = 51;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = 46;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t272] = t274;
	t272 = t272 + 1;
	heap[(int)t272] = 1;
	t272 = t272 + 1;
	t275 = H;
	t276 = t275 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t272] = t275;
	t272 = t272 + 1;

	t277 = stack[(int)47];
	heap[(int)t272] = t277;
	stack[(int)48] = t271;

	//C3D entorno title
	t278 = H;
	t279 = t278;
	H = H + 2;
	heap[(int)t279] = -1;
	t279 = t279 + 1;
	t280 = H;
	t281 = t280 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t279] = t280;
	stack[(int)49] =  t278;

	//C3D nodo title
	t282 = H;
	t283 = t282;
	H = H + 5;
	t284 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t283] = t284;
	t283 = t283 + 1;
	t285 = H;
	heap[(int)H] = 82;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t283] = t285;
	t283 = t283 + 1;
	heap[(int)t283] = 1;
	t283 = t283 + 1;
	t286 = H;
	t287 = t286 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t283] = t286;
	t283 = t283 + 1;

	t288 = stack[(int)49];
	heap[(int)t283] = t288;
	stack[(int)50] = t282;

	//C3D entorno edicion
	t289 = H;
	t290 = t289;
	H = H + 2;
	heap[(int)t290] = -1;
	t290 = t290 + 1;
	t291 = H;
	t292 = t291 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t290] = t291;
	stack[(int)51] =  t289;

	//C3D nodo edicion
	t293 = H;
	t294 = t293;
	H = H + 5;
	t295 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t294] = t295;
	t294 = t294 + 1;
	t296 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 51;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t294] = t296;
	t294 = t294 + 1;
	heap[(int)t294] = 1;
	t294 = t294 + 1;
	t297 = H;
	t298 = t297 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t294] = t297;
	t294 = t294 + 1;

	t299 = stack[(int)51];
	heap[(int)t294] = t299;
	stack[(int)52] = t293;

	//C3D entorno author
	t300 = H;
	t301 = t300;
	H = H + 2;
	heap[(int)t301] = -1;
	t301 = t301 + 1;
	t302 = H;
	t303 = t302 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t301] = t302;
	stack[(int)53] =  t300;

	//C3D nodo author
	t304 = H;
	t305 = t304;
	H = H + 5;
	t306 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t305] = t306;
	t305 = t305 + 1;
	t307 = H;
	heap[(int)H] = 74;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t305] = t307;
	t305 = t305 + 1;
	heap[(int)t305] = 1;
	t305 = t305 + 1;
	t308 = H;
	t309 = t308 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t305] = t308;
	t305 = t305 + 1;

	t310 = stack[(int)53];
	heap[(int)t305] = t310;
	stack[(int)54] = t304;

	//C3D entorno author
	t311 = H;
	t312 = t311;
	H = H + 2;
	heap[(int)t312] = -1;
	t312 = t312 + 1;
	t313 = H;
	t314 = t313 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t312] = t313;
	stack[(int)55] =  t311;

	//C3D nodo author
	t315 = H;
	t316 = t315;
	H = H + 5;
	t317 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t316] = t317;
	t316 = t316 + 1;
	t318 = H;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 65;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t316] = t318;
	t316 = t316 + 1;
	heap[(int)t316] = 1;
	t316 = t316 + 1;
	t319 = H;
	t320 = t319 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t316] = t319;
	t316 = t316 + 1;

	t321 = stack[(int)55];
	heap[(int)t316] = t321;
	stack[(int)56] = t315;

	//C3D atributo year : 2005
	t322 = H;
	t323 = t322;
	H = H + 3;
	t324 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t323] = t324;
	t323 = t323 + 1;
	t325 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t323] = t325;
	t323 = t323 + 1;
	heap[(int)t323] = 2;
	stack[(int)57] = t322;

	//C3D entorno fechaPublicacion
	t326 = H;
	t327 = t326;
	H = H + 2;
	heap[(int)t327] = -1;
	t327 = t327 + 1;
	t328 = H;
	t329 = t328 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t330 = stack[(int)57];
	heap[(int)t329] = t330;
	t329 = t329 + 1;

	heap[(int)t327] = t328;
	stack[(int)58] =  t326;

	//C3D nodo fechaPublicacion
	t331 = H;
	t332 = t331;
	H = H + 5;
	t333 = H;
	heap[(int)H] = 102;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 80;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t332] = t333;
	t332 = t332 + 1;
	t334 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t332] = t334;
	t332 = t332 + 1;
	heap[(int)t332] = 0;
	t332 = t332 + 1;
	t335 = H;
	t336 = t335 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t337 = stack[(int)57];
	heap[(int)t336] = t337;
	t336 = t336 + 1;

	heap[(int)t332] = t335;
	t332 = t332 + 1;

	t338 = stack[(int)58];
	heap[(int)t332] = t338;
	stack[(int)59] = t331;

	//C3D entorno title
	t339 = H;
	t340 = t339;
	H = H + 2;
	heap[(int)t340] = -1;
	t340 = t340 + 1;
	t341 = H;
	t342 = t341 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t340] = t341;
	stack[(int)60] =  t339;

	//C3D nodo title
	t343 = H;
	t344 = t343;
	H = H + 5;
	t345 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t344] = t345;
	t344 = t344 + 1;
	t346 = H;
	heap[(int)H] = 82;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t344] = t346;
	t344 = t344 + 1;
	heap[(int)t344] = 1;
	t344 = t344 + 1;
	t347 = H;
	t348 = t347 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t344] = t347;
	t344 = t344 + 1;

	t349 = stack[(int)60];
	heap[(int)t344] = t349;
	stack[(int)61] = t343;

	//C3D entorno edicion
	t350 = H;
	t351 = t350;
	H = H + 2;
	heap[(int)t351] = -1;
	t351 = t351 + 1;
	t352 = H;
	t353 = t352 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t351] = t352;
	stack[(int)62] =  t350;

	//C3D nodo edicion
	t354 = H;
	t355 = t354;
	H = H + 5;
	t356 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t355] = t356;
	t355 = t355 + 1;
	t357 = H;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t355] = t357;
	t355 = t355 + 1;
	heap[(int)t355] = 1;
	t355 = t355 + 1;
	t358 = H;
	t359 = t358 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t355] = t358;
	t355 = t355 + 1;

	t360 = stack[(int)62];
	heap[(int)t355] = t360;
	stack[(int)63] = t354;

	//C3D entorno author
	t361 = H;
	t362 = t361;
	H = H + 2;
	heap[(int)t362] = -1;
	t362 = t362 + 1;
	t363 = H;
	t364 = t363 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t362] = t363;
	stack[(int)64] =  t361;

	//C3D nodo author
	t365 = H;
	t366 = t365;
	H = H + 5;
	t367 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t366] = t367;
	t366 = t366 + 1;
	t368 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t366] = t368;
	t366 = t366 + 1;
	heap[(int)t366] = 1;
	t366 = t366 + 1;
	t369 = H;
	t370 = t369 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t366] = t369;
	t366 = t366 + 1;

	t371 = stack[(int)64];
	heap[(int)t366] = t371;
	stack[(int)65] = t365;

	//C3D atributo year : 2006
	t372 = H;
	t373 = t372;
	H = H + 3;
	t374 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t373] = t374;
	t373 = t373 + 1;
	t375 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 54;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t373] = t375;
	t373 = t373 + 1;
	heap[(int)t373] = 2;
	stack[(int)66] = t372;

	//C3D entorno fechaPublicacion
	t376 = H;
	t377 = t376;
	H = H + 2;
	heap[(int)t377] = -1;
	t377 = t377 + 1;
	t378 = H;
	t379 = t378 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t380 = stack[(int)66];
	heap[(int)t379] = t380;
	t379 = t379 + 1;

	heap[(int)t377] = t378;
	stack[(int)67] =  t376;

	//C3D nodo fechaPublicacion
	t381 = H;
	t382 = t381;
	H = H + 5;
	t383 = H;
	heap[(int)H] = 102;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 80;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t382] = t383;
	t382 = t382 + 1;
	t384 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t382] = t384;
	t382 = t382 + 1;
	heap[(int)t382] = 0;
	t382 = t382 + 1;
	t385 = H;
	t386 = t385 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t387 = stack[(int)66];
	heap[(int)t386] = t387;
	t386 = t386 + 1;

	heap[(int)t382] = t385;
	t382 = t382 + 1;

	t388 = stack[(int)67];
	heap[(int)t382] = t388;
	stack[(int)68] = t381;

	//C3D entorno title
	t389 = H;
	t390 = t389;
	H = H + 2;
	heap[(int)t390] = -1;
	t390 = t390 + 1;
	t391 = H;
	t392 = t391 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t390] = t391;
	stack[(int)69] =  t389;

	//C3D nodo title
	t393 = H;
	t394 = t393;
	H = H + 5;
	t395 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t394] = t395;
	t394 = t394 + 1;
	t396 = H;
	heap[(int)H] = 82;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 51;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t394] = t396;
	t394 = t394 + 1;
	heap[(int)t394] = 1;
	t394 = t394 + 1;
	t397 = H;
	t398 = t397 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t394] = t397;
	t394 = t394 + 1;

	t399 = stack[(int)69];
	heap[(int)t394] = t399;
	stack[(int)70] = t393;

	//C3D entorno edicion
	t400 = H;
	t401 = t400;
	H = H + 2;
	heap[(int)t401] = -1;
	t401 = t401 + 1;
	t402 = H;
	t403 = t402 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t401] = t402;
	stack[(int)71] =  t400;

	//C3D nodo edicion
	t404 = H;
	t405 = t404;
	H = H + 5;
	t406 = H;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t405] = t406;
	t405 = t405 + 1;
	t407 = H;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t405] = t407;
	t405 = t405 + 1;
	heap[(int)t405] = 1;
	t405 = t405 + 1;
	t408 = H;
	t409 = t408 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t405] = t408;
	t405 = t405 + 1;

	t410 = stack[(int)71];
	heap[(int)t405] = t410;
	stack[(int)72] = t404;

	//C3D entorno author
	t411 = H;
	t412 = t411;
	H = H + 2;
	heap[(int)t412] = -1;
	t412 = t412 + 1;
	t413 = H;
	t414 = t413 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t412] = t413;
	stack[(int)73] =  t411;

	//C3D nodo author
	t415 = H;
	t416 = t415;
	H = H + 5;
	t417 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t416] = t417;
	t416 = t416 + 1;
	t418 = H;
	heap[(int)H] = 74;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t416] = t418;
	t416 = t416 + 1;
	heap[(int)t416] = 1;
	t416 = t416 + 1;
	t419 = H;
	t420 = t419 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t416] = t419;
	t416 = t416 + 1;

	t421 = stack[(int)73];
	heap[(int)t416] = t421;
	stack[(int)74] = t415;

	//C3D entorno author
	t422 = H;
	t423 = t422;
	H = H + 2;
	heap[(int)t423] = -1;
	t423 = t423 + 1;
	t424 = H;
	t425 = t424 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t423] = t424;
	stack[(int)75] =  t422;

	//C3D nodo author
	t426 = H;
	t427 = t426;
	H = H + 5;
	t428 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t427] = t428;
	t427 = t427 + 1;
	t429 = H;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 65;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t427] = t429;
	t427 = t427 + 1;
	heap[(int)t427] = 1;
	t427 = t427 + 1;
	t430 = H;
	t431 = t430 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t427] = t430;
	t427 = t427 + 1;

	t432 = stack[(int)75];
	heap[(int)t427] = t432;
	stack[(int)76] = t426;

	//C3D atributo year : 2010
	t433 = H;
	t434 = t433;
	H = H + 3;
	t435 = H;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t434] = t435;
	t434 = t434 + 1;
	t436 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t434] = t436;
	t434 = t434 + 1;
	heap[(int)t434] = 2;
	stack[(int)77] = t433;

	//C3D entorno fechaPublicacion
	t437 = H;
	t438 = t437;
	H = H + 2;
	heap[(int)t438] = -1;
	t438 = t438 + 1;
	t439 = H;
	t440 = t439 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t441 = stack[(int)77];
	heap[(int)t440] = t441;
	t440 = t440 + 1;

	heap[(int)t438] = t439;
	stack[(int)78] =  t437;

	//C3D nodo fechaPublicacion
	t442 = H;
	t443 = t442;
	H = H + 5;
	t444 = H;
	heap[(int)H] = 102;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 80;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t443] = t444;
	t443 = t443 + 1;
	t445 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t443] = t445;
	t443 = t443 + 1;
	heap[(int)t443] = 0;
	t443 = t443 + 1;
	t446 = H;
	t447 = t446 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t448 = stack[(int)77];
	heap[(int)t447] = t448;
	t447 = t447 + 1;

	heap[(int)t443] = t446;
	t443 = t443 + 1;

	t449 = stack[(int)78];
	heap[(int)t443] = t449;
	stack[(int)79] = t442;

	//C3D entorno nombre
	t450 = H;
	t451 = t450;
	H = H + 2;
	heap[(int)t451] = -1;
	t451 = t451 + 1;
	t452 = H;
	t453 = t452 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t451] = t452;
	stack[(int)80] =  t450;

	//C3D nodo nombre
	t454 = H;
	t455 = t454;
	H = H + 5;
	t456 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t455] = t456;
	t455 = t455 + 1;
	t457 = H;
	heap[(int)H] = 77;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t455] = t457;
	t455 = t455 + 1;
	heap[(int)t455] = 1;
	t455 = t455 + 1;
	t458 = H;
	t459 = t458 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t455] = t458;
	t455 = t455 + 1;

	t460 = stack[(int)80];
	heap[(int)t455] = t460;
	stack[(int)81] = t454;

	//C3D atributo atrib : 456
	t461 = H;
	t462 = t461;
	H = H + 3;
	t463 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t462] = t463;
	t462 = t462 + 1;
	t464 = H;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = 54;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t462] = t464;
	t462 = t462 + 1;
	heap[(int)t462] = 2;
	stack[(int)82] = t461;

	//C3D entorno nose
	t465 = H;
	t466 = t465;
	H = H + 2;
	heap[(int)t466] = -1;
	t466 = t466 + 1;
	t467 = H;
	t468 = t467 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t469 = stack[(int)82];
	heap[(int)t468] = t469;
	t468 = t468 + 1;

	heap[(int)t466] = t467;
	stack[(int)83] =  t465;

	//C3D nodo nose
	t470 = H;
	t471 = t470;
	H = H + 5;
	t472 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t471] = t472;
	t471 = t471 + 1;
	t473 = H;
	heap[(int)H] = 72;
	H = H + 1;
	heap[(int)H] = 83;
	H = H + 1;
	heap[(int)H] = 72;
	H = H + 1;
	heap[(int)H] = 83;
	H = H + 1;
	heap[(int)H] = 72;
	H = H + 1;
	heap[(int)H] = 83;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t471] = t473;
	t471 = t471 + 1;
	heap[(int)t471] = 1;
	t471 = t471 + 1;
	t474 = H;
	t475 = t474 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t476 = stack[(int)82];
	heap[(int)t475] = t476;
	t475 = t475 + 1;

	heap[(int)t471] = t474;
	t471 = t471 + 1;

	t477 = stack[(int)83];
	heap[(int)t471] = t477;
	stack[(int)84] = t470;

	//C3D atributo atrib : 456
	t478 = H;
	t479 = t478;
	H = H + 3;
	t480 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t479] = t480;
	t479 = t479 + 1;
	t481 = H;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = 54;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t479] = t481;
	t479 = t479 + 1;
	heap[(int)t479] = 2;
	stack[(int)85] = t478;

	//C3D entorno nose
	t482 = H;
	t483 = t482;
	H = H + 2;
	heap[(int)t483] = -1;
	t483 = t483 + 1;
	t484 = H;
	t485 = t484 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t486 = stack[(int)85];
	heap[(int)t485] = t486;
	t485 = t485 + 1;

	heap[(int)t483] = t484;
	stack[(int)86] =  t482;

	//C3D nodo nose
	t487 = H;
	t488 = t487;
	H = H + 5;
	t489 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t488] = t489;
	t488 = t488 + 1;
	t490 = H;
	heap[(int)H] = 81;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t488] = t490;
	t488 = t488 + 1;
	heap[(int)t488] = 1;
	t488 = t488 + 1;
	t491 = H;
	t492 = t491 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t493 = stack[(int)85];
	heap[(int)t492] = t493;
	t492 = t492 + 1;

	heap[(int)t488] = t491;
	t488 = t488 + 1;

	t494 = stack[(int)86];
	heap[(int)t488] = t494;
	stack[(int)87] = t487;

	//C3D atributo atrib : 456
	t495 = H;
	t496 = t495;
	H = H + 3;
	t497 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t496] = t497;
	t496 = t496 + 1;
	t498 = H;
	heap[(int)H] = 52;
	H = H + 1;
	heap[(int)H] = 53;
	H = H + 1;
	heap[(int)H] = 54;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t496] = t498;
	t496 = t496 + 1;
	heap[(int)t496] = 2;
	stack[(int)88] = t495;

	//C3D entorno nose
	t499 = H;
	t500 = t499;
	H = H + 2;
	heap[(int)t500] = -1;
	t500 = t500 + 1;
	t501 = H;
	t502 = t501 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t503 = stack[(int)88];
	heap[(int)t502] = t503;
	t502 = t502 + 1;

	heap[(int)t500] = t501;
	stack[(int)89] =  t499;

	//C3D nodo nose
	t504 = H;
	t505 = t504;
	H = H + 5;
	t506 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t505] = t506;
	t505 = t505 + 1;
	t507 = H;
	heap[(int)H] = 72;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t505] = t507;
	t505 = t505 + 1;
	heap[(int)t505] = 1;
	t505 = t505 + 1;
	t508 = H;
	t509 = t508 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t510 = stack[(int)88];
	heap[(int)t509] = t510;
	t509 = t509 + 1;

	heap[(int)t505] = t508;
	t505 = t505 + 1;

	t511 = stack[(int)89];
	heap[(int)t505] = t511;
	stack[(int)90] = t504;

	//C3D entorno nombre
	t512 = H;
	t513 = t512;
	H = H + 2;
	heap[(int)t513] = -1;
	t513 = t513 + 1;
	t514 = H;
	t515 = t514 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t513] = t514;
	stack[(int)91] =  t512;

	//C3D nodo nombre
	t516 = H;
	t517 = t516;
	H = H + 5;
	t518 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t517] = t518;
	t517 = t517 + 1;
	t519 = H;
	heap[(int)H] = 77;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t517] = t519;
	t517 = t517 + 1;
	heap[(int)t517] = 1;
	t517 = t517 + 1;
	t520 = H;
	t521 = t520 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t517] = t520;
	t517 = t517 + 1;

	t522 = stack[(int)91];
	heap[(int)t517] = t522;
	stack[(int)92] = t516;

	//C3D atributo atrib : 10
	t523 = H;
	t524 = t523;
	H = H + 3;
	t525 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t524] = t525;
	t524 = t524 + 1;
	t526 = H;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t524] = t526;
	t524 = t524 + 1;
	heap[(int)t524] = 2;
	stack[(int)93] = t523;

	//C3D entorno nose
	t527 = H;
	t528 = t527;
	H = H + 2;
	heap[(int)t528] = -1;
	t528 = t528 + 1;
	t529 = H;
	t530 = t529 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t531 = stack[(int)93];
	heap[(int)t530] = t531;
	t530 = t530 + 1;

	heap[(int)t528] = t529;
	stack[(int)94] =  t527;

	//C3D nodo nose
	t532 = H;
	t533 = t532;
	H = H + 5;
	t534 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t533] = t534;
	t533 = t533 + 1;
	t535 = H;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 120;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t533] = t535;
	t533 = t533 + 1;
	heap[(int)t533] = 1;
	t533 = t533 + 1;
	t536 = H;
	t537 = t536 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t538 = stack[(int)93];
	heap[(int)t537] = t538;
	t537 = t537 + 1;

	heap[(int)t533] = t536;
	t533 = t533 + 1;

	t539 = stack[(int)94];
	heap[(int)t533] = t539;
	stack[(int)95] = t532;

	//C3D atributo atrib : 169
	t540 = H;
	t541 = t540;
	H = H + 3;
	t542 = H;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t541] = t542;
	t541 = t541 + 1;
	t543 = H;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = 54;
	H = H + 1;
	heap[(int)H] = 57;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t541] = t543;
	t541 = t541 + 1;
	heap[(int)t541] = 2;
	stack[(int)96] = t540;

	//C3D entorno nose
	t544 = H;
	t545 = t544;
	H = H + 2;
	heap[(int)t545] = -1;
	t545 = t545 + 1;
	t546 = H;
	t547 = t546 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t548 = stack[(int)96];
	heap[(int)t547] = t548;
	t547 = t547 + 1;

	heap[(int)t545] = t546;
	stack[(int)97] =  t544;

	//C3D nodo nose
	t549 = H;
	t550 = t549;
	H = H + 5;
	t551 = H;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t550] = t551;
	t550 = t550 + 1;
	t552 = H;
	heap[(int)H] = 72;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t550] = t552;
	t550 = t550 + 1;
	heap[(int)t550] = 1;
	t550 = t550 + 1;
	t553 = H;
	t554 = t553 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t555 = stack[(int)96];
	heap[(int)t554] = t555;
	t554 = t554 + 1;

	heap[(int)t550] = t553;
	t550 = t550 + 1;

	t556 = stack[(int)97];
	heap[(int)t550] = t556;
	stack[(int)98] = t549;

	//C3D atributo category : cooking
	t557 = H;
	t558 = t557;
	H = H + 3;
	t559 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t558] = t559;
	t558 = t558 + 1;
	t560 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t558] = t560;
	t558 = t558 + 1;
	heap[(int)t558] = 2;
	stack[(int)99] = t557;

	//C3D entorno book
	t561 = H;
	t562 = t561;
	H = H + 2;
	heap[(int)t562] = -1;
	t562 = t562 + 1;
	t563 = H;
	t564 = t563 + 1;
	heap[(int)H] = 5;
	H = H + 6;

	t565 = stack[(int)99];
	heap[(int)t564] = t565;
	t564 = t564 + 1;

	t566 = stack[(int)2];
	heap[(int)t564] = t566;
	t564 = t564 + 1;

	t567 = stack[(int)4];
	heap[(int)t564] = t567;
	t564 = t564 + 1;

	t568 = stack[(int)6];
	heap[(int)t564] = t568;
	t564 = t564 + 1;

	t569 = stack[(int)8];
	heap[(int)t564] = t569;
	t564 = t564 + 1;

	heap[(int)t562] = t563;
	stack[(int)100] =  t561;

	//Agregando entorno a childs
	t570 = stack[(int)1];
	t570 = t570 + 0;
	t571 = stack[(int)100];
	heap[(int)t570] = t571;
	t572 = stack[(int)3];
	t572 = t572 + 0;
	t573 = stack[(int)100];
	heap[(int)t572] = t573;
	t574 = stack[(int)5];
	t574 = t574 + 0;
	t575 = stack[(int)100];
	heap[(int)t574] = t575;
	t576 = stack[(int)7];
	t576 = t576 + 0;
	t577 = stack[(int)100];
	heap[(int)t576] = t577;

	//C3D nodo book
	t578 = H;
	t579 = t578;
	H = H + 5;
	t580 = H;
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
	heap[(int)t579] = t580;
	t579 = t579 + 1;
	t581 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t579] = t581;
	t579 = t579 + 1;
	heap[(int)t579] = 1;
	t579 = t579 + 1;
	t582 = H;
	t583 = t582 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t584 = stack[(int)99];
	heap[(int)t583] = t584;
	t583 = t583 + 1;

	heap[(int)t579] = t582;
	t579 = t579 + 1;

	t585 = stack[(int)100];
	heap[(int)t579] = t585;
	stack[(int)101] = t578;

	//C3D atributo category : children
	t586 = H;
	t587 = t586;
	H = H + 3;
	t588 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t587] = t588;
	t587 = t587 + 1;
	t589 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 108;
	H = H + 1;
	heap[(int)H] = 100;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t587] = t589;
	t587 = t587 + 1;
	heap[(int)t587] = 2;
	stack[(int)102] = t586;

	//C3D entorno book
	t590 = H;
	t591 = t590;
	H = H + 2;
	heap[(int)t591] = -1;
	t591 = t591 + 1;
	t592 = H;
	t593 = t592 + 1;
	heap[(int)H] = 5;
	H = H + 6;

	t594 = stack[(int)102];
	heap[(int)t593] = t594;
	t593 = t593 + 1;

	t595 = stack[(int)15];
	heap[(int)t593] = t595;
	t593 = t593 + 1;

	t596 = stack[(int)17];
	heap[(int)t593] = t596;
	t593 = t593 + 1;

	t597 = stack[(int)19];
	heap[(int)t593] = t597;
	t593 = t593 + 1;

	t598 = stack[(int)22];
	heap[(int)t593] = t598;
	t593 = t593 + 1;

	heap[(int)t591] = t592;
	stack[(int)103] =  t590;

	//Agregando entorno a childs
	t599 = stack[(int)14];
	t599 = t599 + 0;
	t600 = stack[(int)103];
	heap[(int)t599] = t600;
	t601 = stack[(int)16];
	t601 = t601 + 0;
	t602 = stack[(int)103];
	heap[(int)t601] = t602;
	t603 = stack[(int)18];
	t603 = t603 + 0;
	t604 = stack[(int)103];
	heap[(int)t603] = t604;
	t605 = stack[(int)21];
	t605 = t605 + 0;
	t606 = stack[(int)103];
	heap[(int)t605] = t606;

	//C3D nodo book
	t607 = H;
	t608 = t607;
	H = H + 5;
	t609 = H;
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
	heap[(int)t608] = t609;
	t608 = t608 + 1;
	t610 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t608] = t610;
	t608 = t608 + 1;
	heap[(int)t608] = 1;
	t608 = t608 + 1;
	t611 = H;
	t612 = t611 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t613 = stack[(int)102];
	heap[(int)t612] = t613;
	t612 = t612 + 1;

	heap[(int)t608] = t611;
	t608 = t608 + 1;

	t614 = stack[(int)103];
	heap[(int)t608] = t614;
	stack[(int)104] = t607;

	//C3D atributo category : web
	t615 = H;
	t616 = t615;
	H = H + 3;
	t617 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t616] = t617;
	t616 = t616 + 1;
	t618 = H;
	heap[(int)H] = 119;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t616] = t618;
	t616 = t616 + 1;
	heap[(int)t616] = 2;
	stack[(int)105] = t615;

	//C3D entorno book
	t619 = H;
	t620 = t619;
	H = H + 2;
	heap[(int)t620] = -1;
	t620 = t620 + 1;
	t621 = H;
	t622 = t621 + 1;
	heap[(int)H] = 9;
	H = H + 10;

	t623 = stack[(int)105];
	heap[(int)t622] = t623;
	t622 = t622 + 1;

	t624 = stack[(int)25];
	heap[(int)t622] = t624;
	t622 = t622 + 1;

	t625 = stack[(int)27];
	heap[(int)t622] = t625;
	t622 = t622 + 1;

	t626 = stack[(int)29];
	heap[(int)t622] = t626;
	t622 = t622 + 1;

	t627 = stack[(int)31];
	heap[(int)t622] = t627;
	t622 = t622 + 1;

	t628 = stack[(int)33];
	heap[(int)t622] = t628;
	t622 = t622 + 1;

	t629 = stack[(int)35];
	heap[(int)t622] = t629;
	t622 = t622 + 1;

	t630 = stack[(int)37];
	heap[(int)t622] = t630;
	t622 = t622 + 1;

	t631 = stack[(int)39];
	heap[(int)t622] = t631;
	t622 = t622 + 1;

	heap[(int)t620] = t621;
	stack[(int)106] =  t619;

	//Agregando entorno a childs
	t632 = stack[(int)24];
	t632 = t632 + 0;
	t633 = stack[(int)106];
	heap[(int)t632] = t633;
	t634 = stack[(int)26];
	t634 = t634 + 0;
	t635 = stack[(int)106];
	heap[(int)t634] = t635;
	t636 = stack[(int)28];
	t636 = t636 + 0;
	t637 = stack[(int)106];
	heap[(int)t636] = t637;
	t638 = stack[(int)30];
	t638 = t638 + 0;
	t639 = stack[(int)106];
	heap[(int)t638] = t639;
	t640 = stack[(int)32];
	t640 = t640 + 0;
	t641 = stack[(int)106];
	heap[(int)t640] = t641;
	t642 = stack[(int)34];
	t642 = t642 + 0;
	t643 = stack[(int)106];
	heap[(int)t642] = t643;
	t644 = stack[(int)36];
	t644 = t644 + 0;
	t645 = stack[(int)106];
	heap[(int)t644] = t645;
	t646 = stack[(int)38];
	t646 = t646 + 0;
	t647 = stack[(int)106];
	heap[(int)t646] = t647;

	//C3D nodo book
	t648 = H;
	t649 = t648;
	H = H + 5;
	t650 = H;
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
	heap[(int)t649] = t650;
	t649 = t649 + 1;
	t651 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t649] = t651;
	t649 = t649 + 1;
	heap[(int)t649] = 1;
	t649 = t649 + 1;
	t652 = H;
	t653 = t652 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t654 = stack[(int)105];
	heap[(int)t653] = t654;
	t653 = t653 + 1;

	heap[(int)t649] = t652;
	t649 = t649 + 1;

	t655 = stack[(int)106];
	heap[(int)t649] = t655;
	stack[(int)107] = t648;

	//C3D atributo category : web
	t656 = H;
	t657 = t656;
	H = H + 3;
	t658 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 121;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t657] = t658;
	t657 = t657 + 1;
	t659 = H;
	heap[(int)H] = 119;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t657] = t659;
	t657 = t657 + 1;
	heap[(int)t657] = 2;
	stack[(int)108] = t656;

	//C3D atributo cover : paperback
	t660 = H;
	t661 = t660;
	H = H + 3;
	t662 = H;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 111;
	H = H + 1;
	heap[(int)H] = 118;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t661] = t662;
	t661 = t661 + 1;
	t663 = H;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 98;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 107;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t661] = t663;
	t661 = t661 + 1;
	heap[(int)t661] = 2;
	stack[(int)109] = t660;

	//C3D entorno book
	t664 = H;
	t665 = t664;
	H = H + 2;
	heap[(int)t665] = -1;
	t665 = t665 + 1;
	t666 = H;
	t667 = t666 + 1;
	heap[(int)H] = 6;
	H = H + 7;

	t668 = stack[(int)108];
	heap[(int)t667] = t668;
	t667 = t667 + 1;

	t669 = stack[(int)109];
	heap[(int)t667] = t669;
	t667 = t667 + 1;

	t670 = stack[(int)42];
	heap[(int)t667] = t670;
	t667 = t667 + 1;

	t671 = stack[(int)44];
	heap[(int)t667] = t671;
	t667 = t667 + 1;

	t672 = stack[(int)46];
	heap[(int)t667] = t672;
	t667 = t667 + 1;

	t673 = stack[(int)48];
	heap[(int)t667] = t673;
	t667 = t667 + 1;

	heap[(int)t665] = t666;
	stack[(int)110] =  t664;

	//Agregando entorno a childs
	t674 = stack[(int)41];
	t674 = t674 + 0;
	t675 = stack[(int)110];
	heap[(int)t674] = t675;
	t676 = stack[(int)43];
	t676 = t676 + 0;
	t677 = stack[(int)110];
	heap[(int)t676] = t677;
	t678 = stack[(int)45];
	t678 = t678 + 0;
	t679 = stack[(int)110];
	heap[(int)t678] = t679;
	t680 = stack[(int)47];
	t680 = t680 + 0;
	t681 = stack[(int)110];
	heap[(int)t680] = t681;

	//C3D nodo book
	t682 = H;
	t683 = t682;
	H = H + 5;
	t684 = H;
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
	heap[(int)t683] = t684;
	t683 = t683 + 1;
	t685 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t683] = t685;
	t683 = t683 + 1;
	heap[(int)t683] = 1;
	t683 = t683 + 1;
	t686 = H;
	t687 = t686 + 1;
	heap[(int)H] = 2;
	H = H + 3;

	t688 = stack[(int)108];
	heap[(int)t687] = t688;
	t687 = t687 + 1;

	t689 = stack[(int)109];
	heap[(int)t687] = t689;
	t687 = t687 + 1;

	heap[(int)t683] = t686;
	t683 = t683 + 1;

	t690 = stack[(int)110];
	heap[(int)t683] = t690;
	stack[(int)111] = t682;

	//C3D entorno magazine
	t691 = H;
	t692 = t691;
	H = H + 2;
	heap[(int)t692] = -1;
	t692 = t692 + 1;
	t693 = H;
	t694 = t693 + 1;
	heap[(int)H] = 5;
	H = H + 6;

	t695 = stack[(int)50];
	heap[(int)t694] = t695;
	t694 = t694 + 1;

	t696 = stack[(int)52];
	heap[(int)t694] = t696;
	t694 = t694 + 1;

	t697 = stack[(int)54];
	heap[(int)t694] = t697;
	t694 = t694 + 1;

	t698 = stack[(int)56];
	heap[(int)t694] = t698;
	t694 = t694 + 1;

	t699 = stack[(int)59];
	heap[(int)t694] = t699;
	t694 = t694 + 1;

	heap[(int)t692] = t693;
	stack[(int)112] =  t691;

	//Agregando entorno a childs
	t700 = stack[(int)49];
	t700 = t700 + 0;
	t701 = stack[(int)112];
	heap[(int)t700] = t701;
	t702 = stack[(int)51];
	t702 = t702 + 0;
	t703 = stack[(int)112];
	heap[(int)t702] = t703;
	t704 = stack[(int)53];
	t704 = t704 + 0;
	t705 = stack[(int)112];
	heap[(int)t704] = t705;
	t706 = stack[(int)55];
	t706 = t706 + 0;
	t707 = stack[(int)112];
	heap[(int)t706] = t707;

	//C3D nodo magazine
	t708 = H;
	t709 = t708;
	H = H + 5;
	t710 = H;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 122;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t709] = t710;
	t709 = t709 + 1;
	t711 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t709] = t711;
	t709 = t709 + 1;
	heap[(int)t709] = 1;
	t709 = t709 + 1;
	t712 = H;
	t713 = t712 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t709] = t712;
	t709 = t709 + 1;

	t714 = stack[(int)112];
	heap[(int)t709] = t714;
	stack[(int)113] = t708;

	//C3D entorno magazine
	t715 = H;
	t716 = t715;
	H = H + 2;
	heap[(int)t716] = -1;
	t716 = t716 + 1;
	t717 = H;
	t718 = t717 + 1;
	heap[(int)H] = 4;
	H = H + 5;

	t719 = stack[(int)61];
	heap[(int)t718] = t719;
	t718 = t718 + 1;

	t720 = stack[(int)63];
	heap[(int)t718] = t720;
	t718 = t718 + 1;

	t721 = stack[(int)65];
	heap[(int)t718] = t721;
	t718 = t718 + 1;

	t722 = stack[(int)68];
	heap[(int)t718] = t722;
	t718 = t718 + 1;

	heap[(int)t716] = t717;
	stack[(int)114] =  t715;

	//Agregando entorno a childs
	t723 = stack[(int)60];
	t723 = t723 + 0;
	t724 = stack[(int)114];
	heap[(int)t723] = t724;
	t725 = stack[(int)62];
	t725 = t725 + 0;
	t726 = stack[(int)114];
	heap[(int)t725] = t726;
	t727 = stack[(int)64];
	t727 = t727 + 0;
	t728 = stack[(int)114];
	heap[(int)t727] = t728;

	//C3D nodo magazine
	t729 = H;
	t730 = t729;
	H = H + 5;
	t731 = H;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 122;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t730] = t731;
	t730 = t730 + 1;
	t732 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t730] = t732;
	t730 = t730 + 1;
	heap[(int)t730] = 1;
	t730 = t730 + 1;
	t733 = H;
	t734 = t733 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t730] = t733;
	t730 = t730 + 1;

	t735 = stack[(int)114];
	heap[(int)t730] = t735;
	stack[(int)115] = t729;

	//C3D entorno magazine
	t736 = H;
	t737 = t736;
	H = H + 2;
	heap[(int)t737] = -1;
	t737 = t737 + 1;
	t738 = H;
	t739 = t738 + 1;
	heap[(int)H] = 5;
	H = H + 6;

	t740 = stack[(int)70];
	heap[(int)t739] = t740;
	t739 = t739 + 1;

	t741 = stack[(int)72];
	heap[(int)t739] = t741;
	t739 = t739 + 1;

	t742 = stack[(int)74];
	heap[(int)t739] = t742;
	t739 = t739 + 1;

	t743 = stack[(int)76];
	heap[(int)t739] = t743;
	t739 = t739 + 1;

	t744 = stack[(int)79];
	heap[(int)t739] = t744;
	t739 = t739 + 1;

	heap[(int)t737] = t738;
	stack[(int)116] =  t736;

	//Agregando entorno a childs
	t745 = stack[(int)69];
	t745 = t745 + 0;
	t746 = stack[(int)116];
	heap[(int)t745] = t746;
	t747 = stack[(int)71];
	t747 = t747 + 0;
	t748 = stack[(int)116];
	heap[(int)t747] = t748;
	t749 = stack[(int)73];
	t749 = t749 + 0;
	t750 = stack[(int)116];
	heap[(int)t749] = t750;
	t751 = stack[(int)75];
	t751 = t751 + 0;
	t752 = stack[(int)116];
	heap[(int)t751] = t752;

	//C3D nodo magazine
	t753 = H;
	t754 = t753;
	H = H + 5;
	t755 = H;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 103;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 122;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t754] = t755;
	t754 = t754 + 1;
	t756 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t754] = t756;
	t754 = t754 + 1;
	heap[(int)t754] = 1;
	t754 = t754 + 1;
	t757 = H;
	t758 = t757 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t754] = t757;
	t754 = t754 + 1;

	t759 = stack[(int)116];
	heap[(int)t754] = t759;
	stack[(int)117] = t753;

	//C3D atributo fecha : 200 DC
	t760 = H;
	t761 = t760;
	H = H + 3;
	t762 = H;
	heap[(int)H] = 102;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t761] = t762;
	t761 = t761 + 1;
	t763 = H;
	heap[(int)H] = 50;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 68;
	H = H + 1;
	heap[(int)H] = 67;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t761] = t763;
	t761 = t761 + 1;
	heap[(int)t761] = 2;
	stack[(int)118] = t760;

	//C3D entorno manuscripts
	t764 = H;
	t765 = t764;
	H = H + 2;
	heap[(int)t765] = -1;
	t765 = t765 + 1;
	t766 = H;
	t767 = t766 + 1;
	heap[(int)H] = 5;
	H = H + 6;

	t768 = stack[(int)118];
	heap[(int)t767] = t768;
	t767 = t767 + 1;

	t769 = stack[(int)81];
	heap[(int)t767] = t769;
	t767 = t767 + 1;

	t770 = stack[(int)84];
	heap[(int)t767] = t770;
	t767 = t767 + 1;

	t771 = stack[(int)87];
	heap[(int)t767] = t771;
	t767 = t767 + 1;

	t772 = stack[(int)90];
	heap[(int)t767] = t772;
	t767 = t767 + 1;

	heap[(int)t765] = t766;
	stack[(int)119] =  t764;

	//Agregando entorno a childs
	t773 = stack[(int)80];
	t773 = t773 + 0;
	t774 = stack[(int)119];
	heap[(int)t773] = t774;
	t775 = stack[(int)83];
	t775 = t775 + 0;
	t776 = stack[(int)119];
	heap[(int)t775] = t776;
	t777 = stack[(int)86];
	t777 = t777 + 0;
	t778 = stack[(int)119];
	heap[(int)t777] = t778;
	t779 = stack[(int)89];
	t779 = t779 + 0;
	t780 = stack[(int)119];
	heap[(int)t779] = t780;

	//C3D nodo manuscripts
	t781 = H;
	t782 = t781;
	H = H + 5;
	t783 = H;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t782] = t783;
	t782 = t782 + 1;
	t784 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t782] = t784;
	t782 = t782 + 1;
	heap[(int)t782] = 1;
	t782 = t782 + 1;
	t785 = H;
	t786 = t785 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t787 = stack[(int)118];
	heap[(int)t786] = t787;
	t786 = t786 + 1;

	heap[(int)t782] = t785;
	t782 = t782 + 1;

	t788 = stack[(int)119];
	heap[(int)t782] = t788;
	stack[(int)120] = t781;

	//C3D atributo fecha : 10 AC
	t789 = H;
	t790 = t789;
	H = H + 3;
	t791 = H;
	heap[(int)H] = 102;
	H = H + 1;
	heap[(int)H] = 101;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 104;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t790] = t791;
	t790 = t790 + 1;
	t792 = H;
	heap[(int)H] = 49;
	H = H + 1;
	heap[(int)H] = 48;
	H = H + 1;
	heap[(int)H] = 32;
	H = H + 1;
	heap[(int)H] = 65;
	H = H + 1;
	heap[(int)H] = 67;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t790] = t792;
	t790 = t790 + 1;
	heap[(int)t790] = 2;
	stack[(int)121] = t789;

	//C3D entorno manuscripts
	t793 = H;
	t794 = t793;
	H = H + 2;
	heap[(int)t794] = -1;
	t794 = t794 + 1;
	t795 = H;
	t796 = t795 + 1;
	heap[(int)H] = 4;
	H = H + 5;

	t797 = stack[(int)121];
	heap[(int)t796] = t797;
	t796 = t796 + 1;

	t798 = stack[(int)92];
	heap[(int)t796] = t798;
	t796 = t796 + 1;

	t799 = stack[(int)95];
	heap[(int)t796] = t799;
	t796 = t796 + 1;

	t800 = stack[(int)98];
	heap[(int)t796] = t800;
	t796 = t796 + 1;

	heap[(int)t794] = t795;
	stack[(int)122] =  t793;

	//Agregando entorno a childs
	t801 = stack[(int)91];
	t801 = t801 + 0;
	t802 = stack[(int)122];
	heap[(int)t801] = t802;
	t803 = stack[(int)94];
	t803 = t803 + 0;
	t804 = stack[(int)122];
	heap[(int)t803] = t804;
	t805 = stack[(int)97];
	t805 = t805 + 0;
	t806 = stack[(int)122];
	heap[(int)t805] = t806;

	//C3D nodo manuscripts
	t807 = H;
	t808 = t807;
	H = H + 5;
	t809 = H;
	heap[(int)H] = 109;
	H = H + 1;
	heap[(int)H] = 97;
	H = H + 1;
	heap[(int)H] = 110;
	H = H + 1;
	heap[(int)H] = 117;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = 99;
	H = H + 1;
	heap[(int)H] = 114;
	H = H + 1;
	heap[(int)H] = 105;
	H = H + 1;
	heap[(int)H] = 112;
	H = H + 1;
	heap[(int)H] = 116;
	H = H + 1;
	heap[(int)H] = 115;
	H = H + 1;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t808] = t809;
	t808 = t808 + 1;
	t810 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t808] = t810;
	t808 = t808 + 1;
	heap[(int)t808] = 1;
	t808 = t808 + 1;
	t811 = H;
	t812 = t811 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t813 = stack[(int)121];
	heap[(int)t812] = t813;
	t812 = t812 + 1;

	heap[(int)t808] = t811;
	t808 = t808 + 1;

	t814 = stack[(int)122];
	heap[(int)t808] = t814;
	stack[(int)123] = t807;

	//C3D entorno bookstore
	t815 = H;
	t816 = t815;
	H = H + 2;
	heap[(int)t816] = -1;
	t816 = t816 + 1;
	t817 = H;
	t818 = t817 + 1;
	heap[(int)H] = 9;
	H = H + 10;

	t819 = stack[(int)101];
	heap[(int)t818] = t819;
	t818 = t818 + 1;

	t820 = stack[(int)104];
	heap[(int)t818] = t820;
	t818 = t818 + 1;

	t821 = stack[(int)107];
	heap[(int)t818] = t821;
	t818 = t818 + 1;

	t822 = stack[(int)111];
	heap[(int)t818] = t822;
	t818 = t818 + 1;

	t823 = stack[(int)113];
	heap[(int)t818] = t823;
	t818 = t818 + 1;

	t824 = stack[(int)115];
	heap[(int)t818] = t824;
	t818 = t818 + 1;

	t825 = stack[(int)117];
	heap[(int)t818] = t825;
	t818 = t818 + 1;

	t826 = stack[(int)120];
	heap[(int)t818] = t826;
	t818 = t818 + 1;

	t827 = stack[(int)123];
	heap[(int)t818] = t827;
	t818 = t818 + 1;

	heap[(int)t816] = t817;
	stack[(int)124] =  t815;

	//Agregando entorno a childs
	t828 = stack[(int)100];
	t828 = t828 + 0;
	t829 = stack[(int)124];
	heap[(int)t828] = t829;
	t830 = stack[(int)103];
	t830 = t830 + 0;
	t831 = stack[(int)124];
	heap[(int)t830] = t831;
	t832 = stack[(int)106];
	t832 = t832 + 0;
	t833 = stack[(int)124];
	heap[(int)t832] = t833;
	t834 = stack[(int)110];
	t834 = t834 + 0;
	t835 = stack[(int)124];
	heap[(int)t834] = t835;
	t836 = stack[(int)112];
	t836 = t836 + 0;
	t837 = stack[(int)124];
	heap[(int)t836] = t837;
	t838 = stack[(int)114];
	t838 = t838 + 0;
	t839 = stack[(int)124];
	heap[(int)t838] = t839;
	t840 = stack[(int)116];
	t840 = t840 + 0;
	t841 = stack[(int)124];
	heap[(int)t840] = t841;
	t842 = stack[(int)119];
	t842 = t842 + 0;
	t843 = stack[(int)124];
	heap[(int)t842] = t843;
	t844 = stack[(int)122];
	t844 = t844 + 0;
	t845 = stack[(int)124];
	heap[(int)t844] = t845;

	//C3D nodo bookstore
	t846 = H;
	t847 = t846;
	H = H + 5;
	t848 = H;
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
	heap[(int)t847] = t848;
	t847 = t847 + 1;
	t849 = H;
	heap[(int)H] = -1;
	H = H + 1;
	heap[(int)t847] = t849;
	t847 = t847 + 1;
	heap[(int)t847] = 1;
	t847 = t847 + 1;
	t850 = H;
	t851 = t850 + 1;
	heap[(int)H] = 0;
	H = H + 1;

	heap[(int)t847] = t850;
	t847 = t847 + 1;

	t852 = stack[(int)124];
	heap[(int)t847] = t852;
	stack[(int)125] = t846;

	//C3D entorno global
	t853 = H;
	t854 = t853;
	H = H + 2;
	heap[(int)t854] = -1;
	t854 = t854 + 1;
	t855 = H;
	t856 = t855 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t857 = stack[(int)125];
	heap[(int)t856] = t857;
	t856 = t856 + 1;

	heap[(int)t854] = t855;
	stack[(int)126] =  t853;

	//C3D entorno resultado
	t858 = H;
	t859 = t858;
	H = H + 2;
	heap[(int)t859] = -1;
	t859 = t859 + 1;
	t860 = H;
	t861 = t860 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t862 = stack[(int)111];
	heap[(int)t861] = t862;
	t861 = t861 + 1;

	heap[(int)t859] = t860;
	stack[(int)127] =  t858;
	
//Generando array de entornos;
	t863 = H;
	t864 = t863 + 1;
	heap[(int)H] = 1;
	H = H + 2;
	t865 = stack[(int)127];
	heap[(int)t864] = t865;
	t864 = t864 + 1;
	stack[(int)128] = t863;
	//Imprimir resultado
	P = P + 129;
	t866 = P + 1;
	stack[(int)t866] = t863;
	imprimirResultado();
	t867 = stack[(int)P];
	P = P - 129;
	printf("\n\n");

	//C3D entorno resultado
	t868 = H;
	t869 = t868;
	H = H + 2;
	heap[(int)t869] = -1;
	t869 = t869 + 1;
	t870 = H;
	t871 = t870 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t872 = stack[(int)2];
	heap[(int)t871] = t872;
	t871 = t871 + 1;

	heap[(int)t869] = t870;
	stack[(int)129] =  t868;

	//C3D entorno resultado
	t873 = H;
	t874 = t873;
	H = H + 2;
	heap[(int)t874] = -1;
	t874 = t874 + 1;
	t875 = H;
	t876 = t875 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t877 = stack[(int)15];
	heap[(int)t876] = t877;
	t876 = t876 + 1;

	heap[(int)t874] = t875;
	stack[(int)130] =  t873;

	//C3D entorno resultado
	t878 = H;
	t879 = t878;
	H = H + 2;
	heap[(int)t879] = -1;
	t879 = t879 + 1;
	t880 = H;
	t881 = t880 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t882 = stack[(int)25];
	heap[(int)t881] = t882;
	t881 = t881 + 1;

	heap[(int)t879] = t880;
	stack[(int)131] =  t878;

	//C3D entorno resultado
	t883 = H;
	t884 = t883;
	H = H + 2;
	heap[(int)t884] = -1;
	t884 = t884 + 1;
	t885 = H;
	t886 = t885 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t887 = stack[(int)42];
	heap[(int)t886] = t887;
	t886 = t886 + 1;

	heap[(int)t884] = t885;
	stack[(int)132] =  t883;

	//C3D entorno resultado
	t888 = H;
	t889 = t888;
	H = H + 2;
	heap[(int)t889] = -1;
	t889 = t889 + 1;
	t890 = H;
	t891 = t890 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t892 = stack[(int)50];
	heap[(int)t891] = t892;
	t891 = t891 + 1;

	heap[(int)t889] = t890;
	stack[(int)133] =  t888;

	//C3D entorno resultado
	t893 = H;
	t894 = t893;
	H = H + 2;
	heap[(int)t894] = -1;
	t894 = t894 + 1;
	t895 = H;
	t896 = t895 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t897 = stack[(int)61];
	heap[(int)t896] = t897;
	t896 = t896 + 1;

	heap[(int)t894] = t895;
	stack[(int)134] =  t893;

	//C3D entorno resultado
	t898 = H;
	t899 = t898;
	H = H + 2;
	heap[(int)t899] = -1;
	t899 = t899 + 1;
	t900 = H;
	t901 = t900 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t902 = stack[(int)70];
	heap[(int)t901] = t902;
	t901 = t901 + 1;

	heap[(int)t899] = t900;
	stack[(int)135] =  t898;
	
//Generando array de entornos;
	t903 = H;
	t904 = t903 + 1;
	heap[(int)H] = 7;
	H = H + 8;
	t905 = stack[(int)129];
	heap[(int)t904] = t905;
	t904 = t904 + 1;
	t906 = stack[(int)130];
	heap[(int)t904] = t906;
	t904 = t904 + 1;
	t907 = stack[(int)131];
	heap[(int)t904] = t907;
	t904 = t904 + 1;
	t908 = stack[(int)132];
	heap[(int)t904] = t908;
	t904 = t904 + 1;
	t909 = stack[(int)133];
	heap[(int)t904] = t909;
	t904 = t904 + 1;
	t910 = stack[(int)134];
	heap[(int)t904] = t910;
	t904 = t904 + 1;
	t911 = stack[(int)135];
	heap[(int)t904] = t911;
	t904 = t904 + 1;
	stack[(int)136] = t903;
	//Imprimir resultado
	P = P + 137;
	t912 = P + 1;
	stack[(int)t912] = t903;
	imprimirResultado();
	t913 = stack[(int)P];
	P = P - 137;
	printf("\n\n");

	//C3D entorno resultado
	t914 = H;
	t915 = t914;
	H = H + 2;
	heap[(int)t915] = -1;
	t915 = t915 + 1;
	t916 = H;
	t917 = t916 + 1;
	heap[(int)H] = 4;
	H = H + 5;

	t918 = stack[(int)101];
	heap[(int)t917] = t918;
	t917 = t917 + 1;

	t919 = stack[(int)104];
	heap[(int)t917] = t919;
	t917 = t917 + 1;

	t920 = stack[(int)107];
	heap[(int)t917] = t920;
	t917 = t917 + 1;

	t921 = stack[(int)111];
	heap[(int)t917] = t921;
	t917 = t917 + 1;

	heap[(int)t915] = t916;
	stack[(int)137] =  t914;
	
//Generando array de entornos;
	t922 = H;
	t923 = t922 + 1;
	heap[(int)H] = 1;
	H = H + 2;
	t924 = stack[(int)137];
	heap[(int)t923] = t924;
	t923 = t923 + 1;
	stack[(int)138] = t922;
	//Imprimir resultado
	P = P + 139;
	t925 = P + 1;
	stack[(int)t925] = t922;
	imprimirResultado();
	t926 = stack[(int)P];
	P = P - 139;
	printf("\n\n");

	//C3D entorno resultado
	t927 = H;
	t928 = t927;
	H = H + 2;
	heap[(int)t928] = -1;
	t928 = t928 + 1;
	t929 = H;
	t930 = t929 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t931 = stack[(int)101];
	heap[(int)t930] = t931;
	t930 = t930 + 1;

	heap[(int)t928] = t929;
	stack[(int)139] =  t927;

	//C3D entorno resultado
	t932 = H;
	t933 = t932;
	H = H + 2;
	heap[(int)t933] = -1;
	t933 = t933 + 1;
	t934 = H;
	t935 = t934 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t936 = stack[(int)2];
	heap[(int)t935] = t936;
	t935 = t935 + 1;

	heap[(int)t933] = t934;
	stack[(int)140] =  t932;

	//C3D entorno resultado
	t937 = H;
	t938 = t937;
	H = H + 2;
	heap[(int)t938] = -1;
	t938 = t938 + 1;
	t939 = H;
	t940 = t939 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t941 = stack[(int)104];
	heap[(int)t940] = t941;
	t940 = t940 + 1;

	heap[(int)t938] = t939;
	stack[(int)141] =  t937;

	//C3D entorno resultado
	t942 = H;
	t943 = t942;
	H = H + 2;
	heap[(int)t943] = -1;
	t943 = t943 + 1;
	t944 = H;
	t945 = t944 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t946 = stack[(int)15];
	heap[(int)t945] = t946;
	t945 = t945 + 1;

	heap[(int)t943] = t944;
	stack[(int)142] =  t942;

	//C3D entorno resultado
	t947 = H;
	t948 = t947;
	H = H + 2;
	heap[(int)t948] = -1;
	t948 = t948 + 1;
	t949 = H;
	t950 = t949 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t951 = stack[(int)22];
	heap[(int)t950] = t951;
	t950 = t950 + 1;

	heap[(int)t948] = t949;
	stack[(int)143] =  t947;

	//C3D entorno resultado
	t952 = H;
	t953 = t952;
	H = H + 2;
	heap[(int)t953] = -1;
	t953 = t953 + 1;
	t954 = H;
	t955 = t954 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t956 = stack[(int)107];
	heap[(int)t955] = t956;
	t955 = t955 + 1;

	heap[(int)t953] = t954;
	stack[(int)144] =  t952;

	//C3D entorno resultado
	t957 = H;
	t958 = t957;
	H = H + 2;
	heap[(int)t958] = -1;
	t958 = t958 + 1;
	t959 = H;
	t960 = t959 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t961 = stack[(int)25];
	heap[(int)t960] = t961;
	t960 = t960 + 1;

	heap[(int)t958] = t959;
	stack[(int)145] =  t957;

	//C3D entorno resultado
	t962 = H;
	t963 = t962;
	H = H + 2;
	heap[(int)t963] = -1;
	t963 = t963 + 1;
	t964 = H;
	t965 = t964 + 1;
	heap[(int)H] = 2;
	H = H + 3;

	t966 = stack[(int)111];
	heap[(int)t965] = t966;
	t965 = t965 + 1;

	t967 = stack[(int)111];
	heap[(int)t965] = t967;
	t965 = t965 + 1;

	heap[(int)t963] = t964;
	stack[(int)146] =  t962;

	//C3D entorno resultado
	t968 = H;
	t969 = t968;
	H = H + 2;
	heap[(int)t969] = -1;
	t969 = t969 + 1;
	t970 = H;
	t971 = t970 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t972 = stack[(int)42];
	heap[(int)t971] = t972;
	t971 = t971 + 1;

	heap[(int)t969] = t970;
	stack[(int)147] =  t968;

	//C3D entorno resultado
	t973 = H;
	t974 = t973;
	H = H + 2;
	heap[(int)t974] = -1;
	t974 = t974 + 1;
	t975 = H;
	t976 = t975 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t977 = stack[(int)59];
	heap[(int)t976] = t977;
	t976 = t976 + 1;

	heap[(int)t974] = t975;
	stack[(int)148] =  t973;

	//C3D entorno resultado
	t978 = H;
	t979 = t978;
	H = H + 2;
	heap[(int)t979] = -1;
	t979 = t979 + 1;
	t980 = H;
	t981 = t980 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t982 = stack[(int)68];
	heap[(int)t981] = t982;
	t981 = t981 + 1;

	heap[(int)t979] = t980;
	stack[(int)149] =  t978;

	//C3D entorno resultado
	t983 = H;
	t984 = t983;
	H = H + 2;
	heap[(int)t984] = -1;
	t984 = t984 + 1;
	t985 = H;
	t986 = t985 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t987 = stack[(int)79];
	heap[(int)t986] = t987;
	t986 = t986 + 1;

	heap[(int)t984] = t985;
	stack[(int)150] =  t983;

	//C3D entorno resultado
	t988 = H;
	t989 = t988;
	H = H + 2;
	heap[(int)t989] = -1;
	t989 = t989 + 1;
	t990 = H;
	t991 = t990 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t992 = stack[(int)120];
	heap[(int)t991] = t992;
	t991 = t991 + 1;

	heap[(int)t989] = t990;
	stack[(int)151] =  t988;

	//C3D entorno resultado
	t993 = H;
	t994 = t993;
	H = H + 2;
	heap[(int)t994] = -1;
	t994 = t994 + 1;
	t995 = H;
	t996 = t995 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t997 = stack[(int)84];
	heap[(int)t996] = t997;
	t996 = t996 + 1;

	heap[(int)t994] = t995;
	stack[(int)152] =  t993;

	//C3D entorno resultado
	t998 = H;
	t999 = t998;
	H = H + 2;
	heap[(int)t999] = -1;
	t999 = t999 + 1;
	t1000 = H;
	t1001 = t1000 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t1002 = stack[(int)87];
	heap[(int)t1001] = t1002;
	t1001 = t1001 + 1;

	heap[(int)t999] = t1000;
	stack[(int)153] =  t998;

	//C3D entorno resultado
	t1003 = H;
	t1004 = t1003;
	H = H + 2;
	heap[(int)t1004] = -1;
	t1004 = t1004 + 1;
	t1005 = H;
	t1006 = t1005 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t1007 = stack[(int)90];
	heap[(int)t1006] = t1007;
	t1006 = t1006 + 1;

	heap[(int)t1004] = t1005;
	stack[(int)154] =  t1003;

	//C3D entorno resultado
	t1008 = H;
	t1009 = t1008;
	H = H + 2;
	heap[(int)t1009] = -1;
	t1009 = t1009 + 1;
	t1010 = H;
	t1011 = t1010 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t1012 = stack[(int)123];
	heap[(int)t1011] = t1012;
	t1011 = t1011 + 1;

	heap[(int)t1009] = t1010;
	stack[(int)155] =  t1008;

	//C3D entorno resultado
	t1013 = H;
	t1014 = t1013;
	H = H + 2;
	heap[(int)t1014] = -1;
	t1014 = t1014 + 1;
	t1015 = H;
	t1016 = t1015 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t1017 = stack[(int)95];
	heap[(int)t1016] = t1017;
	t1016 = t1016 + 1;

	heap[(int)t1014] = t1015;
	stack[(int)156] =  t1013;

	//C3D entorno resultado
	t1018 = H;
	t1019 = t1018;
	H = H + 2;
	heap[(int)t1019] = -1;
	t1019 = t1019 + 1;
	t1020 = H;
	t1021 = t1020 + 1;
	heap[(int)H] = 1;
	H = H + 2;

	t1022 = stack[(int)98];
	heap[(int)t1021] = t1022;
	t1021 = t1021 + 1;

	heap[(int)t1019] = t1020;
	stack[(int)157] =  t1018;
	
//Generando array de entornos;
	t1023 = H;
	t1024 = t1023 + 1;
	heap[(int)H] = 19;
	H = H + 20;
	t1025 = stack[(int)139];
	heap[(int)t1024] = t1025;
	t1024 = t1024 + 1;
	t1026 = stack[(int)140];
	heap[(int)t1024] = t1026;
	t1024 = t1024 + 1;
	t1027 = stack[(int)141];
	heap[(int)t1024] = t1027;
	t1024 = t1024 + 1;
	t1028 = stack[(int)142];
	heap[(int)t1024] = t1028;
	t1024 = t1024 + 1;
	t1029 = stack[(int)143];
	heap[(int)t1024] = t1029;
	t1024 = t1024 + 1;
	t1030 = stack[(int)144];
	heap[(int)t1024] = t1030;
	t1024 = t1024 + 1;
	t1031 = stack[(int)145];
	heap[(int)t1024] = t1031;
	t1024 = t1024 + 1;
	t1032 = stack[(int)146];
	heap[(int)t1024] = t1032;
	t1024 = t1024 + 1;
	t1033 = stack[(int)147];
	heap[(int)t1024] = t1033;
	t1024 = t1024 + 1;
	t1034 = stack[(int)148];
	heap[(int)t1024] = t1034;
	t1024 = t1024 + 1;
	t1035 = stack[(int)149];
	heap[(int)t1024] = t1035;
	t1024 = t1024 + 1;
	t1036 = stack[(int)150];
	heap[(int)t1024] = t1036;
	t1024 = t1024 + 1;
	t1037 = stack[(int)151];
	heap[(int)t1024] = t1037;
	t1024 = t1024 + 1;
	t1038 = stack[(int)152];
	heap[(int)t1024] = t1038;
	t1024 = t1024 + 1;
	t1039 = stack[(int)153];
	heap[(int)t1024] = t1039;
	t1024 = t1024 + 1;
	t1040 = stack[(int)154];
	heap[(int)t1024] = t1040;
	t1024 = t1024 + 1;
	t1041 = stack[(int)155];
	heap[(int)t1024] = t1041;
	t1024 = t1024 + 1;
	t1042 = stack[(int)156];
	heap[(int)t1024] = t1042;
	t1024 = t1024 + 1;
	t1043 = stack[(int)157];
	heap[(int)t1024] = t1043;
	t1024 = t1024 + 1;
	stack[(int)158] = t1023;
	//Imprimir resultado
	P = P + 159;
	t1044 = P + 1;
	stack[(int)t1044] = t1023;
	imprimirResultado();
	t1045 = stack[(int)P];
	P = P - 159;
	printf("\n\n");
	return;
}