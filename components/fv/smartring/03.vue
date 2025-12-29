<script setup lang="ts">
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const props = defineProps({
  dataStore: Object,
})

const settigns = {
  itemsToShow: 1,
}
const brakepoints = {
  640: {
    itemsToShow: 1,
  },
}

const { data } = await useMicroCMSGetList({
  endpoint: '001-main',
  queries: {
    limit: 5,
    orders: '-servicePoints',
    filters: 'pageCategory[equals]smart-ring',
  },
})

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
  <div class="mt-8">
    <div class="text-center font-weight-bold ml-2 mb-4">
      {{ dataStore.fv03.title1 }}
    </div>

    <!-- ✅ 拡大するとPaginationに被るので、外側に余白 -->
    <div class="carousel-wrap">
      <Carousel :items-to-show="2.5" :wrap-around="true" :autoplay="2000">
        <Slide v-for="content in data.contents" :key="content">
          <a
            :href="content.pageURL"
            target="_blank"
            rel="noopener noreferrer"
            @click.stop="AfiClick(content.serviceName)"
>
            <div class="carousel__item">
              <!-- ここはあなたのまま：cover維持 -->
              <v-img :src="content.serviceImage.url" alt="" loading="lazy" class="fill-height" cover />

              <div class="text-body-2 mt-2">{{ content.serviceName }}</div>

              <div class="d-flex my-flex">
                <v-rating
                  size="x-small"
                  half-increments
                  v-model="content.servicePoints"
                  readonly
                  density="compact"
                  color="warning"
                />
                <p class="rate-text">{{ content.servicePoints }}</p>
              </div>
            </div>
          </a>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
/* ✅ 拡大時に下が切れたりPaginationに被るので下余白 */
.carousel-wrap {
  padding-bottom: 70px; /* 1.5倍で被る分を確保（必要なら増減） */
}

/* ✅ ここが最重要：拡大しても切れないように “見える” 設定にする */
:deep(.carousel__viewport) {
  overflow: visible !important;
}
:deep(.carousel__track) {
  overflow: visible !important;
}
:deep(.carousel__slide) {
  overflow: visible !important;
}

/* 既存 */
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

/* ✅ 通常は少し小さめ */
.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

/* 既存 */
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

/* ✅ 要望どおり：アクティブだけ 1.5倍（シンプル） */
.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.5);
  font-weight: bold;
  z-index: 20; /* 拡大時に前面へ */
}

/deep/ li.carousel__pagination-item {
  --vc-pgn-width: 8px;
  --vc-pgn-height: 8px;
  --vc-pgn-border-radius: 9999px;
}

/deep/ .carousel__icon {
  display: none;
}
.carousel-wrap {
  padding-bottom: 70px;
  position: relative;

  /* ✅ PCでコンテンツ枠を無視して横に飛び出すのを止める */
  overflow-x: hidden;
  overflow-y: visible;
}


.my-flex {
  display: flex !important;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
}

.rate-text {
  font-size: 0.8rem;
}

/deep/ a {
  text-decoration: none;
  color: black;
}
</style>
