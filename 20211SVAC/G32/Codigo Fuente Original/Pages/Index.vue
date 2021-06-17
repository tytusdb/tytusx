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
        <div class="row">
          <div class="col-md-12" style="width:100%">
          <q-card class="editorXML" style="width:auto">
            <q-bar class="bg-black text-white" style="width:auto">
              <q-btn push label="Ejecutar XPATH ASC" icon="play_arrow" @click="ejecutarXPath"/>
              <q-btn push label="Ejecutar XPATH DESC" icon="play_arrow" @click="ejecutarXPath_DESC"/>
              <q-space />
              <q-btn push label="" icon="cleaning_services" @click="limpiarXP" />
            </q-bar>              
            <codemirror v-model="codeXP" :options="cmOptionsXP" />              
          </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12" style="width:100%">
            <q-bar class="text-white" style="background-color: #002B88; width:auto">           
              <q-btn push label="AST - XPATH Asc" @click="darkDialog2 = true" />
              <q-btn push label="AST - XPATH Desc" @click="darkDialog4 = true" />
              <q-btn push label="CST - XML Asc" @click="darkDialog = true" />
              <q-btn push label="CST - XML Desc" @click="darkDialog3 = true" />
            </q-bar>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6" style="width:50%">
            <q-card class="editorXML" style="width:auto">
              <q-bar class="bg-black text-white" style="width:auto">
                <q-btn push label="Ejecutar XML ASC" icon="play_arrow" @click="ejecutar" />                
                <q-btn push label="Ejecutar XML DESC" icon="play_arrow" @click="ejecutarXMLDesc" />                
                <q-space />
                <q-btn push label="Limpiar" icon="cleaning_services" @click="limpiar" />
              </q-bar>              
              <codemirror v-model="code" :options="cmOptions" @input="codigoEditado" />              
            </q-card>
          </div>
          <div class="col-md-6" style="width:50%">
            <q-card class="salidaXML" style="width:auto">
              <q-bar class="text-white" style="background-color: #008803; width:auto">           
                <q-btn push label="Salida" icon="thumb_up_alt"/>
              </q-bar>              
              <codemirror v-model="codeS" :options="cmOptionsS" />              
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
// import language js
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/xquery/xquery.js";
// Analizador
import AXml from '../analizador/gramaticas/GramAscXML';
import AXMLTree from '../analizador/gramaticas/GramAscXMLTree'
import AXMLDesc from '../analizador/gramaticas/GramDescXML';
import AXpath from '../analizador/gramaticas/gramatica_ASC_XPATH';
import DXpath from '../analizador/gramaticas/gramatica_DESC_XPATH';
//Ejecucion
import { Errores } from "../analizador/arbol/errores";
import { Error as InstanciaError } from "../analizador/arbol/error";
import { Ejecucion } from "../analizador/ejecucion";
import { RepGramAscXML } from '../analizador/Reportes/RepGramAscXML';
import { RepGramDescXML } from '../analizador/Reportes/RepGramDescXML'

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
      output: "salida de ejemplo",
      tab: "editor",
      dot: "",
      dot2: "",
      dot3: "",
      dot4: "",
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

        //Se llama a Ejecución para conseguir el dot
        let exec = new Ejecucion(raizdesc.prologo, raizdesc.cuerpo, this.code, raizdesc);
        this.dot4 = exec.getDot();

        this.notificar("primary", "Ejecución realizada con éxito");
      } catch (error) {
        this.validarError(error);
      }
      this.errores = Errores.getInstance().lista;
      this.repgramdescxml = RepGramDescXML.getInstance().lista;
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
      this.dot4 = '';
      this.repgramdescxml = [];
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
    dataTS(arreglo){
      arreglo.forEach(element => {
        let a = ""
        if(element[1].length > 13){
          a = element[1].toString().substr(0, 13)+"...";
        }
        else{
          a = element[1];
        }
        this.simbolos.push({identificador: element[0], valor: a, ambito: element[2], tipo: element[3], linea: element[4], columna: element[5]});
      });
    }
  },
};
</script>

<style lang="css">
.CodeMirror {
  height: auto;
}
</style>