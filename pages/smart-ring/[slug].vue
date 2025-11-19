<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type FAQItem = {
  question?: string
  answer?: string
}

type Eyecatch = {
  url: string
  height?: number
  width?: number
}

type Article = {
  id: string
  title: string
  slug: string

  pageCategory?: string[]
  articleType?: string[]
  statusFlag?: string[]

  description?: string
  mainKeyword?: string
  mainProductName?: string

  leadText?: string

  bodyHtml?: string

  faqBlock?: FAQItem[]
  eyecatch?: Eyecatch
}

// ===== ページキー設定（slugごとに別インスタンスにする） =====
definePageMeta({
  key: (route) => route.fullPath,
})

// ===== microCMS から記事取得 =====
const route = useRoute()
const slug = route.params.slug as string

const { data, pending, error } = await useMicroCMSGetList<Article>({
  endpoint: '002-article',
  queries: {
    filters: [
      `slug[equals]${slug}`,
      `pageCategory[contains]smart-ring`,
      `statusFlag[contains]public`,
    ].join('[and]'),
    limit: 1,
  },
})

const article = computed<Article | undefined>(() => data.value?.contents?.[0])
const renderedBody = computed(() => article.value?.bodyHtml ?? '')

// ===== 目次用：bodyHtml から <h2>/<h3> を抽出 =====
type TocItem = {
  level: number
  id: string
  text: string
}

const tocItems = computed<TocItem[]>(() => {
  const html = renderedBody.value
  if (!html) return []

  const items: TocItem[] = []
  const headingRegex =
    /<h(2|3)([^>]*)id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi

  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(html)) !== null) {
    const level = Number(match[1])
    const id = match[3]
    const rawText = match[4]
    const text = rawText.replace(/<[^>]+>/g, '').trim()
    if (!text) continue
    items.push({ level, id, text })
  }

  return items
})

const renderFaqAnswer = (faq: FAQItem) => faq.answer ?? ''

// ===== OGP / SEO =====
useHead(() => {
  const a = article.value
  const title = a
    ? `${a.title}｜スマートリング徹底解説`
    : 'スマートリング記事'

  const description =
    a?.description ??
    'スマートリングに関する解説記事です。RingConn・SOXIA・スマートリカバリーリングなどを比較します。'

  const noindex = a?.statusFlag?.includes('noindex')

  return {
    title,
    meta: [
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
    ],
  }
})

// ===== 記事内リンククリック計測（AfiClick） =====
const articleBodyRef = ref<HTMLElement | null>(null)

const AfiClick = (serviceName: string) => {
  if (typeof window === 'undefined') return
  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({
    event: 'AfiClick',
    serviceName,
    page: location.pathname,
    category: 'smart-ring',
  })
}

// 商品リンクを data 属性 → href の順に判定
const detectServiceName = (anchor: HTMLAnchorElement): string | null => {
  // ① data-afi-service を最優先（新実装）
  const service = anchor.dataset.afiService
  if (service) return service

  // ② 旧実装との互換性のためのフォールバック（URL マッチ）
  const href = anchor.href
  if (href.includes('45GG16+F0078A+5QLS+BWVTE')) return 'RingConn'
  if (href.includes('45HZLV+CRMRNE+5TII+5YJRM')) return 'SmartRecoveryRing'
  if (href.includes('soxai.co.jp')) return 'SOXIA'

  return null
}

const clickHandler = (event: Event) => {
  const target = event.target as HTMLElement | null
  if (!target) return

  const anchor = target.closest('a') as HTMLAnchorElement | null
  if (!anchor || !anchor.href) return

  const serviceName = detectServiceName(anchor)
  if (!serviceName) return

  AfiClick(serviceName)
}

onMounted(() => {
  const el = articleBodyRef.value
  if (!el) return
  el.addEventListener('click', clickHandler)
})

onBeforeUnmount(() => {
  const el = articleBodyRef.value
  if (!el) return
  el.removeEventListener('click', clickHandler)
})

// ===== 関連記事（同カテゴリ smart-ring から自動抽出） =====
const related = await useMicroCMSGetList<Article>({
  endpoint: '002-article',
  queries: {
    filters: [
      'pageCategory[contains]smart-ring',
      `slug[not_equals]${slug}`,
    ].join('[and]'),
    limit: 50,
  },
})

