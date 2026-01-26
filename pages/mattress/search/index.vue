<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { mattressDataStore } from "@/stores/mattressData"
const store = mattressDataStore()

const route = useRoute()
const sel1 = route.query.sel1=="悩み"?"指定なし":route.query.sel1
const sel2 = route.query.sel2=="硬さ"?"指定なし":route.query.sel2
const sel3 = route.query.sel3=="今の寝具"?"指定なし":route.query.sel3
const sel4 = route.query.sel4=="返金保証"?"指定なし":route.query.sel4
const sel5 = route.query.sel5=="素材"?"指定なし":route.query.sel5

var filters=""


if(sel1!="指定なし"){
  filters += "[and]searchParam1[contains]"+String(sel1)
}
if(sel2!="指定なし"){
  filters += "[and]searchParam2[contains]"+String(sel2)
}
if(sel3!="指定なし"){
  filters += "[and]searchParam3[contains]"+String(sel3)
}
if(sel4!="指定なし"){
  filters += "[and]searchParam4[contains]"+String(sel4)
}
if(sel5!="指定なし"){
  filters += "[and]searchParam5[contains]"+String(sel5)
}

const queries = {
    limit: 10, 
    filters: 'pageCategory[equals]mattress' + filters
}

console.log(queries)
  // searchParam1[contains]~1,000円[and]searchParam2[contains]あり
const data = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:queries
});

</script>



<template>

<v-row>

  <v-col cols="0" sm="3" md="3" lg="3" xl="3" 
            class="d-none d-sm-block"
  ></v-col>

<v-col cols="12" sm="6" md="6" lg="6" xl="6">

<div class="mt-4">
  <h4 class="text-center">あなたに合う<br>{{ store.fvData.title2 }}は<span class="text-primary text-h3">{{ data.data.value.totalCount }}つ</span>あります！</h4>
  <div class="px-4 mt-4">
    <v-table density="compact" class="my-table">
      <thead>
        <tr>
          <th class="text-left">
            <span class="font-weight-bold">{{ store.fv02.select01 }}</span>
          </th>
          <th class="text-left">
            <span class="font-weight-bold">{{ store.fv02.select02 }}</span>
          </th>
          <th class="text-left">
            <span class="font-weight-bold">{{ store.fv02.select03 }}</span>
          </th>
          <th class="text-left">
            <span class="font-weight-bold">{{ store.fv02.select04 }}</span>
          </th>
          <th class="text-left">
            <span class="font-weight-bold">{{ store.fv02.select05 }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        >
          <td><span class="font-weight-bold">{{ sel1 }}</span></td>
          <td><span class="font-weight-bold">{{ sel2 }}</span></td>
          <td><span class="font-weight-bold">{{ sel3 }}</span></td>
          <td><span class="font-weight-bold">{{ sel4 }}</span></td>
          <td><span class="font-weight-bold">{{ sel5 }}</span></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</div>

<div class="mt-10">
  <SectionMattress03Common :data="data" :dataStore="store"></SectionMattress03Common>
</div>
</v-col>

<v-col cols="0" sm="3" md="3" lg="3" xl="3" 
            class="d-none d-sm-block"
></v-col>


</v-row>

</template>

<style scoped>

.my-table{
  /* white-space: nowrap; */
  font-size: 0.8rem;
  -ms-overflow-style: none!important;
  scrollbar-width: none!important;
}
.my-table::-webkit-scrollbar {
  display: none;
}
.my-table th{
  white-space: nowrap;
}
th{
background-color: #1b3c65;
font-weight: bold;
border: solid 1px white;  
}
th > span{
  color: white;
}
td{
background-color: #FAFAFA;
border: solid 1px white;
}
</style>