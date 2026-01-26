<script setup lang="ts">
const props = defineProps({
    dataStore: Object
});

</script>

<template>
  <div class="bg-secondary mt-8">
  <div class="pa-6 text-h5">
    <div class="text-center font-weight-bold mt-3">
      <span class="text-primary mt-2 bg-surface pa-1">{{ dataStore.sec01.title1 }}</span><br>
      <p class="mt-3"></p>
      <span class="text-primary  bg-surface pa-1">{{ dataStore.sec01.title2 }}</span>
    </div>
    <div class="text-primary font-weight-bold mt-10 text-center">{{ dataStore.sec01.title31 }}<br>{{ dataStore.sec01.title32 }}</div>
    <div class="text-center mt-6 ">
      <span class="bg-yellow text-white text-h2 pa-2 font-weight-bold" >{{ dataStore.sec01.title4 }}</span>
    </div>
    <p class="mt-6 mb-14"></p>
  
  </div>

</div>
</template>