<template>
  <q-page class="constrain q-pa-lg" style="border:0px;margin-right:0;margin-left:0;max-width:100%;">
    <div class="row">
      <div class="col-12">
        <q-btn-group push spread>
        </q-btn-group>

        <!-- Q-DIALOG para el CST XML ascendente -->
        <q-dialog
          v-model="darkDialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <div>CST - XML Ascendente</div>

              <q-space />

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            
            <q-card-section class="q-pt-none">
              <ast :dot="dot" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Q-DIALOG  para el AST XPATH ascendente -->
        <q-dialog
          v-model="darkDialog2"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <div>AST - XPATH Ascendente</div>

              <q-space />

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            
            <q-card-section class="q-pt-none">
              <ast :dot="dot2" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Q-DIALOG  para el AST XPATH descendente -->
        <q-dialog
          v-model="darkDialog4"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <div>AST - XPATH Descendente</div>

              <q-space />

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            
            <q-card-section class="q-pt-none">
              <ast :dot="dot3" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Q-DIALOG  para el AST XPATH descendente -->
        <q-dialog
          v-model="darkDialog55"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <div>AST - XQUERY</div>

              <q-space />

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            
            <q-card-section class="q-pt-none">
              <ast :dot="dot5" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Q-DIALOG para el CST XML descendente -->
        <q-dialog
          v-model="darkDialog3"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-bar>
              <div>CST - XML Descendente</div>

              <q-space />

              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            
            <q-card-section class="q-pt-none">
              <ast :dot="dot4" />
            </q-card-section>
          </q-card>
        </q-dialog>

      </div>
    </div>

    

    <!-- Editor de codigo -->    
    <div class="row justify-content-center q-ma-lg">
      <div class="col-12">
        <!-- ROW correspondiente al Xpath -->
        <div class="row">
          <div class="col-md-12" style="width:100%">
          <q-card class="editorXML" style="width:auto">
            <q-bar class="bg-black text-white" style="width:auto">
                <div class="q-ml-md cursor-pointer non-selectable">
                  <q-btn push label="Ejecutar XPATH" icon="play_arrow" />
                  <q-menu auto-close>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click="ejecutarXPath">Ascendente</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="ejecutarXPath_DESC">Descendente</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>   
                <div class="q-ml-md cursor-pointer non-selectable">
                  <q-btn push label="AST-XPATH" icon="account_tree" />
                  <q-menu auto-close>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click="darkDialog2 = true">Ascendente</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="darkDialog4 = true">Descendente</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="darkDialog55 = true">Xquery</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>  
              <q-space />
                <q-btn push label="Ejecutar XQUERY" icon="play_arrow" @click="ejecutarXQuery" />
              <q-space />
              <q-btn push label="Limpiar" icon="cleaning_services" @click="limpiarXP" />
            </q-bar>              
            <codemirror v-model="codeXP" :options="cmOptionsXP" />              
          </q-card>
          </div>
        </div>
        <!-- ROW correspondiente al XML y resultados -->
        <div class="row">
          <!-- COL del XML -->
          <div class="col-md-6" style="width:50%">
            <q-card class="editorXML" style="width:auto">
              <q-bar class="bg-black text-white" style="width:auto">
                <div class="q-ml-md cursor-pointer non-selectable">
                  <q-btn push label="Ejecutar XML" icon="play_arrow" />
                  <q-menu auto-close>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click="ejecutar">Ascendente</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="ejecutarXMLDesc">Descendente</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>   
                <div class="q-ml-md cursor-pointer non-selectable">
                  <q-btn push label="CST-XML" icon="account_tree" />
                  <q-menu auto-close>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click="darkDialog = true">Ascendente</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="darkDialog3 = true">Descendente</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>                
                <q-space />
                <q-btn push label="Limpiar" icon="cleaning_services" @click="limpiar" />
              </q-bar>              
              <codemirror v-model="code" :options="cmOptions" @input="codigoEditado" />              
            </q-card>
          </div>
          <!-- COL del resultado de consultas -->
          <div class="col-md-6" style="width:50%">
            <q-card class="salidaXML" style="width:auto">
              <q-bar class="text-white" style="background-color: #008803; width:auto">           
                <div class="text-weight-bold" icon="done">
                  Salida
                </div>
              </q-bar>              
              <codemirror v-model="codeS" :options="cmOptionsS" />              
            </q-card>
          </div>
        </div>
        <!-- ROW correspondiente al C3D -->
        <div class="row">
          <div class="col-md-12" style="width:100%">
          <q-card class="editorXML" style="width:auto">
            <q-bar class="bg-black text-white" style="width:auto">
              <div class="q-ml-md cursor-pointer non-selectable">
                  <q-btn push label="Traducir" icon="translate" />
                  <q-menu auto-close>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click="traduccionXML">XML</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="traduccionXPATH">XPATH</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="traduccionXQUERY">XQUERY</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>
                <q-btn push label="Optimizar" icon="code" @click="Optimizar" />
                <q-space />
                <q-space />
              <q-btn push label="Limpiar" icon="cleaning_services" @click="limpiar3D" />
            </q-bar>              
            <codemirror v-model="code3D" :options="cmOptions3D" />              
          </q-card>
          </div>
        </div>
        <q-card class="my-card2">
          <q-splitter
            v-model="splitterModel"
            style="height: auto"
          >

            <template v-slot:before>
              <q-tabs
                v-model="tab"
                vertical
                class="bg-black text-white"
                align="justify"
              >
                <q-tab label="Errores" name="errores" />
                <q-tab
                  label="Tabla de Símbolos"
                  name="tabla_de_simbolos"
                />
                <q-tab label="Reporte Gramatical XML Asc" name="rep_gram"></q-tab>
                <q-tab label="Reporte Gramatical XML Desc" name="rep_gram_desc"></q-tab>
                <q-tab label="Reporte Optimizacion" name="rep_optimizacion"></q-tab>
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >

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

                <q-tab-panel name="tabla_de_simbolos" v-if="simbolos != null && simbolos.length > 0">
                  <div class="q-pa-md">
                    <q-table
                      title="Tabla de Simbolos"
                      :data="simbolos"
                      :columns="columnsTS"
                      row-key="name"
                      dark
                      color="amber"
                      dense
                      :pagination="{ rowsPerPage: 0 }"
                      rows-per-page-label="Simbolos por página"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="rep_gram" v-if="repgramascxml != null && repgramascxml.length > 0">
                  <div class="q-pa-md">
                    <q-table
                      title="Reporte Gramatical XML Ascendente"
                      :data="repgramascxml"
                      :columns="colascxml"
                      row-key="name"
                      dark
                      color="amber"
                      dense
                      :pagination="{ rowsPerPage: 0 }"
                      rows-per-page-label="Reporte gramatical por página"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="rep_gram_desc" v-if="repgramdescxml != null && repgramdescxml.length > 0">
                  <div class="q-pa-md">
                    <q-table
                      title="Reporte Gramatical XML Descendente"
                      :data="repgramdescxml"
                      :columns="coldescxml"
                      row-key="name"
                      dark
                      color="amber"
                      dense
                      :pagination="{ rowsPerPage: 0 }"
                      rows-per-page-label="Reporte gramatical por página"
                    />
                  </div>
                </q-tab-panel>

                 <q-tab-panel name="rep_optimizacion" v-if="repoptimizar != null && repoptimizar.length > 0">
                  <div class="q-pa-md">
                    <q-table
                      title="Reporte de Optimización"
                      :data="repoptimizar"
                      :columns="colOptimizar"
                      row-key="name"
                      dark
                      color="amber"
                      dense
                      :pagination="{ rowsPerPage: 0 }"
                      rows-per-page-label="Reporte de Optimización"
                    />
                  </div>
                </q-tab-panel>
                
              </q-tab-panels>
            </template>

          </q-splitter>
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
import "codemirror/theme/abcdef.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/paraiso-dark.css";
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/midnight.css';
// import language js
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/xquery/xquery.js";
import "codemirror/mode/clike/clike.js";
// Analizador
import AXml from '../analizador/gramaticas/GramAscXML';
import AXMLTree from '../analizador/gramaticas/GramAscXMLTree'
import AXMLDesc from '../analizador/gramaticas/GramDescXML';
import AXpath from '../analizador/gramaticas/gramatica_ASC_XPATH';
import DXpath from '../analizador/gramaticas/gramatica_DESC_XPATH';
import AXQUERY from '../analizador/gramaticas/gramatica_XQUERY';
//Ejecucion
import { Errores } from "../analizador/arbol/errores";
import { Error as InstanciaError } from "../analizador/arbol/error";
import { Ejecucion } from "../analizador/ejecucion";
import { RepGramAscXML } from '../analizador/Reportes/RepGramAscXML';
import { RepGramDescXML } from '../analizador/Reportes/RepGramDescXML';
//Traducción
import { Traduccion } from "../analizador/Traduccion";
//Optimización 
import AXOPTIMIZAR from "../analizador/gramaticas/gramatica_Optimizacion";
import {Rep_Optimizar} from '../analizador/Reportes/Rep_Optimizar';
import {Optimizar} from "../analizador/optimizar";

