<script setup lang="ts">
import { ref } from 'vue';
import { virtualOfficeDataStore } from "@/stores/virtualOfficeData"
const store = virtualOfficeDataStore()
useHead({ 
    title: '【2024年版】おすすめバーチャルオフィス 徹底比較' ,
    meta: [
        { name: 'description', content: 'おすすめのバーチャルオフィスを徹底比較し、あなたに最適なバーチャルオフィスを紹介します。' }
    ],
})
</script>

<template>

  <v-row>

    <v-col cols="0" sm="3" md="3" lg="3" xl="3" 
            class="d-none d-sm-block"
    ></v-col>

    <v-col cols="12" sm="6" md="6" lg="6" xl="6">
      <Fv01 :dataStore="store"></Fv01>
      <Fv0102 :dataStore="store"></Fv0102>
      <!-- <Fv0102Pr></Fv0102Pr> -->
      <Fv0103 :dataStore="store"></Fv0103>

      <Section01 :dataStore="store"></Section01>
      <Section0102 :dataStore="store"></Section0102>
      <Section0103 :dataStore="store"></Section0103>



    </v-col>

    <v-col cols="0" sm="3" md="3" lg="3" xl="3" 
            class="d-none d-sm-block"
    ></v-col>

  </v-row>













</template>



<style>
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}




</style>