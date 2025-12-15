<script setup lang="ts">
import { computed } from 'vue'
import { smartRingDataStore } from '@/stores/smartRingData'

const store = smartRingDataStore()

useHead({
  title: '【2025版】おすすめスマートリング 徹底比較',
  meta: [
    {
      name: 'description',
      content:
        'おすすめのスマートリングを徹底比較し、あなたに最適なスマートリングを紹介します。',
    },
  ],
})

// ===== 記事一覧（smart-ring カテゴリの公開記事） =====
type Eyecatch = {
  url: string
  height?: number
  width?: number
}

type Article = {
  id: string
  title: string
  slug: string
  mainProductName?: string
  eyecatch?: Eyecatch
  pageCategory?: string[]
  statusFlag?: string[]
}

// nuxt-microcms-module の composable をそのまま利用
const { data: relatedData, error: relatedError } =
  await useMicroCMSGetList<Article>({
    endpoint: '002-article',
    queries: {
      filters: [
        'pageCategory[contains]smart-ring',
        'statusFlag[contains]public',
      ].join('[and]'),
      limit: 6,
      orders: '-publishedAt',
    },
  })

const relatedArticles = computed<Article[]>(() => {
  return relatedData.value?.contents ?? []
})
</script>

<template>
  <!-- ✅ PC時：本文(580px) + 右目次(280px) の2カラム -->
  <div class="page-layout">
    <!-- 本文 -->
    <main class="page-main">
      <div class="mobile-width">
        <FvSmartring01 :dataStore="store" />
        <FvSmartring02 :dataStore="store" />
        <FvSmartring03 :dataStore="store" />
        <SectionSmartring01 :dataStore="store" />
        <SectionSmartring02 :dataStore="store" />

        <!-- ✅ ランキング（目次はこの中で生成し、Teleportで右へ出す） -->
        <SectionSmartring03 :dataStore="store" />

        <section class="related-articles" v-if="relatedArticles.length">
          <h2 class="related-title">関連記事</h2>

          <ul class="related-list">
            <li v-for="item in relatedArticles" :key="item.id" class="related-item">
              <!-- ✅ リンク手法は変更しない -->
              <a :href="`/smart-ring/${item.slug}`" class="related-link">
                <div class="related-card">
                  <div class="related-thumb" v-if="item.eyecatch?.url">
                    <v-img :src="item.eyecatch.url" :alt="item.title" cover />
                  </div>

                  <div class="related-content">
                    <p class="related-name">
                      {{ item.title }}
                    </p>
                    <p class="related-tag" v-if="item.mainProductName">
                      {{ item.mainProductName }}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>

    <!-- 右目次（器だけ index.vue に用意） -->
    <aside class="page-toc">
      <!-- ✅ SectionSmartring03.vue がここに Teleport してくる -->
      <div id="right-toc"></div>
    </aside>
  </div>
</template>

<style>
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

<style scoped>
/* ✅ ページ全体：SPは1カラム、PCは2カラム */
.page-layout {
  display: block;
  width: 100%;
}

@media (min-width: 960px) {
  .page-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px; /* 本文 + 右目次 */
    gap: 18px;
    max-width: 980px; /* 本文580 + 目次280 + gap */
    margin: 0 auto;
    padding: 0 12px;
  }
}

.page-main {
  display: flex;
  justify-content: center;
}

/* ✅ 右目次はPCだけ表示 */
.page-toc {
  display: none;
}


/* ✅ PC時：右目次の器を「画面に固定」する（stickyは使わない） */
@media (min-width: 960px) {
  /* 右カラム自体は幅だけ確保（見た目の整列用） */
  .page-toc {
    display: block;
    width: 280px;
  }

  /* Teleport先（中身）を画面固定にする */
  #right-toc {
    position: fixed;
    top: 96px;     /* ヘッダー高さに合わせる */
    width: 280px;
    z-index: 10;

    /* 980pxで中央寄せしてるレイアウトに合わせて右位置を計算 */
    right: max(12px, calc((100vw - 980px) / 2 + 12px));

    max-height: calc(100vh - 120px);
    overflow: auto;
  }
}


/* 本文幅（あなたの設計：本文は580固定） */
.mobile-width {
  max-width: 580px;
  width: 100%;
  padding-inline: 16px;
  margin: 0 auto;
  padding: 0px;
}

@media (min-width: 600px) {
  .mobile-width {
    max-width: clamp(360px, 45vw, 580px);
  }
}

/* ======================
   関連記事デザイン
====================== */

.related-articles {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.related-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-item {
  margin-bottom: 12px;
}

.related-card {
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  transition: background 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
}

.related-card:hover {
  background: #f9fafb;
  transform: translateX(3px);
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
}

.related-thumb {
  width: 96px;
  min-width: 96px;
  border-radius: 8px;
  overflow: hidden;
}

.related-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.related-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.related-tag {
  font-size: 0.75rem;
  color: #6b7280;
}

.related-error {
  margin-top: 16px;
  font-size: 0.8rem;
  color: #ef4444;
}
</style>
