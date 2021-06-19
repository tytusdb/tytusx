<template>
  <q-page class="constrain q-pa-lg">
    <div class="row">
      <div class="col-12">
        <q-btn-group push spread>
          
          <q-btn push label="Limpiar" icon="cleaning_services" @click="limpiar" />
          <q-btn push label="Ejecutar ASC" icon="expand_less" @click="ejecutar" />
          <q-btn push label="Ejecutar DESC" icon="expand_more" @click="ejecutarDESC" />
        </q-btn-group>
      </div>
    </div>

    <!-- Editor de codigo -->
    <div class="row justify-content-center q-mt-md">
      <div class="col-12">
        <q-card class="my-card">
          <q-tabs v-model="tab" class="text-black ">
            
            <q-tab label="XML" name="editorx" icon="code" />
            <q-tab label="XPATH" name="editor" icon="code" />
            <q-tab label="Errores" name="errores" icon="report" v-if="errores != null && errores.length > 0" />
            <q-tab label="Reporte Gramatical" icon="check" name="reporteGramatical" v-if="reporteGramatical != null && reporteGramatical.length > 0" />
            <q-tab label="Consola" name="consola" icon="drag_handle" />
            <q-tab
              label="Tabla de Símbolos"
              name="tabla_de_simbolos"
              icon="storage"
              v-if="entornos != null && entornos.length > 0"
            />
            <q-tab label="AST XPATH" name="ast" icon="merge_type" />
            <q-tab label="CST - XML" name="astxml" icon="merge_type" />
            <q-tab label="CST - XPATH" name="cstxpath" icon="merge_type" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>



            <q-tab-panel name="editorx">
              <codemirror v-model="codexml" :options="cmOptionsXML" @input="codigoEditado" />
            </q-tab-panel>
          
            
            
            <q-tab-panel name="editor">
              <codemirror v-model="code" :options="cmOptions" @input="codigoEditado" />
            </q-tab-panel>

            <q-tab-panel name="errores" v-if="errores != null && errores.length > 0">
              <div class="q-pa-md">
                <q-table
                  title="Lista de Errores Obtenidos"
                  :data="errores"
                  :columns="columns"
                  row-key="name"
                  dark
                  color="amber"
                  dense
                  :pagination="{ rowsPerPage: 0 }"
                  rows-per-page-label="Errores por página"
                />
              </div>
            </q-tab-panel>

            <q-tab-panel name="reporteGramatical" class="bg-grey-10 text-white">
              <q-list dark bordered separator dense>
              <q-item-label overline>GRAMATICA</q-item-label>
                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in reporteGramatical"
                  :key="index"
                >
                  <q-item-section>{{ item.produccion }}</q-item-section>
                  <q-item-section>{{ item.regla }}</q-item-section>

                </q-item>
              </q-list>
              <!--Aqui empeiza -->
              <q-list dark bordered separator dense>
              <q-item-label overline>GRAMATICA XPATH</q-item-label>
                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in reporteGramatical2"
                  :key="index"
                >
                  <q-item-section>{{ item.produccion }}</q-item-section>
                  <q-item-section>{{ item.regla }}</q-item-section>

                </q-item>
              </q-list>
              <!--Aqui termina -->
            </q-tab-panel>

            

            <q-tab-panel name="consola" class="bg-grey-10 text-white">
              <q-list dark bordered separator dense>
                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in salida"
                  :key="index"
                >
                  <q-item-section>{{ item }}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="tabla_de_simbolos" v-if="entornos != null && entornos.length > 0">
              <tabla-simbolos :entornos="entornos" />
            </q-tab-panel>

            <q-tab-panel name="ast" style="height: 500px">
              <ast :dot="dot" />
              
            </q-tab-panel>

            <q-tab-panel name="astxml" style="height: 500px">
              <ast :dot="dotxml" />
            </q-tab-panel>

            <q-tab-panel name="cstxpath" style="height: 500px">
              <ast :dot="dotxpath" />
            </q-tab-panel>

            

            


          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
//JS-Beautify
var beautify_js = require('js-beautify').js_beautify
// CodeMirror
import { codemirror } from "vue-codemirror";
// import base style
import "codemirror/lib/codemirror.css";
// import theme style
import "codemirror/theme/paraiso-light.css";
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/xq-light.css";
import 'codemirror/mode/xml/xml'
import "codemirror/addon/fold/xml-fold"//Fold xml and html
// Analizador
//import AnalizadorTraduccion from "../analizador/gramatica_traduccion";
import AnalizadorXML from "../analizador/gramatica_xml";
import AnalizadorXPATH from "../analizador/gramatica_xpath";
import AnalizadorXPATH2 from "../arbol/reporteCST_xpath";

