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
  <v-row>
    <v-col cols="0" sm="3" md="3" lg="3" xl="3" class="d-none d-sm-block"></v-col>

    <v-col
      cols="12"
      sm="6"
      md="6"
      lg="6"
      xl="6"
      class="d-flex justify-center"
    >
      <!-- ここがスマホ幅に固定される -->
      <div class="mobile-width">
        <!-- 既存の比較コンテンツ -->
        <FvSmartring01 :dataStore="store" />
        <FvSmartring02 :dataStore="store" />
        <FvSmartring03 :dataStore="store" />
        <SectionSmartring01 :dataStore="store" />
        <SectionSmartring02 :dataStore="store" />
        <SectionSmartring03 :dataStore="store" />

        <!-- 関連記事一覧 -->
        <section
          v-if="relatedArticles.length"
          class="related-articles"
        >
          <h2 class="related-title">
            スマートリング関連記事
          </h2>

          <ul class="related-list">
            <li
              v-for="item in relatedArticles"
              :key="item.id"
              class="related-item"
            >
              <NuxtLink :to="`/smart-ring/${item.slug}`">
                <div class="related-card">
                  <!-- アイキャッチ -->
                  <div
                    class="related-thumb"
                    v-if="item.eyecatch?.url"
                  >
                    <v-img
                      :src="item.eyecatch.url"
                      :alt="item.title"
                      cover
                      height="96"
                    />
                  </div>

                  <!-- テキスト部分 -->
                  <div class="related-content">
                    <p class="related-name">
                      {{ item.title }}
                    </p>
                    <p
                      v-if="item.mainProductName"
                      class="related-tag"
                    >
                      {{ item.mainProductName }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </section>

        <!-- もしエラーがあれば軽く表示（開発用） -->
        <p
          v-else-if="relatedError"
          class="related-error"
        >
          記事一覧の取得に失敗しました。
        </p>
      </div>
    </v-col>

    <v-col cols="0" sm="3" md="3" lg="3" xl="3" class="d-none d-sm-block"></v-col>
  </v-row>
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
/* スマホ幅に固定（必要なら数値を調整） */
.mobile-width {
  max-width: 580px; /* 固定上限：スマホ幅 */
  width: 100%; /* SPでは自然に全幅 */
  padding-inline: 16px; /* 左右の内側余白（好みで） */
  margin: 0 auto; /* 中央寄せ */
  padding: 0px;
}

/* 好みで、少し伸縮させたい場合は clamp 版 */
@media (min-width: 600px) {
  .mobile-width {
    max-width: clamp(360px, 45vw, 480px);
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
