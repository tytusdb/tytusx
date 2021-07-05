#!/bin/zsh

echo compilando archivos jison...
jison ./XML/AnalyzerXML.jison
jison ./XPATH/jisonXpaht.jison
jison ./XPATH/AnalyzerXpathDesc.jison
jison ./XQUERY/analizadorXquery.jison
jison ./XQUERY/XqueryC3D.jison
jison ./OPTIMIZADOR/analizadorOptimizador.jison
echo ----------------------------------------

echo traspilando archivos TypeScript
tsc
echo ----------------------------------------

echo moviendo archivos...
mv AnalyzerXML.js ../js
mv jisonXpaht.js ./XPATH
mv AnalyzerXpathDesc.js ../js/XPATH

DIR="../js/Xquery/"
if [ ! -d "$DIR" ]; then
  mkdir $DIR
  echo carpeta Xquery creada
fi

if [ -d ../js/C3D/OPTIMIZADOR ];
then echo "Carpeta ya existe"
else mkdir ../js/C3D/OPTIMIZADOR
fi
mv analizadorXquery.js ../js/Xquery
mv XqueryC3D.js ../js/Xquery
mv analizadorOptimizador.js ../js/C3D/OPTIMIZADOR
echo ----------------------------------------
