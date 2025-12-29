<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const props = defineProps({
  data: {},
  dataStore: Object,
})

function openInNewTab(url: string) {
  // ブラウザでのみ実行（SSR対策）
  if (process.client) {
    globalThis.open(url, '_blank', 'noopener')
  }
}


function AfiClick(serviceName) {
  window.dataLayer.push({
    event: 'AfiClick',
    serviceName: serviceName,
    page: location.pathname,
    category: 'smart-ring',
  })
}
</script>

<template>
  <v-card
    v-for="(content, index) in data.data.value.contents"
    :key="content"
    :id="`rank-${index + 1}`"
    class="rank-card mb-10"
    elevation="0"
  >
    <!-- header -->
    <div class="rank-header">
      <div class="rank-left">
        <img
          v-if="index + 1 == 1"
          src="https://res.cloudinary.com/fooddev/image/upload/v1687771865/pro.admarker/common/rank/rank-1_wk9oj3.png"
          alt="1位"
          class="rank-icon"
          width="36"
          height="36"
        />
        <img
          v-else-if="index + 1 == 2"
          src="https://res.cloudinary.com/fooddev/image/upload/v1687771866/pro.admarker/common/rank/rank-2_uh9iyi.png"
          alt="2位"
          class="rank-icon"
          width="36"
          height="36"
        />
        <img
          v-else-if="index + 1 == 3"
          src="https://res.cloudinary.com/fooddev/image/upload/v1687771865/pro.admarker/common/rank/rank-3_ookr16.png"
          alt="3位"
          class="rank-icon"
          width="36"
          height="36"
        />
        <img
          v-else-if="index + 1 == 4"
          src="https://res.cloudinary.com/fooddev/image/upload/v1687771865/pro.admarker/common/rank/rank-4_r0ulwo.png"
          alt="4位"
          class="rank-icon"
          width="36"
          height="36"
        />
        <img
          v-else-if="index + 1 == 5"
          src="https://res.cloudinary.com/fooddev/image/upload/v1687771866/pro.admarker/common/rank/rank-5_bztr3r.png"
          alt="5位"
          class="rank-icon"
          width="36"
          height="36"
        />

        <div class="rank-title">
          <div class="rank-name">{{ content.serviceName }}</div>

          <!-- ✅ rank-sub：提示コードを正として固定（変更なし） -->
          <div
            class="rank-sub"
            v-if="content.servicePrivilege1 || content.servicePrivilege2 || content.servicePrivilege3"
          >
            <span v-if="content.servicePrivilege1" class="rank-sub-item">{{
              content.servicePrivilege1
            }}</span>
            <span v-if="content.servicePrivilege2" class="rank-sub-item">{{
              content.servicePrivilege2
            }}</span>
            <span v-if="content.servicePrivilege3" class="rank-sub-item">{{
              content.servicePrivilege3
            }}</span>
          </div>
          <!-- ✅ 固定ここまで -->
        </div>
      </div>
    </div>

    <v-divider />

    <div class="rank-body">
      <!-- image -->
      <div class="hero-media" v-if="content.serviceImage?.url">
        <v-img :src="content.serviceImage.url" cover class="hero-img" />
      </div>

      <!-- ✅ POINT（あなたの“絶対の正”のデザインに固定） -->
      <v-sheet class="block" rounded="lg" border>
        <div class="block-head">
          <span class="block-title">POINT</span>
        </div>

        <ul class="point-list">
          <li v-if="content.serviceFeature1" class="point-item">
            <v-icon
              size="large"
              color="primary"
              type="mdi"
              icon="mdi-check-circle-outline"
            ></v-icon>
            <span class="point-text">{{ content.serviceFeature1 }}</span>
          </li>
          <li v-if="content.serviceFeature2" class="point-item">
            <v-icon
              size="large"
              color="primary"
              type="mdi"
              icon="mdi-check-circle-outline"
            ></v-icon>
            <span class="point-text">{{ content.serviceFeature2 }}</span>
          </li>
          <li v-if="content.serviceFeature3" class="point-item">
            <v-icon
              size="large"
              color="primary"
              type="mdi"
              icon="mdi-check-circle-outline"
            ></v-icon>
            <span class="point-text">{{ content.serviceFeature3 }}</span>
          </li>
        </ul>
      </v-sheet>
      <!-- ✅ 固定ここまで -->

      <!-- table -->
      <v-table density="compact" class="spec-table">
        <thead>
          <tr>
            <th class="text-center">
              <span class="font-weight-bold">{{ content.tableKey1 }}</span>
            </th>
            <th class="text-center">
              <span class="font-weight-bold">{{ content.tableKey2 }}</span>
            </th>
            <th class="text-center">
              <span class="font-weight-bold">{{ content.tableKey3 }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <td><span class="font-weight-bold">{{ content.tableValue1 }}</span></td>
            <td><span class="font-weight-bold">{{ content.tableValue2 }}</span></td>
            <td><span class="font-weight-bold">{{ content.tableValue3 }}</span></td>
          </tr>
        </tbody>
      </v-table>

      <!-- ✅ 機能性能：四隅丸角＋影付き（title-box1）に戻す -->
      <div class="my-box my-box-gap">
        <div class="title-box1">
          <div class="title-box1-title">機能性能</div>
          <div
            v-html="content.uniqueContents1"
            class="uniqueContents1 font-weight-bold"
          ></div>
        </div>
      </div>

      <!-- ✅ 製品仕様：四隅丸角＋影付き（title-box1）に戻す -->
      <div class="my-box my-box-gap">
        <div class="title-box1">
          <div class="title-box1-title">製品仕様</div>
          <div
            v-html="content.uniqueContents3"
            class="uniqueContents3 font-weight-bold"
          ></div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-area">
        <div class="text-center font-weight-bold">
          {{ dataStore.sec03.callout1 }}<span class="text-error">{{ dataStore.sec03.callout2 }}</span>
        </div>

<v-btn
  @click.stop.prevent="() => { 
    AfiClick(content.serviceName); 
    openInNewTab(content.pageURL); 
  }"
  block
  rounded="xl"
  size="x-large"
  class="text-white my-btn"
