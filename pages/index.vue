<script setup lang="ts">
import { ref } from 'vue';


/*tab*/
const tab = ref(null);

// theme breadcrumb
const page = ref({ title: 'Horizontal Form' });
</script>

<template>

<v-row>

<v-col cols="0" sm="3" md="3" lg="3" xl="3" 
        class="d-none d-sm-block"
></v-col>

<v-col cols="12" sm="6" md="6" lg="6" xl="6">
  <Fv01></Fv01>
  <Fv0102></Fv0102>
  <Fv0102Pr></Fv0102Pr>
  <Fv0103></Fv0103>

  <Section01></Section01>
  <Section0102></Section0102>
  <Section0103></Section0103>
</v-col>

<v-col cols="0" sm="3" md="3" lg="3" xl="3" 
        class="d-none d-sm-block"
></v-col>

</v-row>

</template>
