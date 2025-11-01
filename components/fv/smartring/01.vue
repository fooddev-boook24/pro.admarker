<script setup lang="ts">
const year = String(new Date().getFullYear())
const month = String(new Date().getMonth()+1)
const date = String(new Date().getDate())
const today = year + "年" + month + "月" + date +"日"

const props = defineProps({
    dataStore: Object
});



</script>

<template>
  <HeaderSmartring01></HeaderSmartring01>

  <div class="bg-secondary">
    <v-container class="maxWidth">
        <v-row class="justify-space-between">
            <v-col cols="6" class="text-no-wrap" style="z-index: 1;">
              <v-chip
                class="mt-2 py-6 bg-yellow"
                color="yellow"
                label
              >
              <div class="text-white font-weight-bold">{{ today }}<br>最新版</div>
              </v-chip>            
              <h2 class="text-h3 text-primary font-weight-bold mt-2">{{ dataStore.fvData.title1 }}<br>{{ dataStore.fvData.title2 }}</h2>
              <div class="mt-2"></div>
              <span class="bg-primary pa-1 px-4 text-h4 font-weight-bold" >{{ dataStore.fvData.subtitle }}</span>
              <div class="mb-12"></div>
            </v-col>
            <v-col cols="6" style="z-index: 0;">
                <div class="d-flex justify-end align-center">
                    <!-- <v-img  cover height="150" width="250" :src="dataStore.fvData.img" alt="image"  ></v-img> -->
                     <v-img
                      :src="dataStore.fvData.img"
                      alt="image"
                      width="250"
                      height="150"
                      class="fixed-img"
                    />
                </div>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<style scoped>
h2{
  text-shadow: 1px 1px 1px;
}
</style>