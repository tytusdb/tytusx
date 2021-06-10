#!/bin/zsh

echo compilando archivo jison...
jison AnalyzerXML.jison
echo ----------------------------------------

echo traspilando archivos TypeScript
tsc
echo ----------------------------------------

echo moviendo archivo
mv AnalyzerXML.js ../../
echo ----------------------------------------
