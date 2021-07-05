<template>
  <div class="bg-grey-10 text-black">
    <q-list dark bordered separator dense v-if="entornos != null">
      <q-item
        v-ripple
        v-for="(entorno, indexEntorno) in entornos"
        :key="indexEntorno"
      >
        <q-item-section class="q-pb-md">
          <!-- Banner que identifica el entorno -->
          <q-banner class="bg-grey text-white row">
            Entorno {{ indexEntorno + 1 }}
          </q-banner>          
          <!-- Funciones -->
          <q-item-label class="q-pt-md">« ETIQUETAS »</q-item-label>
          <q-item-section style="white-space:pre"
            caption
            v-for="(funcion, indexFuncion) in entorno['etiquetas']"
            :key="`fn-${indexFuncion}`"
            >{{ "\n"+funcion[1].recorrer("GLOBAL",0) }}
            
          </q-item-section>
          
          <q-item-label class="q-pt-md">« SIMBOLOS »</q-item-label>
          <q-item-section style="white-space:pre"
            caption
            v-for="(funcion, indexFuncion) in entorno['simbolos']"
            :key="`fn-${indexFuncion}`"
            >{{funcion[1].recorrer() }}
            
          </q-item-section>

          <q-item-label class="q-pt-md">« FUNCIONES »</q-item-label>
          <q-item-section style="white-space:pre"
            caption
            v-for="(funcion, indexFuncion) in entorno['funciones']"
            :key="`fn-${indexFuncion}`"
            >{{funcion[1].recorrer() }}
            
          </q-item-section>
          
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    entornos: {
      required: true,
      type: Array,
      default: [],
    },
  },
};
</script>