export default {
  components: {
    codemirror,
    ast: require("../components/Ast").default,
  },
  data() {
    return {
      splitterModel: 20, // start at 50%
      insideModel: 50,
      darkDialog: false,
      darkDialog2: false,
      darkDialog3: false,
      darkDialog4: false,
      darkDialog55: false,
      maximizedToggle: true,
      codeXP: "",
      cmOptionsXP: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "xquery",
        theme: "paraiso-dark",
        lineNumbers: true,
        line: false,
        indentWithTabs: true,
        lineWrapping: true,
        fixedGutter: true,
      },
      code: "",
      cmOptions: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "text/xml",
        theme: "abcdef",
        lineNumbers: true,
        line: false,
        indentWithTabs: true,
        lineWrapping: true,
        fixedGutter: true,     
      },
      codeS: "",
      cmOptionsS: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "text/xml",
        theme: "the-matrix",
        lineNumbers: true,
        line: false,
        indentWithTabs: true,
        lineWrapping: true,
        fixedGutter: false,
      },
      code3D: "",
      cmOptions3D: {
        tabSize: 4,
        matchBrackets: true,
        styleActiveLine: true,
        mode: "text/x-c++src",
        theme: "seti",
        lineNumbers: true,
        line: false,
        indentWithTabs: true,
        lineWrapping: true,
        fixedGutter: true,
      },
      output: "salida de ejemplo",
      tab: "editor",
      dot: "",
      dot2: "",
      dot3: "",
      dot4: "",
      dot5: "",
      salida: [],
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
      simbolos: [],
      columnsTS: [
        { name: "identificador", label: "Identificador", field: "identificador", align: "left" },
        { name: "valor", label: "Valor", field: "valor", align: "left" },
        { name: "ambito", label: "Ambito", field: "ambito", align: "left" },
        { name: "tipo", label: "Tipo", field: "tipo", align: "left" },
        { name: "linea", label: "Linea", field: "linea", align: "left" },
        { name: "columna", label: "Columna", field: "columna", align: "left" },
        { name: "direccion", label: "Direccion", field: "direccion", align: "left" },
      ],
      repgramascxml: [],
      repgramdescxml: [],
      colascxml: [
        { name: "produccion", label: "Producción", field: "produccion", align: "left"},
        { name: "reglas", label: "Reglas", field: "reglas", align: "left" },
      ],
      coldescxml: [
        { name: "produccion", label: "Producción", field: "produccion", align: "left"},
        { name: "reglas", label: "Reglas", field: "reglas", align: "left" },
      ],
      repoptimizar:[],
      colOptimizar : [
        {name: "tipo", label: "Tipo", field: "tipo", align: "left"},
        {name: "regla", label: "Regla", field: "regla", align: "left"},
        {name: "eliminado", label: "Codigo Eliminado", field: "eliminado", align: "left"},
        {name: "nuevo", label: "Codigo Agregado", field: "nuevo", align: "left"},
        {name: "fila", label: "Fila", field: "fila", align: "left"},
      ],
      xmlXP: null,
      xmlXPDesc: null
    };
  },
  methods: {
    notificar(variant, message) {
      this.$q.notify({
        message: message,
        color: variant,
        multiLine: true,
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
      if (this.code.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores();
      try {
        const raiz = AXml.parse(this.code);

        //Para el árbol CST
        const raizxml = AXMLTree.parse(this.code);

        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }

        this.xmlXP = raiz;
        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code);

        //Nueva ejecución para el arbol CST
        let exec = new Ejecucion(raiz.prologo, raiz.cuerpo, this.code, raizxml);
        this.dot = exec.getDot();

        ejecucion.verObjetos();
        this.dataTS(ejecucion.ts.tabla);
        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      this.repgramascxml = RepGramAscXML.getInstance().lista;
      //this.simbolos = ejecucion.verObjetos();
      //console.log(this.simbolos);
    },
    ejecutarXPath() {
      if (this.codeXP.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores2();
      try {
        const raiz = AXpath.parse(this.codeXP);

        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }

        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code, raiz);
        this.dot2 = ejecucion.getDot();

        ejecucion.verObjetos();
        this.dataTS(ejecucion.ts.tabla);
        this.codeS = ejecucion.recorrer();

        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      //this.entornos = Entornos.getInstance().lista;
    },
    ejecutarXPath_DESC() {
      if (this.codeXP.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores3();
      try {
        const raiz = DXpath.parse(this.codeXP);

        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }

        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code, raiz);
        this.dot3 = ejecucion.getDot();
        console.log(raiz);

        this.codeS = ejecucion.recorrer();

        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      //this.entornos = Entornos.getInstance().lista;
    },
    ejecutarXMLDesc() {
      if (this.code.trim() == "") 
      {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores4();
      try {
        //Para validar la ejecución
        const raiz = AXml.parse(this.code);

        //Llamado al parser XML - Desc
        const raizdesc = AXMLDesc.parse(this.code);

        //Validacion de raiz
        if (raizdesc == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );

          return;
        }

        //Para la funcionalidad
        this.xmlXP = raiz;
        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code);

        //Se llama a Ejecución para conseguir el dot
        let exec = new Ejecucion(raizdesc.prologo, raizdesc.cuerpo, this.code, raizdesc);
        this.dot4 = exec.getDot();

        ejecucion.verObjetos();
        this.dataTS(ejecucion.ts.tabla);
        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      this.repgramdescxml = RepGramDescXML.getInstance().lista;
    },
    ejecutarXQuery() {
      if (this.codeXP.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores5();
      try {
        const raiz = AXQUERY.parse(this.codeXP);

        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }
        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code, raiz);
        this.dot5 = ejecucion.getDot();

        ejecucion.verObjetos();
        //this.dataTS(ejecucion.ts.tabla);
        this.codeS = ejecucion.recorrer();
        this.simbolos = [];
        this.dataTS(ejecucion.ts.tabla);
        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
       // console.log(error);
      }
      this.errores = Errores.getInstance().lista;
      //this.entornos = Entornos.getInstance().lista;
    },
    /*inicializarValores corresponde a ejecutar*/
    inicializarValores() {
      Errores.getInstance().clear();
      //Entornos.getInstance().clear();
      RepGramAscXML.getInstance().clear();
      this.errores = [];
      this.simbolos = [];
      this.salida = [];
      this.dot = '';
      this.repgramascxml = [];
    },
    /*inicializarValores corresponde a ejecutarXPath*/
    inicializarValores2() {
      Errores.getInstance().clear();
      this.errores = [];
      this.simbolos = [];
      this.dot2 = '';
    },
    /*inicializarValores corresponde a ejecutarXPath_DESC*/
    inicializarValores3() {
      Errores.getInstance().clear();
      this.errores = [];
      this.dot3 = '';
    },
    /*inicializarValores4 corresponde a ejecutarXMLDesc*/
    inicializarValores4() {
      Errores.getInstance().clear();
      RepGramDescXML.getInstance().clear();
      this.errores = [];
      this.simbolos = [];
      this.dot4 = '';
      this.repgramdescxml = [];
    },
    /*inicializarValores5 corresponde a ejecutarXQuery*/
    inicializarValores5() {
      Errores.getInstance().clear();
      this.errores = [];
      this.dot5 = '';
    },
    /*inicializarValores4 corresponde a Optimizar*/
    inicializarValores6() {
      Errores.getInstance().clear();
      Rep_Optimizar.getInstance().clear();
      this.errores = [];
      this.repoptimizar = [];
    },
    validarError(error) {
      const json = JSON.stringify(error);
      this.notificar(
        "negative",
        `Se encontraron errores sintácticos, revise el apartado de errores.`
      );
      const objeto = JSON.parse(json);

      if (
        objeto != null &&
        objeto instanceof Object &&
        objeto.hasOwnProperty("hash")
      ) {
        Errores.getInstance().push(
          new InstanciaError({
            tipo: "sintáctico",
            linea: objeto.hash.loc.first_line,
            descripcion: `Se encontró el token ${objeto.hash.token} en lugar de ${objeto.hash.expected} en la columna ${objeto.hash.loc.last_column}.`,
          })
        );
      }
    },
    codigoEditado(codigo){
      this.inicializarValores();
    },
    limpiar(){
      this.code = '';
      this.codeS = '';
      this.inicializarValores();
      this.inicializarValores4();
    },
    limpiarXP(){
      this.codeS = '';
      this.codeXP = '';
      this.inicializarValores2();
      this.inicializarValores3();
    },
    limpiar3D(){
      this.code3D = '';
    },
    dataTS(arreglo){
      arreglo.forEach(element => {
        let a = ""
        if(element[1].length > 13){
          a = element[1].toString().substr(0, 13)+"...";
        }
        else{
          a = element[1];
        }
        this.simbolos.push({identificador: element[0], valor: a, ambito: element[2], tipo: element[3], linea: element[4], columna: element[5], direccion: element[7]});
      });
    },
    traduccionXML(){
      //Se realiza lo mismo que en el análisis ascendente del XML
      if (this.code.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores();
      try {
        const raiz = AXml.parse(this.code);

        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }

        this.xmlXP = raiz;
        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code);
        ejecucion.verObjetos();

        //Se llama al método traducir
        let traductor = new Traduccion(ejecucion.ts);
        this.code3D = traductor.Traducir();

        //Se actualiza la tabla de simbolos a mostrar
        this.dataTS(traductor.ts.tabla);
        
        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
    },
    traduccionXPATH(){
      //Se realiza lo mismo que en el análisis ascendente del XPATH
      if (this.codeXP.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores2();
      try {
        const raiz = AXml.parse(this.code);
        const raizxpath = AXpath.parse(this.codeXP);

        //Validacion de raiz
        if (raizxpath == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }

        this.xmlXP = raiz;
        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code, raizxpath);
        ejecucion.verObjetos();

        //Se llama al método traducir
        let traductor = new Traduccion(ejecucion.ts);
        this.code3D = traductor.TraducirXpath(this.xmlXP.prologo, this.xmlXP.cuerpo, raizxpath);

        this.dataTS(traductor.ts.tabla);

        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      //this.entornos = Entornos.getInstance().lista;
    },
    traduccionXQUERY(){
      if (this.codeXP.trim() == "") {
        this.notificar("primary", `El editor está vacío, escriba algo.`);
        return;
      }
      this.inicializarValores5();
      try {
        const raiz = AXml.parse(this.code);
        const raizxq = AXQUERY.parse(this.codeXP);

        //Validacion de raiz
        if (raizxq == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }

        this.xmlXP = raiz;
        let ejecucion = new Ejecucion(this.xmlXP.prologo, this.xmlXP.cuerpo, this.code, raizxq);
        ejecucion.verObjetos();

        //Se llama al método traducir
        let traductor = new Traduccion(ejecucion.ts);
        this.code3D = traductor.TraducirXquery(this.xmlXP.prologo, this.xmlXP.cuerpo, raizxq);

        this.dataTS(ejecucion.ts.tabla);

        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
       // console.log(error);
      }
      this.errores = Errores.getInstance().lista;
    },
     Optimizar(){
      if (this.code3D.trim() == "") 
      {
        this.notificar("primary", `El editor está vacío, traduzca algo.`);
        return;
      }
      this.inicializarValores6();
      try {

        const raiz = AXOPTIMIZAR.parse(this.code3D);
        console.log(raiz);
        //Validacion de raiz
        if (raiz == null) {
          this.notificar(
            "negative",
            "No se pudo ejecutar"
          );
          return;
        }
        let optimizar = new Optimizar(raiz);
        this.code3D = optimizar.recorrer();
        //this.code3D = beautify_js(optimizar.recorrer(), { indent_size: 2 });

        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        console.log(error);
        this.validarError(error); 
      }
      this.errores = Errores.getInstance().lista;
      this.repoptimizar = Rep_Optimizar.getInstance().lista;
    }
  },
};
</script>

<style lang="css">
.CodeMirror {
  height: auto;
}
</style>