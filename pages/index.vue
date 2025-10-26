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
  <v-col cols="0" sm="3" md="3" lg="3" xl="3" class="d-none d-sm-block"></v-col>

  <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex justify-center">
    <!-- ここがスマホ幅に固定される -->
    <div class="mobile-width">
      <Fv01 :dataStore="store" />
      <Fv0102 :dataStore="store" />
      <Fv0103 :dataStore="store" />
      <Section01 :dataStore="store" />
      <Section0102 :dataStore="store" />
      <Section0103 :dataStore="store" />
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
  max-width: 480px;     /* 固定上限：スマホ幅 */
  width: 100%;          /* SPでは自然に全幅 */
  margin: 0 auto;       /* 中央寄せ */
}

/* 好みで、少し伸縮させたい場合は clamp 版 */
@media (min-width: 600px) {
  .mobile-width {
    max-width: 100%;
    padding-inline: 0; /* 左右の余白なし */
  }
}
</style>