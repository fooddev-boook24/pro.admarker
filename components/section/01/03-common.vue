<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
    data: {},
    dataStore: Object
});

function AfiClick(serviceName){
  window.dataLayer.push({
    event: "AfiClick", 
    serviceName:serviceName,
    page:location.pathname,
    category:"smart-virtual-office"
  })
}


</script>


<template>
  <v-card  v-for="(content,index) in  data.data.value.contents " :key="content" class="mb-10">
    <v-card-item>
        <div class="d-flex align-center">

          <img v-if="index+1 == 1" src="https://res.cloudinary.com/fooddev/image/upload/v1687771865/pro.admarker/common/rank/rank-1_wk9oj3.png" alt="1位" class="image" width="40" height="40" />
          <img v-else-if="index+1 == 2" src="https://res.cloudinary.com/fooddev/image/upload/v1687771866/pro.admarker/common/rank/rank-2_uh9iyi.png" alt="2位" class="image" width="40" height="40" />
          <img v-else-if="index+1 == 3" src="https://res.cloudinary.com/fooddev/image/upload/v1687771865/pro.admarker/common/rank/rank-3_ookr16.png" alt="3位" class="image" width="40" height="40" />
          <img v-else-if="index+1 == 4" src="https://res.cloudinary.com/fooddev/image/upload/v1687771865/pro.admarker/common/rank/rank-4_r0ulwo.png" alt="4位" class="image" width="40" height="40" />
          <img v-else-if="index+1 == 5" src="https://res.cloudinary.com/fooddev/image/upload/v1687771866/pro.admarker/common/rank/rank-5_bztr3r.png" alt="5位" class="image" width="40" height="40" />
          <v-card-title>{{ content.serviceName }}</v-card-title>
        </div>
        <v-img class="" height="" :src="content.serviceImage.url" ></v-img>
        

        <div class="my-box">
        <div class="title-box1 mt-8" >
        <div class="title-box1-title">POINT</div>
          <p class="text-h5">  <v-icon size="large" color="primary" type="mdi" icon="mdi-menu-right"></v-icon><span class="my-underline">{{ content.serviceFeature1 }}</span></p>
          <p class="text-h5"> <v-icon size="large" color="primary" type="mdi" icon="mdi-menu-right"></v-icon> <span class="my-underline">{{ content.serviceFeature2 }}</span></p>
          <p class="text-h5"> <v-icon size="large" color="primary" type="mdi" icon="mdi-menu-right"></v-icon><span class="my-underline">{{ content.serviceFeature3 }}</span></p>
        </div>
        </div>


        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">
                <span class="font-weight-bold">{{ content.tableKey1 }}</span>
              </th>
              <th class="text-left">
                <span class="font-weight-bold">{{ content.tableKey2 }}</span>
              </th>
              <th class="text-left">
                <span class="font-weight-bold">{{ content.tableKey3 }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
            >
              <td><span class="font-weight-bold">{{ content.tableValue1 }}</span></td>
              <td><span class="font-weight-bold">{{ content.tableValue2 }}</span></td>
              <td><span class="font-weight-bold">{{ content.tableValue3 }}</span></td>
            </tr>
          </tbody>
        </v-table>



        <div class="my-box">
        <div class="title-box1 mt-8" >
        <div class="title-box1-title">取扱サービス</div>
          <div v-html="content.uniqueContents1" class="uniqueContents1"></div>
        </div>
        </div>

        <div class="my-box">
        <div class="title-box1 mt-8" >
        <div class="title-box1-title">取得可能住所</div>
          <div v-html="content.uniqueContents2"></div>
        </div>
        </div>
        
        <div class="mt-6">
            <div class="" >
            <v-icon size="large" type="mdi" icon="mdi-check-bold" color="primary"></v-icon>
            <span class="font-weight-bold text-h5 my-underline2">{{ content.servicePrivilege1 }}</span>
            </div>

            <div class="mt-2" >
            <v-icon size="large" type="mdi" icon="mdi-check-bold" color="primary"></v-icon>
            <span class="font-weight-bold text-h5 my-underline2">{{ content.servicePrivilege2 }}</span>
            </div>

            <div class="mt-2" >
            <v-icon size="large" type="mdi" icon="mdi-check-bold" color="primary"></v-icon>
            <span  class="font-weight-bold text-h5 my-underline2">{{ content.servicePrivilege3 }}</span>
            </div>
        </div>


        
        <!-- <v-img class="mt-6" src="https://lp.prodig.jp/wp-content/uploads/2022/07/techcamp_5OFF01.png"></v-img> -->

        <div class="text-center mt-6 font-weight-bold">{{ dataStore.sec03.callout1 }}<span class="text-error">{{ dataStore.sec03.callout2 }}</span></div>
        <v-btn @click="AfiClick(content.serviceName)" :href="content.pageURL" target="_blank" block rounded="xl" size="x-large" class="text-white my-btn">{{ dataStore.sec03.pageaction }}</v-btn>
        

        <div class="mt-12 font-weight-bold my-review-title" data-en="Review">
          {{ dataStore.sec03.reviewtitle }}
        </div>


        
        <Carousel :items-to-show="1.1" :wrap-around="true" :autoplay="4000" class="my-disable-swipe">
          <!-- <Carousel :items-to-show="1" :wrap-around="true"> -->
        <Slide v-for="slide in 1" :key="slide" v-if="content.reviewTitle1">
          <div class="carousel__item">

            <v-card elevation="10" class="">
                    <div class="pa-6 text-left">
                        <div class="d-flex">
                            <v-avatar size="40">
                                <img :src="content.reviewImg1.url"  width="40" />
                            </v-avatar>
                            <div class="ml-4">
                                <h6 class="text-h6">{{ content.reviewTitle1 }}</h6>
                                <h6 class="text-body-2">{{ content.reviewSubTitle1 }}</h6>
                            </div>   
                        </div>
                        <p class="mt-2" v-html="content.reviewContent1"></p>
                        <p class="mt-3"></p>
                        <p class="my-caption">{{ content.reviewQuote1 }}</p>
                    </div>    
            </v-card> 
            
          </div>
        </Slide>

        <Slide v-for="slide in 1" :key="slide" v-if="content.reviewTitle2">
          <div class="carousel__item">

            <v-card elevation="10" class="">
                    <div class="pa-6 text-left">
                        <div class="d-flex">
                            <v-avatar size="40">
                                <img :src="content.reviewImg2.url"  width="40" />
                            </v-avatar>
                            <div class="ml-4">
                                <h6 class="text-h6">{{ content.reviewTitle2 }}</h6>
                                <h6 class="text-body-1">{{ content.reviewSubTitle2 }}</h6>
                            </div>   
                        </div>
                        <p class="text-15 mt-6" v-html="content.reviewContent2"></p>
                        <p class="mt-3"></p>
                        <p class="my-caption">{{ content.reviewQuote2 }}</p>
                    </div>    
            </v-card> 
            
          </div>
        </Slide>  

        <Slide v-for="slide in 1" :key="slide" v-if="content.reviewTitle3">
          <div class="carousel__item">

            <v-card elevation="10" class="">
                    <div class="pa-6 text-left">
                        <div class="d-flex">
                            <v-avatar size="40">
                                <img :src="content.reviewImg3.url"  width="40" />
                            </v-avatar>
                            <div class="ml-4">
                                <h6 class="text-h6">{{ content.reviewTitle3 }}</h6>
                                <h6 class="text-body-1">{{ content.reviewSubTitle3 }}</h6>
                            </div>   
                        </div>
                        <p class="text-15 mt-6" v-html="content.reviewContent3"></p>
                        <p class="mt-3"></p>
                        <p class="my-caption">{{ content.reviewQuote3 }}</p>
                    </div>    
            </v-card> 
            
          </div>
        </Slide>



        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>





        <div class="my-box">
        <div class="title-box1 mt-8" style="padding:3em;">
        <div class="title-box1-title">おすすめの理由</div>
        <p v-html="content.recommendedReason"></p>
        </div>
        </div>



        <div class="text-center mt-6 font-weight-bold">{{ dataStore.sec03.callout1 }}<span class="text-error">{{ dataStore.sec03.callout2 }}</span></div>
        <v-btn @click="AfiClick(content.serviceName)" :href="content.pageURL" target="_blank" block rounded="xl" size="x-large" class="text-white my-btn">{{ dataStore.sec03.pageaction }}</v-btn>
      
        <v-card elevation="10" class="rounded-md mt-10 text-center">
          <div class="justify-space-between text-center">
              <h4 class="text-h3 mb-6 mt-3 pt-5">おすすめプラン</h4>
          </div>
          <img src="https://modernize-nuxt.adminmart.com/images/backgrounds/gold.png" width="90" alt="icon" />
          <div class="align-center mt-4">
              <h2 class="text-h3 ">{{ content.recommendedPlanTitle }}</h2>
          </div>

          <div class="my-center">
          <v-list class="mb-0 pl-0 bg-transparent pt-5">
            
            
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
          </div>
          <v-btn @click="AfiClick(content.serviceName)" :href="content.pageURL" target="_blank" block rounded="xl" size="x-large" class="text-white my-btn">{{ dataStore.sec03.pageaction }}</v-btn>      
      </v-card>   
      </v-card-item>
  </v-card>

</template>

<style scoped>
.my-box{
padding: 5px;
}

/deep/  .my-underline{
background: linear-gradient(#fff 70%,#F7B200 20%);
font-weight: bold;
}
/deep/ .my-underline-bold{
background: linear-gradient(transparent 0%,#F7B200 0%);
font-weight: bold;
}

.my-underline2{
font-weight: bold;
border-bottom: 2px dashed #e75884;
background: none;
}

.title-box1{
margin: 1em 0;
padding: 1.8em;
position: relative;
border: 1px solid #555;
box-shadow: 5px 5px;
}

.title-box1-title{
position: absolute;
top: -0.8em;
left: 20px;
font-weight: bold;
font-size: 1.6em;
background: #fff;
padding: 0 0.5em;
}

.title-box1 p{
/* margin: 0; */
margin-left: -15px;
padding: 0;
}


th{
background-color: #EEEEEE;
font-weight: bold;
border: solid 1px white;  
}
td{
background-color: #FAFAFA;
border: solid 1px white;
}

.my-btn{
background-image: linear-gradient(45deg, #FFC107 0%, #f76a35 100%);
}

.my-review-title{
position: relative;
padding-top: 30px;
padding-bottom: 20px;
font-size: 20px;
text-align: center;
}
.my-review-title::before{
content: attr(data-en);
position: absolute;
top: -10px;
left: 50%;
transform: translateX(-50%);
color: #F7B200;
font-size: 40px;
font-style: italic;
}
.my-review-title span{
position: relative;
z-index: 2; 
}

.my-caption{
position: absolute;
right: 3%;
font-size: 0.5rem;
}

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

.my-center{
transform: translateX(-50%);
margin-left: 50%;
}

/deep/ .uniqueContents1{
  font-size: 0.5rem;
}
/deep/ span.my-ok {
color: #1b3c65;
font-weight: bold;
font-size: 1.3em;
}
/deep/ span.my-ok::before {
content: '○';
}
/deep/ span.my-ng {
color: #80808094;
font-size: 1.1em;
}
/deep/ span.my-ng:before {
content: '×';
}

.my-disable-swipe {
touch-action: none;
}


</style>