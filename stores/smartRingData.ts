import { defineStore } from "pinia";
import config from '@/config'

export const smartRingDataStore = defineStore({
  id: "smart-ring",
  state: () => ({
    data1:"",
    data2:"",
    data3:"",
    data4:"",
    siteTitle:"スマートリング徹底比較",
    link:"/smart-ring",
    fvData:{
      title1:"おすすめ",
      title2:"スマートリング",
      subtitle:"ランキング",
      img:"https://res.cloudinary.com/fooddev/image/upload/v1761478467/pro.admarker/smart-ring/smart-ring_tstiwa.png"
    },
    fv02:{
      title1:"●あなたに最適なスマートリング診断",
      select01:"価格",
      selectValue01:["低価格","中価格","高価格"],
      select02:"重量",
      selectValue02:["軽い","重い"],
      select03:"スリープヘルス",
      selectValue03:["あり","なし"],
      select04:"決済機能",
      selectValue04:["あり","なし"],
      select05:"充電",
      selectValue05:["必要","不要"],

    },
    fv03:{
      title1:"みんなが選んだ定番スマートリングTOP3"
    },
    sec01:{
      title1:"スマートリングを選びたいけど",
      title2:"どれを選べばいいかわからない",
      title31:"徹底比較に基づく",
      title32:"失敗しないスマートリング選び",
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
      tab3:"重量",
      tab4:"機能"
    }

  }),

  getters: {

  },
  actions: {


    
  },

});