const relatedArticles = computed(() => {
  if (!related.data?.value) return []
  const list = related.data.value.contents

  // スコア付けで関連度を評価
  return list
    .map((item) => {
      let score = 0

      if (
        item.mainProductName &&
        item.mainProductName === article.value?.mainProductName
      ) {
        score += 50
      }
      if (
        item.articleType &&
        item.articleType[0] === article.value?.articleType?.[0]
      ) {
        score += 20
      }
      if (
        item.mainKeyword &&
        article.value?.mainKeyword &&
        item.mainKeyword.includes(article.value.mainKeyword)
      ) {
        score += 10
      }

      return { ...item, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5) // 上位5件
})
</script>

<template>
  <div class="article-page page-bg">
    <v-row class="article-layout" no-gutters>
      <!-- 左サイド（PCのみ表示：目次など） -->
      <v-col
        cols="0"
        md="2"
        lg="3"
        class="d-none d-md-flex justify-end pr-4"
      >
        <nav
          v-if="tocItems.length"
          class="toc-desktop"
          aria-label="ページ内目次"
        >
          <p class="toc-label">CONTENTS</p>
          <ul class="toc-list">
            <li
              v-for="item in tocItems"
              :key="item.id"
              :class="['toc-item', `toc-item--lv${item.level}`]"
            >
              <a :href="`#${item.id}`">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
      </v-col>

      <!-- メインコンテンツ -->
      <v-col cols="12" md="7" lg="6" class="article-col">
        <div v-if="pending" class="article-card">
          <p>記事を読み込んでいます…</p>
        </div>

        <div v-else-if="error || !article" class="article-card">
          <h1 class="article-title">記事が見つかりませんでした</h1>
          <p class="article-text">
            URL が間違っているか、この記事は現在公開されていない可能性があります。
          </p>
          <NuxtLink to="/smart-ring" class="link-back">
            ← スマートリング比較ページに戻る
          </NuxtLink>
        </div>

        <article v-else class="article-card">
          <!-- モバイル用 目次 -->
          <div v-if="tocItems.length" class="toc-mobile">
            <details>
              <summary>目次を開く</summary>
              <ul class="toc-list">
                <li
                  v-for="item in tocItems"
                  :key="item.id"
                  :class="['toc-item', `toc-item--lv${item.level}`]"
                >
                  <a :href="`#${item.id}`">{{ item.text }}</a>
                </li>
              </ul>
            </details>
          </div>

          <!-- ヘッダー -->
          <header class="article-header">
            <p class="article-category">
              SMART RING INSIGHT
            </p>
            <h1 class="article-title">
              {{ article.title }}
            </h1>

            <!-- メタ情報 -->
            <div
              class="article-meta"
              v-if="article.mainKeyword || article.mainProductName"
            >
              <span v-if="article.mainKeyword" class="meta-chip">
                {{ article.mainKeyword }}
              </span>
              <span
                v-if="article.mainProductName"
                class="meta-chip meta-chip--accent"
              >
                {{ article.mainProductName }}
              </span>
            </div>

            <!-- アイキャッチ -->
            <v-img
              v-if="article.eyecatch?.url"
              :src="article.eyecatch.url"
              class="eyecatch"
              :alt="article.title"
              height="260"
              cover
            />

            <!-- リード文 -->
            <p v-if="article.leadText" class="lead-text">
              {{ article.leadText }}
            </p>
          </header>

          <!-- 本文 -->
          <section
            v-if="renderedBody"
            class="article-body"
            v-html="renderedBody"
            ref="articleBodyRef"
          />

          <!-- FAQ -->
          <section v-if="article.faqBlock?.length" class="faq-section">
            <h2 class="faq-title">よくある質問</h2>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(faq, idx) in article.faqBlock"
                :key="idx"
              >
                <v-expansion-panel-title>
                  {{ faq.question || `質問${idx + 1}` }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="faq-answer" v-html="renderFaqAnswer(faq)" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </section>

          <!-- フッター（CTA + 関連記事 + 戻りリンク） -->
          <footer class="article-footer">
            <!-- CTA ブロック -->
            <section class="article-cta">
              <p class="article-cta__label">SMART RING GUIDE</p>
              <h2 class="article-cta__title">
                自分にぴったりのスマートリングを
                <br class="d-sm-none" />
                一覧で比較してみませんか？
              </h2>
              <p class="article-cta__text">
                RingConn・SOXIA・スマートリカバリーリングの特徴や料金、機能を
                一目で比較できる保存版ページをご用意しています。
              </p>
              <NuxtLink to="/smart-ring" class="article-cta__button">
                スマートリング比較ページを見る
              </NuxtLink>
            </section>

            <!-- 関連記事 -->
            <section class="related-articles" v-if="relatedArticles.length">
              <h2 class="related-title">関連記事</h2>

              <ul class="related-list">
                <li
                  v-for="item in relatedArticles"
                  :key="item.id"
                  class="related-item"
                >
                  <NuxtLink :to="`/smart-ring/${item.slug}`">
                    <div class="related-card">
                      <!-- サムネイル -->
                      <div class="related-thumb" v-if="item.eyecatch?.url">
                        <v-img
                          :src="item.eyecatch.url"
                          :alt="item.title"
                          cover
                        />
                      </div>

                      <!-- テキスト部分 -->
                      <div class="related-content">
                        <p class="related-name">
                          {{ item.title }}
                        </p>
                        <p class="related-tag" v-if="item.mainProductName">
                          {{ item.mainProductName }}
                        </p>
                      </div>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </section>

            <!-- 戻りリンク -->
            <NuxtLink to="/smart-ring" class="link-back">
              ← スマートリング比較ページに戻る
            </NuxtLink>
          </footer>
        </article>
      </v-col>

      <!-- 右サイド（PCのみ表示：将来用） -->
      <v-col
        cols="0"
        md="3"
        lg="3"
        class="d-none d-md-flex pl-4"
      >
        <aside class="sidebar-placeholder">
          <!-- 将来的にランキング・バナー・CTA などをここに -->
          <p class="sidebar-title">Side Area</p>
          <p class="sidebar-text">
            (準備中)広告・おすすめ記事・CTA などを配置可能。
          </p>
        </aside>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
/* スタイルは _article.scss で管理 */
</style>
