<script setup lang="ts">
// import { virtualOfficeDataStore } from "@/stores/virtualOfficeData"
// const store = virtualOfficeDataStore()
const props = defineProps({
    dataStore: Object
});

const sel1=ref(props.dataStore.fv02.select01)
const sel2=ref(props.dataStore.fv02.select02)
const sel3=ref(props.dataStore.fv02.select03)
const sel4=ref(props.dataStore.fv02.select04)
const sel5=ref(props.dataStore.fv02.select05)
const url= ref("/virtual-office/search?price=")

</script>

<template>
<div class="mt-n10 ">

<v-sheet
  class="pa-2 mx-4 my-border"
  color="grey-lighten-3"
  rounded="rounded"
>

<div class="text-center font-weight-bold mb-2">{{ dataStore.fv02.title1 }}</div>

<v-row>
  <v-col cols="6">
    <v-select
    label=""
    :value="dataStore.fv02.select01"
    :items="dataStore.fv02.selectValue01"
    v-model="sel1"
    variant="outlined"
    ></v-select>
  </v-col>

  <v-col cols="6">
    <v-select
    label=""
    :value="dataStore.fv02.select02"
    :items="dataStore.fv02.selectValue02"
    v-model="sel2"
    variant="outlined"
    ></v-select>
  </v-col>
</v-row>

<v-row class="mt-n10">
  <v-col cols="6">
    <v-select
    label=""
    :value="dataStore.fv02.select03"
    :items="dataStore.fv02.selectValue03"
    v-model="sel3"
    variant="outlined"
    ></v-select>
  </v-col>

  <v-col cols="6">
    <v-select
    label=""
    :value="dataStore.fv02.select04"
    :items="dataStore.fv02.selectValue04"
    v-model="sel4"
    variant="outlined"
    ></v-select>
  </v-col>
</v-row>

<v-row class="mt-n10">
  <v-col cols="6">
    <v-select
    label=""
    :value="dataStore.fv02.select05"
    :items="dataStore.fv02.selectValue05"
    v-model="sel5"
    variant="outlined"
    ></v-select>
  </v-col>

  <v-col cols="6">
    <v-btn :href="url+sel1+'&touki='+sel2+'&koza='+sel3+'&kaigi='+sel4+'&place='+sel5"
      block color="gray" class="mt-1 font-weight-bold" >
      <span class="">検索する</span>
    </v-btn>
  </v-col>
</v-row>

</v-sheet>
</div>

</template>

<style scoped>
.my-border{
  border: 2px solid #DFE0E2;
}
</style>