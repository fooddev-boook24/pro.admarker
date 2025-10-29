<script setup lang="ts">
const props = defineProps({
    dataStore: Object
});
</script>

<template>
  <v-app-bar color="header"  density="compact"> 
    <v-app-bar-title class="text-center text-subtitle-1 font-weight-black">
      <nuxt-link to="/virtual-office">
        スマートリング徹底比較！
      </nuxt-link>
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
/deep/ a{
  text-decoration: none;
  color: white;
}
</style>