import AnalizadorXMLDESC from "../analizador/gramatica_xml_desc";
//Traduccion
import { Traduccion } from "../traduccion/traduccion";
import { Variable } from "../traduccion/variable";
import { Ejecucion } from "../ejecucion/ejecucion";
import { Errores } from "../arbol/errores";
import { Error as InstanciaError } from "../arbol/error";
import { Entornos } from "../ejecucion/entornos";
import { EntornoAux } from '../ejecucion/entorno_aux';
import { ReporteGramatical } from "../arbol/reporteGramatical";
import { reglaGramatical as InstanciaRegla } from "../arbol/reglaGramatical";

export default {
  components: {
    codemirror,
    ast: require("../components/Ast").default,
    tablaSimbolos: require("../components/TablaSimbolos").default,
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "text/javascript",
        theme: "xq-light",
        lineNumbers: true,
        line: false,
      },
      cmOptionsXML: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "xml",
        theme: "xq-light",
        lineNumbers: true,
        line: false,
      },
      output: "salida de ejemplo",
      tab: "editor",
      dot: "",
      dotxpath:"",
      dotxml:"",
      salida: [],
      codexml:"",
      errores: [],
      columns: [
        { name: "tipo", label: "Tipo", field: "tipo", align: "left" },
        { name: "linea", label: "Linea", field: "linea", align: "left" },
        {
          name: "descripcion",
          label: "Descripcion",
          field: "descripcion",
          align: "left",
        },
      ],
      entornos: [],
      reporteGramatical: [],
      reporteGramatical2: [],
      columns2:[
        { name: "produccion", label: "Produccion", field: "produccion", align: "left" },
        { name: "reglas", label: "Reglas", field: "reglas", align: "left" },
      ],
    };
  },
  methods: {
    notificar(variant, message) {
      this.$q.notify({
        message: message,
        color: variant,
        multiLine: true,
        timeout:100,
        position:'top',
        actions: [
          {
            label: "Aceptar",
            color: "yellow",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
    ejecutar() {
      /*if (this.code.trim() == "") {
        
        this.notificar("secundary", `Ingrese algo de código`);
        return;
      }*/
      this.inicializarValores();
      let ErrorDelTry=0;

      //PRIMERO PARSEAR EL XML
      try {
        AnalizadorXML.parse(this.codexml);        
        this.notificar("primary", "XML sintactico, lexico leido con éxito");
        
      } catch (error) {
        this.validarError(error,1);
        ErrorDelTry=1;
      }

      //SEGUNDO PARSEAR XPATH

      try {
        AnalizadorXPATH.parse(this.code);        
        this.notificar("primary", "XPATH sintactico, lexico leido con éxito");
        
      } catch (error) {
        this.validarError(error,2);
        ErrorDelTry=2;
      }
      
      try {
        const raiz = AnalizadorXPATH.parse(this.code);
        const raizXML = AnalizadorXML.parse(this.codexml);
        const raiz2 = AnalizadorXPATH2.parse(this.code);
        
        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No fue posible obtener la raíz de la ejecución"
          );
          return;
        }
        if (raizXML == null) {
          this.notificar(
            "negative",
            "XML: No fue posible obtener la raíz de la ejecución"
          );
          return;
        }
        let ejecucion = new Ejecucion(raiz, raizXML,raiz2);
        this.dot = ejecucion.getDot();
        this.dotxml = ejecucion.getDotXML();
        this.dotxpath=ejecucion.getDot2();
         this.salida = ejecucion.getSalidaXPATH();
        ejecucion.clearXPATH();
        
        //Valido si puedo ejecutar (no deben existir funciones anidadas)
        if(!ejecucion.puedoEjecutar(raizXML)){
          this.notificar("primary", "No se puede realizar una ejecución con funciones anidadas");
          return;
        }
        ejecucion.ejecutar();
        this.reporteGramatical = ReporteGramatical.getInstance().lista;
        this.reporteGramatical2 = ReporteGramatical.getInstance().lista2;
        // ejecucion.imprimirErrores();
        //this.salida = ejecucion.getSalida();
        
        
        this.notificar("primary", "Todo bien");
        
      } catch (error) {
        this.validarError(error, ErrorDelTry)
      }
      this.errores = Errores.getInstance().lista;
      this.entornos = Entornos.getInstance().lista;
    },
    ejecutarDESC() {
      
      /*if (this.code.trim() == "") {
        
        this.notificar("secundary", `Ingrese algo de código`);
        return;
      }*/
      this.inicializarValores();
      let ErrorDelTry=0;

      //PRIMERO PARSEAR EL XML
      try {
        AnalizadorXMLDESC.parse(this.codexml);        
        this.notificar("primary", "XML sintactico, lexico leido con éxito");
        
      } catch (error) {
        this.validarError(error,1);
        ErrorDelTry=1;
      }

      //SEGUNDO PARSEAR XPATH

      try {
        AnalizadorXPATH.parse(this.code);        
        this.notificar("primary", "XPATH sintactico, lexico leido con éxito");
        
      } catch (error) {
        this.validarError(error,2);
        ErrorDelTry=2;
      }
      
      try {
        const raiz = AnalizadorXPATH.parse(this.code);
        const raizXML = AnalizadorXMLDESC.parse(this.codexml);
        
        
        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No fue posible obtener la raíz de la ejecución"
          );
          return;
        }
        if (raizXML == null) {
          this.notificar(
            "negative",
            "XML: No fue posible obtener la raíz de la ejecución"
          );
          return;
        }
        
        
        let ejecucion = new Ejecucion(raiz, raizXML,raiz);
        this.dot = ejecucion.getDot();
        this.dotxml = ejecucion.getDotXML();
        this.dotxpath=ejecucion.getDot();
        
        
        //Valido si puedo ejecutar (no deben existir funciones anidadas)
        if(!ejecucion.puedoEjecutar(raizXML)){
          this.notificar("primary", "No se puede realizar una ejecución con funciones anidadas");
          return;
        }
        ejecucion.ejecutar();
        this.reporteGramatical = ReporteGramatical.getInstance().lista;
        this.reporteGramatical2 = ReporteGramatical.getInstance().lista2;
        // ejecucion.imprimirErrores();
        //this.salida = ejecucion.getSalida();
        
        
        this.notificar("primary", "Todo bien");
        
      } catch (error) {
        this.validarError(error, ErrorDelTry)
      }
      this.errores = Errores.getInstance().lista;
      this.entornos = Entornos.getInstance().lista;
    },

    inicializarValores() {
      Errores.getInstance().clear();
      Entornos.getInstance().clear();
      ReporteGramatical.getInstance().clear();
      this.reporteGramatical = [];
      this.reporteGramatical2 = [];
      this.errores = [];
      this.entornos = [];
      this.salida = [];
      this.dot = '';
      this.dotxpath = '';
      this.dotxml='';
    },
    validarError(error, num) {
      const json = JSON.stringify(error);
      
      const objeto = JSON.parse(json);
      if (num==1){
        this.notificar(
        "negative",
        `XML>No fue posible recuperarse de un error`
      );
        if (
          objeto != null &&
          objeto instanceof Object &&
          objeto.hasOwnProperty("hash")
        ) {
          Errores.getInstance().push(
            new InstanciaError({
              tipo: "sintactico",
              linea: objeto.hash.loc.first_line,
              descripcion: `XML> No se esperaba el token: "${objeto.hash.token}" en la columna ${objeto.hash.loc.last_column}, se esperaba uno de los siguientes: ${objeto.hash.expected}`,
            })
          );
        }
      }else if(num==2){
        this.notificar(
        "negative",
        `XPATH>No fue posible recuperarse de un error`
      );
          if (
          objeto != null &&
          objeto instanceof Object &&
          objeto.hasOwnProperty("hash")
        ) {
          Errores.getInstance().push(
            new InstanciaError({
              tipo: "sintactico",
              linea: objeto.hash.loc.first_line,
              descripcion: `XPATH> No se esperaba el token: "${objeto.hash.token}" en la columna ${objeto.hash.loc.last_column}, se esperaba uno de los siguientes: ${objeto.hash.expected}`,
            })
          );
        }
      }else{
        this.notificar(
        "negative",
        `No fue posible recuperarse de un error`
      );

        if (
        objeto != null &&
        objeto instanceof Object &&
        objeto.hasOwnProperty("hash")
      ) {
        Errores.getInstance().push(
          new InstanciaError({
            tipo: "sintactico",
            linea: objeto.hash.loc.first_line,
            descripcion: `No se esperaba el token: "${objeto.hash.token}" en la columna ${objeto.hash.loc.last_column}, se esperaba uno de los siguientes: ${objeto.hash.expected}`,
          })
        );
      }

      }
    },
    codigoEditado(codigo){
      this.inicializarValores();
    },
    limpiar(){
      this.code = '';
      this.inicializarValores();
    }
  },
};
</script>

<style lang="css">
.CodeMirror {
  height: 500px;
}
</style>

