<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { smartRingDataStore } from "@/stores/smartRingData"
const store = smartRingDataStore()

const route = useRoute()
const price = route.query.price=="価格"?"指定なし":route.query.price
const weight = route.query.weight=="重量"?"指定なし":route.query.weight
const health = route.query.health=="スリープヘルス"?"指定なし":route.query.health
const pay = route.query.pay=="決済機能"?"指定なし":route.query.pay
const charge = route.query.charge=="充電"?"指定なし":route.query.charge

var filters=""


if(price!="指定なし"){
  filters += "[and]searchParam1[contains]"+String(price)
}
if(weight!="指定なし"){
  filters += "[and]searchParam2[contains]"+String(weight)
}
if(health!="指定なし"){
  filters += "[and]searchParam3[contains]"+String(health)
}
if(pay!="指定なし"){
  filters += "[and]searchParam4[contains]"+String(pay)
}
if(charge!="指定なし"){
  filters += "[and]searchParam5[contains]"+String(charge)
}

const queries = {
    limit: 10, 
    filters: 'pageCategory[equals]smart-ring' + filters
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
          <td><span class="font-weight-bold">{{ price }}</span></td>
          <td><span class="font-weight-bold">{{ touki }}</span></td>
          <td><span class="font-weight-bold">{{ koza }}</span></td>
          <td><span class="font-weight-bold">{{ kaigi }}</span></td>
          <td><span class="font-weight-bold">{{ place }}</span></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</div>

<div class="mt-10">
  <Section0103Common :data="data" :dataStore="store"></Section0103Common>
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