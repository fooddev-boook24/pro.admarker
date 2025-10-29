<template>
  <div class="mt-n15">
    <v-container class="px-10">
      <!-- 横スクロール許可（SPで幅が足りない時用） -->
      <div class="h-scroll">
        <!-- 折り返し禁止 + 中央寄せ + ギャップ制御 -->
        <v-row class="no-wrap justify-center align-center g-8">
          <v-col cols="auto" class="box-col">
            <v-sheet class="box d-flex align-center justify-center">
              <div class="text-primary font-weight-bold text-h5">目的</div>
            </v-sheet>
          </v-col>
          <v-col cols="auto" class="box-col">
            <v-sheet class="box d-flex align-center justify-center">
              <div class="text-primary font-weight-bold text-h5">料金</div>
            </v-sheet>
          </v-col>
          <v-col cols="auto" class="box-col">
            <v-sheet class="box d-flex align-center justify-center">
              <div class="text-primary font-weight-bold text-h5">複数<br>比較</div>
            </v-sheet>
          </v-col>
        </v-row>
      </div>

      <div class="mt-10">
        <div class="text-center font-weight-bold">{{ dataStore?.sec02?.title1 }}</div>
        <div class="text-center font-weight-bold">{{ dataStore?.sec02?.title2 }}</div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
/* 折り返し禁止 */
.no-wrap { flex-wrap: nowrap; }

/* 横スクロール許容（SPで幅不足時） */


/* ボックスは縮ませない＆実寸で並べる */
.box-col { flex: 0 0 auto; }        /* shrink:0; grow:0; basis:auto */
.box {
  width: 90px;
  height: 90px;
  box-shadow: 4px 4px;
  text-align: center;
}

/* 余白（PCで広め、SPでやや狭めにしたい場合は調整可）
   例） g-6 g-md-8 g-lg-10 を v-row に付ける */
</style>
