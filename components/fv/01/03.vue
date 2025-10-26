<script setup lang="ts">
import { ref } from 'vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";


const props = defineProps({
    dataStore: Object
});


const settigns = {
  itemsToShow: 1, // スマホは1個だけ表示
}
const brakepoints = {
  // 640px and up
  640: {
    itemsToShow: 1, // PCは前後に半分ずつ表示
  }
}


const { data } = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:{
    limit: 5, 
    orders: '-servicePoints',
    filters: 'pageCategory[equals]virtual-office'
  }
});

function AfiClick(serviceName){
  window.dataLayer.push({
    event: "AfiClick", 
    serviceName:serviceName,
    page:location.pathname
  })
}





</script>

<template>

<div class="mt-8">
  <div class="text-center font-weight-bold ml-2 mb-4">{{ dataStore.fv03.title1 }}</div>


  <Carousel :items-to-show="2.5" :wrap-around="true" :autoplay="2000">
    <!-- <Carousel :items-to-show="2.5" :wrap-around="true"> -->
    <Slide v-for="content in data.contents " :key="content" >
      <nuxt-link :to="content.pageURL" target="_blank" @click="AfiClick(content.serviceName)">
      <div class="carousel__item" >
        <v-img :src="content.serviceImage.url" alt="" loading="lazy" class="fill-height"></v-img>
        <div class="text-body-2">{{ content.serviceName }}</div>

        <div class="d-flex my-flex" >
        <v-rating size="x-small" half-increments v-model="content.servicePoints" readonly   density="compact" color="warning"></v-rating>
        <p class="rate-text">{{ content.servicePoints }}</p>
        </div>
      </div>
    </nuxt-link>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>






</div>

</template>



<style scoped>
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
/deep/ li.carousel__pagination-item {
    --vc-pgn-width: 8px;
    --vc-pgn-height: 8px;
    --vc-pgn-border-radius: 9999px;
}

/deep/ .carousel__icon{
  display: none;
}

.my-flex {
    display: flex !important;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
}
.rate-text{
  font-size: 0.8rem;
}

/deep/ a{
  text-decoration: none;
  color: black;
}

</style>