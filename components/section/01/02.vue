<script setup lang="ts">
const props = defineProps({
    dataStore: Object
});


</script>

<template>

<div class="mt-n15 ">
  <v-container class="px-10">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="4">
        <v-sheet
        class="align-center"
        color=""
        height="90"
        width="90"

        >
          <div class="centered-text text-primary font-weight-bold  text-h3 my-box" >目的</div>
        </v-sheet>
      </v-col>


      <v-col cols="4">
        <v-sheet
        class="align-center"
        color=""
        height="90"
        width="90"

        >
          <div class="centered-text text-primary font-weight-bold  text-h3 my-box">料金</div>
        </v-sheet>
      </v-col>

      <v-col cols="4">
        <v-sheet
        class="align-center"
        color=""
        height="90"
        width="90"
        >
          <div class="centered-text text-primary font-weight-bold  text-h3 my-box">複数<br>比較</div>
        </v-sheet>
      </v-col>
    </v-row>

    <div class="mt-10">
      <div class="text-center font-weight-bold">{{ dataStore.sec02.title1 }}</div>
      <div class="text-center font-weight-bold">{{ dataStore.sec02.title2 }}</div>
    </div>
  </v-container>

</div>



</template>

<style scoped>
.my-box {
    box-shadow: 4px 4px;
}
</style>