<script setup lang="ts">
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

// ===== SEO =====
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

          <!-- 戻りリンク -->
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

            <!-- 既存の戻りリンク -->
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

</style>
