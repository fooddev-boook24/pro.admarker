<script setup lang="ts">
import { computed, ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const props = defineProps({
  data: {},
  dataStore: Object,
})

const data1 = await useMicroCMSGetList({
  endpoint: '001-main',
  queries: {
    limit: 5,
    orders: '-servicePoints',
    filters: 'pageCategory[equals]smart-ring',
  },
})
const data2 = await useMicroCMSGetList({
  endpoint: '001-main',
  queries: {
    limit: 5,
    orders: 'tabRank2',
    filters: 'pageCategory[equals]smart-ring',
  },
})
const data3 = await useMicroCMSGetList({
  endpoint: '001-main',
  queries: {
    limit: 5,
    orders: 'tabRank3',
    filters: 'pageCategory[equals]smart-ring',
  },
})
const data4 = await useMicroCMSGetList({
  endpoint: '001-main',
  queries: {
    limit: 5,
    orders: 'tabRank4',
    filters: 'pageCategory[equals]smart-ring',
  },
})

const tab = ref('one')

function touchless() {
  return false
}

/* ✅ 今開いているタブのランキングを右目次に反映 */
const activeRankingContents = computed(() => {
  if (tab.value === 'one') return data1.data.value?.contents ?? []
  if (tab.value === 'two') return data2.data.value?.contents ?? []
  if (tab.value === 'three') return data3.data.value?.contents ?? []
  return data4.data.value?.contents ?? []
})

/* ✅ 右目次（順位＋製品名） */
const rankingToc = computed(() => {
  return activeRankingContents.value.map((item: any, index: number) => ({
    id: `rank-${index + 1}`,
    rank: index + 1,
    productName: item.serviceName,
  }))
})
</script>

<template>
  <div class="px-2">
    <v-card>
      <v-tabs
        v-model="tab"
        align-tabs="center"
        class="my-disable-swipe"
        fixed-tabs
        swipeable="false"
      >
        <v-tab value="one" class="font-weight-bold">{{ dataStore.sec03Tab.tab1 }}</v-tab>
        <v-tab value="two" class="font-weight-bold">{{ dataStore.sec03Tab.tab2 }}</v-tab>
        <v-tab value="three" class="font-weight-bold">{{ dataStore.sec03Tab.tab3 }}</v-tab>
        <v-tab value="four" class="font-weight-bold">{{ dataStore.sec03Tab.tab4 }}</v-tab>
      </v-tabs>

      <v-card-text class="mt-n2">
        <v-window v-model="tab" :touch="touchless()">
          <v-window-item value="one">
            <SectionSmartring03Common :data="data1" :dataStore="dataStore" />
          </v-window-item>

          <v-window-item value="two">
            <SectionSmartring03Common :data="data2" :dataStore="dataStore" />
          </v-window-item>

          <v-window-item value="three">
            <SectionSmartring03Common :data="data3" :dataStore="dataStore" />
          </v-window-item>

          <v-window-item value="four">
            <SectionSmartring03Common :data="data4" :dataStore="dataStore" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>

  <!-- ✅ 目次はページ右側（index.vue の #right-toc）に外出し -->
<ClientOnly>
  <Teleport to="#right-toc">
    <aside class="sec03-toc" v-if="rankingToc.length">
      <div class="toc-header">ランキング目次</div>
      <ul class="toc-list">
        <li v-for="item in rankingToc" :key="item.id">
          <!-- リンク手法は変更しない -->
          <a class="toc-link" :href="`#${item.id}`">
            <span class="rank-badge">{{ item.rank }}</span>
            <span class="rank-name">{{ item.productName }}</span>
          </a>
        </li>
      </ul>
    </aside>
  </Teleport>
</ClientOnly>

</template>

<style scoped>
.v-btn.v-tab {
  border: 2px solid #dfe0e2;
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}
.v-card-text {
  padding: 10px 4px;
}
.v-slide-group-item--active {
  background-color: #1b3c65;
  color: white;
}
.my-disable-swipe {
  touch-action: none;
}

/* ✅ 右目次（index.vue右側で表示される前提） */
.sec03-toc {
  position: sticky;
  top: 96px;
  padding: 14px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.toc-header {
  font-weight: 800;
  font-size: 0.95rem;
  margin-bottom: 12px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  text-decoration: none;
  color: #111827;
  transition: background 0.15s ease;
}
.toc-link:hover {
  background: #f3f4f6;
}

.rank-badge {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #1b3c65;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-name {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.2;
}

/* ✅ 右目次：固定（追従） */
.sec03-toc{
  position: sticky;
  top: 96px;            /* ヘッダー高さに合わせる */
  max-height: calc(100vh - 120px);  /* 画面からはみ出さない */
  overflow: auto;       /* 長くなったら目次だけスクロール */
  padding: 14px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

</style>
