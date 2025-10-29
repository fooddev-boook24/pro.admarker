<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const props = defineProps({
    data: {},
    dataStore: Object
});

const data1 = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:{
    limit: 5, 
    orders: '-servicePoints',
    filters: 'pageCategory[equals]smart-ring'
  }
});
const data2 = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:{
    limit: 5, 
    orders: 'tabRank2',
    filters: 'pageCategory[equals]smart-ring'
  }
});
const data3 = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:{
    limit: 5, 
    orders: 'tabRank3',
    filters: 'pageCategory[equals]smart-ring'
  }
});
const data4 = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:{
    limit: 5, 
    orders: 'tabRank4',
    filters: 'pageCategory[equals]smart-ring'
  }
});

const tab = ref("one")

function touchless(){
  return false;
}


</script>

<template>

<div class="px-2">

<v-card>
  <v-tabs
    v-model="tab"
    align-tabs="center"
    class="my-disable-swipe"
    fixed-tabs
    swipeable="false"
    
  >
    <v-tab value="one" class="font-weight-bold">{{ dataStore.sec03Tab.tab1 }}</v-tab>
    <v-tab value="two" class="font-weight-bold">{{ dataStore.sec03Tab.tab2 }}</v-tab>
    <v-tab value="three" class="font-weight-bold">{{ dataStore.sec03Tab.tab3 }}</v-tab>
    <v-tab value="four" class="font-weight-bold">{{ dataStore.sec03Tab.tab4 }}</v-tab>
  </v-tabs>

  <v-card-text class="mt-n2">
    <v-window v-model="tab" :touch="touchless()">

      <v-window-item value="one">
        <SectionSmartring03Common :data="data1" :dataStore="dataStore"></SectionSmartring03Common>
      </v-window-item>

      <v-window-item value="two">
        <SectionSmartring03Common :data="data2" :dataStore="dataStore"></SectionSmartring03Common>
        
      </v-window-item>

      <v-window-item value="three">
        <SectionSmartring03Common :data="data3" :dataStore="dataStore"></SectionSmartring03Common>
      </v-window-item>

      <v-window-item value="four">
        <SectionSmartring03Common :data="data4" :dataStore="dataStore"></SectionSmartring03Common>
      </v-window-item>

    </v-window>
  </v-card-text>
</v-card>


</div>



</template>

<style scoped>


.v-btn.v-tab{
  border: 2px solid #DFE0E2;
  border-top-left-radius: 8px!important;
  border-top-right-radius: 8px!important;
}
.v-card-text{
  padding: 10px 4px;
}
.v-slide-group-item--active{
  background-color: #1b3c65;
  color: white;
}
.my-disable-swipe {
  touch-action: none;
}
</style>