>
  {{ dataStore.sec03.pageaction }}
</v-btn>

      </div>

      <!-- ✅ CTA → Review：隙間を広げる -->
      <div class="review-head">
        <div class="my-review-title font-weight-bold" data-en="Review">
          {{ dataStore.sec03.reviewtitle }}
        </div>
      </div>

      <Carousel
        :items-to-show="1.1"
        :wrap-around="true"
        :autoplay="4000"
        class="my-disable-swipe"
      >
        <Slide v-for="slide in 1" :key="slide" v-if="content.reviewTitle1">
          <div class="carousel__item">
            <div class="review-sheet">
              <div class="review-top">
                <v-avatar size="40">
                  <img :src="content.reviewImg1.url" width="40" />
                </v-avatar>
                <div class="review-meta">
                  <div class="review-title">{{ content.reviewTitle1 }}</div>
                  <div class="review-sub">{{ content.reviewSubTitle1 }}</div>
                </div>
              </div>
              <div class="review-body" v-html="content.reviewContent1"></div>
              <div class="review-quote">{{ content.reviewQuote1 }}</div>
            </div>
          </div>
        </Slide>

        <Slide v-for="slide in 1" :key="slide" v-if="content.reviewTitle2">
          <div class="carousel__item">
            <div class="review-sheet">
              <div class="review-top">
                <v-avatar size="40">
                  <img :src="content.reviewImg2.url" width="40" />
                </v-avatar>
                <div class="review-meta">
                  <div class="review-title">{{ content.reviewTitle2 }}</div>
                  <div class="review-sub">{{ content.reviewSubTitle2 }}</div>
                </div>
              </div>
              <div class="review-body" v-html="content.reviewContent2"></div>
              <div class="review-quote">{{ content.reviewQuote2 }}</div>
            </div>
          </div>
        </Slide>

        <Slide v-for="slide in 1" :key="slide" v-if="content.reviewTitle3">
          <div class="carousel__item">
            <div class="review-sheet">
              <div class="review-top">
                <v-avatar size="40">
                  <img :src="content.reviewImg3.url" width="40" />
                </v-avatar>
                <div class="review-meta">
                  <div class="review-title">{{ content.reviewTitle3 }}</div>
                  <div class="review-sub">{{ content.reviewSubTitle3 }}</div>
                </div>
              </div>
              <div class="review-body" v-html="content.reviewContent3"></div>
              <div class="review-quote">{{ content.reviewQuote3 }}</div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>

      <!-- ✅ おすすめの理由：四隅丸角＋影付き（title-box1）に戻す -->
      <div class="my-box my-box-gap">
        <div class="title-box1" style="padding: 3em">
          <div class="title-box1-title">おすすめの理由</div>
          <p v-html="content.recommendedReason"></p>
        </div>
      </div>

      <!-- CTA（2回目） -->
      <div class="cta-area">
        <div class="text-center font-weight-bold">
          {{ dataStore.sec03.callout1 }}<span class="text-error">{{ dataStore.sec03.callout2 }}</span>
        </div>
        <v-btn
          @click.stop.prevent="() => { 
            AfiClick(content.serviceName); 
            openInNewTab(content.pageURL); 
          }"
          block
          rounded="xl"
          size="x-large"
          class="text-white my-btn"
        >
          {{ dataStore.sec03.pageaction }}
        </v-btn>

      </div>

      <!-- ✅ メリット・デメリット：title-box1（四隅丸角＋影） -->
      <div class="my-box my-box-gap">
        <div class="title-box1 merit-box">
          <div class="title-box1-title">メリット・デメリット</div>

          <v-list class="mb-0 pl-0 bg-transparent pt-2">
            <v-list-item class="px-0" v-if="content.ok_recommendedPlan1">
              <v-list-item-title
                class="text-body-1 d-flex align-center font-weight-medium text-medium-emphasis"
              >
                <v-icon size="large" type="mdi" icon="mdi-check-bold" class="text-primary"></v-icon>
                {{ content.ok_recommendedPlan1 }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0" v-if="content.ok_recommendedPlan2">
              <v-list-item-title
                class="text-body-1 d-flex align-center font-weight-medium text-medium-emphasis"
              >
                <v-icon size="large" type="mdi" icon="mdi-check-bold" class="text-primary"></v-icon>
                {{ content.ok_recommendedPlan2 }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0" v-if="content.ok_recommendedPlan3">
              <v-list-item-title
                class="text-body-1 d-flex align-center font-weight-medium text-medium-emphasis"
              >
                <v-icon size="large" type="mdi" icon="mdi-check-bold" class="text-primary"></v-icon>
                {{ content.ok_recommendedPlan3 }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0" v-if="content.ng_recommendedPlan1">
              <v-list-item-title
                class="text-body-1 d-flex align-center font-weight-medium text-medium-emphasis"
              >
                <v-icon size="large" type="mdi" icon="mdi-close" class="text-gray"></v-icon>
                {{ content.ng_recommendedPlan1 }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0" v-if="content.ng_recommendedPlan2">
              <v-list-item-title
                class="text-body-1 d-flex align-center font-weight-medium text-medium-emphasis"
              >
                <v-icon size="large" type="mdi" icon="mdi-close" class="text-gray"></v-icon>
                {{ content.ng_recommendedPlan2 }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-0" v-if="content.ng_recommendedPlan3">
              <v-list-item-title
                class="text-body-1 d-flex align-center font-weight-medium text-medium-emphasis"
              >
                <v-icon size="large" type="mdi" icon="mdi-close" class="text-gray"></v-icon>
                {{ content.ng_recommendedPlan3 }}
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <div class="mt-4">
          <v-btn
            @click.stop.prevent="() => { 
              AfiClick(content.serviceName); 
              openInNewTab(content.pageURL); 
            }"
            block
            rounded="xl"
            size="x-large"
            class="text-white my-btn"
          >
            {{ dataStore.sec03.pageaction }}
          </v-btn>

          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
/* ✅ 目次クリックで飛んだときヘッダーに隠れない */
[id^='rank-'] {
  scroll-margin-top: 96px;
}

/* 外側カード：影なし＋ライン（必須） */
.rank-card {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
}

/* ヘッダー */
.rank-header {
  padding: 14px 14px 10px;
}
.rank-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.rank-icon {
  flex: 0 0 auto;
}
.rank-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rank-name {
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1.2;
}

/* ✅ rank-sub（固定：変更なし） */
.rank-sub {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.rank-sub-item {
  font-size: 0.78rem;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  padding: 2px 8px;
  border-radius: 999px;
  background: #fff;
}

/* 本文 */
.rank-body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* 画像 */
.hero-media {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.hero-img {
  min-height: 180px;
}

/* POINT（v-sheetブロック：正デザイン） */
.block {
  padding: 14px;
  background: #fff;
}
.block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.block-title {
  font-weight: 900;
  font-size: 0.95rem;
}
.point-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.point-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.point-text {
  font-weight: 700;
  line-height: 1.35;
}

/* table */
.spec-table :deep(th) {
  background-color: #eeeeee;
  font-weight: bold;
  border: solid 1px white;
}
.spec-table :deep(td) {
  background-color: #fafafa;
  border: solid 1px white;
}

/* ✅ 四隅丸＋影（title-box1）：あなたが指定した“元の箱” */
.my-box {
  padding: 5px;
}
.my-box-gap {
  margin-top: 10px;
}
.title-box1 {
  margin: 1em 0;
  padding: 1.8em;
  position: relative;
  border: 1px solid #555;
  box-shadow: 5px 5px;
  background: #fff;
  border-radius: 10px;
}
.title-box1-title {
  position: absolute;
  top: -0.8em;
  left: 20px;
  font-weight: bold;
  font-size: 1.6em;
  background: #fff;
  padding: 0 0.5em;
}
.title-box1 p {
  margin-left: -15px;
  padding: 0;
}

/* CTA */
.cta-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* CTAボタン（既存意匠維持） */
.my-btn {
  background-image: linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
}

/* ✅ CTA → Review：間を広げる（ここが効く） */
.review-head {
  margin-top: 28px; /* ← CTA直後が詰まってたのを戻す */
}

/* Review見出し（既存意匠維持） */
.my-review-title {
  position: relative;
  padding-top: 30px;
  padding-bottom: 20px;
  font-size: 20px;
  text-align: center;
}
.my-review-title::before {
  content: attr(data-en);
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  color: #f7b200;
  font-size: 40px;
  font-style: italic;
}

/* ✅ Review：カード重ね回避（divで影） */
.review-sheet {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  padding: 14px;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}
.review-top {
  display: flex;
  gap: 10px;
  align-items: center;
}
.review-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.review-title {
  font-weight: 900;
  font-size: 0.95rem;
  line-height: 1.2;
}
.review-sub {
  font-size: 0.8rem;
  color: #6b7280;
}
.review-body {
  margin-top: 10px;
}
.review-quote {
  margin-top: 10px;
  font-size: 0.72rem;
  color: #6b7280;
  text-align: right;
}

/* Carousel（現状維持） */
.carousel__slide {
  padding: 5px;
}
.carousel__viewport {
  perspective: 2000px;
}
.carousel__track {
  transform-style: preserve-3d;
}
.carousel__slide--sliding {
  transition: 0.5s;
}
.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}
.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}
.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}
.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}
.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
  font-weight: bold;
}
:deep(li.carousel__pagination-item) {
  --vc-pgn-width: 8px;
  --vc-pgn-height: 8px;
  --vc-pgn-border-radius: 9999px;
}
:deep(.carousel__icon) {
  display: none;
}

.my-disable-swipe {
  touch-action: none;
}

/* microCMSのHTML */
:deep(.uniqueContents1) {
  font-size: 0.8rem;
}
:deep(.uniqueContents3) {
  font-size: 0.8rem;
}
:deep(span.my-ok) {
  color: #1b3c65;
  font-weight: bold;
  font-size: 1.3em;
}
:deep(span.my-ok::before) {
  content: '○';
}
:deep(span.my-ng) {
  color: #80808094;
  font-size: 1.1em;
}
:deep(span.my-ng:before) {
  content: '×';
}
</style>
