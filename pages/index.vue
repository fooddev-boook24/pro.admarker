<script setup lang="ts">
import { ref } from 'vue';
import { smartRingDataStore } from "@/stores/smartRingData"
const store = smartRingDataStore()
useHead({ 
    title: '【2025版】おすすめスマートリング 徹底比較' ,
    meta: [
        { name: 'description', content: 'おすすめのスマートリングを徹底比較し、あなたに最適なスマートリングを紹介します。' }
    ],
})
</script>

<template>

<v-row>
  <v-col cols="0" sm="3" md="3" lg="3" xl="3" class="d-none d-sm-block"></v-col>

  <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex justify-center">
    <!-- ここがスマホ幅に固定される -->
    <div class="mobile-width">
      <FvSmartring01 :dataStore="store" />
      <FvSmartring02 :dataStore="store" />
      <FvSmartring03 :dataStore="store" />
      <SectionSmartring01 :dataStore="store" />
      <SectionSmartring02 :dataStore="store" />
      <SectionSmartring03 :dataStore="store" />
    </div>
  </v-col>

  <v-col cols="0" sm="3" md="3" lg="3" xl="3" class="d-none d-sm-block"></v-col>
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
<style scoped>
/* スマホ幅に固定（必要なら数値を調整） */
.mobile-width {
  max-width: 580px;     /* 固定上限：スマホ幅 */
  width: 100%;          /* SPでは自然に全幅 */
  padding-inline: 16px; /* 左右の内側余白（好みで） */
  margin: 0 auto;       /* 中央寄せ */
}

/* 好みで、少し伸縮させたい場合は clamp 版 */
@media (min-width: 600px) {
  .mobile-width {
    max-width: clamp(360px, 45vw, 480px);
  }
}
</style>