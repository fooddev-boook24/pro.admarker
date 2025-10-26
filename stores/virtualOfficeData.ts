import { defineStore } from "pinia";
import config from '@/config'

export const virtualOfficeDataStore = defineStore({
  id: "virtualOfficeData",
  state: () => ({
    data1:"",
    data2:"",
    data3:"",
    data4:"",
    siteTitle:"バーチャルオフィス徹底比較",
    link:"/virtual-office",
    fvData:{
      title1:"おすすめ",
      title2:"バーチャルオフィス",
      subtitle:"ランキング",
      img:"https://res.cloudinary.com/fooddev/image/upload/v1761478467/pro.admarker/smart-ring/smart-ring_tstiwa.png"
    },
    fv02:{
      title1:"●あなたに最適なオフィス診断",
      select01:"価格",
      selectValue01:["価格","指定なし","~500円","~1,000円","~2,000円","2,000円~"],
      select02:"法人登記",
      selectValue02:["法人登記","指定なし","あり"],
      select03:"口座開設",
      selectValue03:["口座開設","指定なし","可能"],
      select04:"会議室",
      selectValue04:["会議室","指定なし","あり"],
      select05:"場所",
      selectValue05:["場所","指定なし","東京","名古屋","その他"],

    },
    fv03:{
      title1:"みんなが選んだ定番オフィスTOP5"
    },
    sec01:{
      title1:"バーチャルオフィスを選びたいけど",
      title2:"どれを選べばいいかわからない",
      title31:"徹底比較に基づく",
      title32:"失敗しないバーチャルオフィス選び",
      title4:"３つのポイント"
      
    },
    sec02:{
      title1:"目的別で探して、料金を確認",
      title2:"目的に合わせて徹底比較！",
    },
    sec03:{
      callout1:"確認はこちらから！",
      callout2:"今すぐ申し込み！",
      reviewtitle:"登録者のレビュー",
      pageaction:"公式サイトを見る",
    },
    sec03Tab:{
      tab1:"総合",
      tab2:"価格",
      tab3:"法人登記",
      tab4:"口座開設"
    }

  }),

  getters: {

  },
  actions: {


    
  },

});
