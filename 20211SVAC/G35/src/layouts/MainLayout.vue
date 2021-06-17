<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar >
        
        <q-toolbar-title>
          OLC2
        </q-toolbar-title>

        <div>
          <q-icon name="group"/>
          GRUPO 35</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}
</script>
