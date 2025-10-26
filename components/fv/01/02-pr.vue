<script setup lang="ts">

const { data } = await useMicroCMSGetList({
  endpoint: "001-main",
  queries:{
    limit: 1, 
    orders: '-prRank',
    filters: 'pageCategory[equals]virtual-office'
  }
});

function AfiClick_PR(serviceName){
  window.dataLayer.push({
    event: "AfiClick", 
    serviceName:serviceName + "_PR",
    page:location.pathname
  })
}



</script>

<template>
<div class=" ">
  <v-container class="">
    <v-card  v-for="(content,index) in  data.contents " :key="content" class="" variant="outlined">
      
        <div class="d-flex justify-center mt-3">
          <img v-if="index+1 == 1" src="https://res.cloudinary.com/fooddev/image/upload/v1695129998/pro.admarker/common/rank/PR_ss05g1.png" alt="1位" class="image" width="40" height="40" />
          <v-card-title>{{ content.serviceName }}</v-card-title>
        </div>

      <nuxt-link :to="content.pageURL" target="_blank" @click="AfiClick_PR(content.serviceName)">
        <div class="px-5 py-2">
        <v-img class="" height="" :src="content.serviceImage.url" ></v-img>
        </div>
      </nuxt-link>

      <div class="my-box">
        <div class="title-box1 mt-8" >
        <div class="title-box1-title">POINT</div>
          <p class="text-h5">  <v-icon size="large" color="primary" type="mdi" icon="mdi-menu-right"></v-icon><span class="my-underline">{{ content.serviceFeature1 }}</span></p>
          <p class="text-h5"> <v-icon size="large" color="primary" type="mdi" icon="mdi-menu-right"></v-icon> <span class="my-underline">{{ content.serviceFeature2 }}</span></p>
          <p class="text-h5"> <v-icon size="large" color="primary" type="mdi" icon="mdi-menu-right"></v-icon><span class="my-underline">{{ content.serviceFeature3 }}</span></p>
        </div>
      </div>
      <v-btn @click="AfiClick_PR(content.serviceName)" :href="content.pageURL" target="_blank" block rounded="xl" size="x-large" class="text-white my-btn">今ならキャンペーン実施中！</v-btn>

    </v-card>
  </v-container>
</div>

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

.my-btn{
background-image: linear-gradient(45deg, #FFC107 0%, #f76a35 100%);
}





</style>