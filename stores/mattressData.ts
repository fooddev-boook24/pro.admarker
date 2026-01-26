import { defineStore } from "pinia";
import config from '@/config'

export const mattressDataStore = defineStore({
  id: "mattress",
  state: () => ({
    data1:"",
    data2:"",
    data3:"",
    data4:"",
    siteTitle:"マットレス徹底比較",
    link:"/mattress",
    fvData:{
      title1:"おすすめ",
      title2:"マットレス",
      subtitle:"ランキング",
      img:"https://res.cloudinary.com/fooddev/image/upload/v1761478467/pro.admarker/smart-ring/smart-ring_tstiwa.png"
    },
    fv02:{
      title1:"●あなたに最適なマットレス診断",
      select01:"悩み",
      selectValue01:["寝汗","寝返り","疲労","中途覚醒","腰痛"],
      select02:"硬さ",
      selectValue02:["高反発","低反発","普通"],
      select03:"今の寝具",
      selectValue03:["ベッド","布団"],
      select04:"返金保証",
      selectValue04:["あり","なし"],
      select05:"素材",
      selectValue05:["ポリエチレンファイバー","ウレタン","ハイブリッド","ポケットコイル"],

    },
    fv03:{
      title1:"みんなが選んだ定番マットレス"
    },
    sec01:{
      title1:"マットレスを選びたいけど",
      title2:"どれを選べばいいかわからない",
      title31:"徹底比較に基づく",
      title32:"失敗しないマットレス選び",
      title4:"３つのポイント"
      
    },
    sec02:{
      title1:"目的別で探して、料金を確認",
      title2:"目的に合わせて徹底比較！",
    },
    sec03:{
      callout1:"確認はこちらから！",
      callout2:"今すぐ購入！",
      reviewtitle:"登録者のレビュー",
      pageaction:"公式サイトを見る",
    },
    sec03Tab:{
      tab1:"総合",
      tab2:"リカバリー",
      tab3:"トライアル",
      tab4:"コスパ"
    }

  }),

  getters: {

  },
  actions: {


    
  },

});
