<script setup lang="ts">
const props = defineProps<{ dataStore: any }>()

// TOP5（総合ランキング基準：既存と揃える）
const { data } = await useMicroCMSGetList({
  endpoint: '001-main',
  queries: {
    limit: 5,
    orders: '-servicePoints',
    filters: 'pageCategory[equals]mattress',
  },
})

const contents = computed(() => data.value?.contents ?? [])

// ✅ ヘッダー（比較項目名）はCMSの tableKey1~3 を参照（ハードコードなし）
const headers = computed(() => {
  const first = contents.value?.[0]
  return [first?.tableKey1, first?.tableKey2, first?.tableKey3].filter(Boolean)
})

// ✅ “勝ちコピー”（行ラベル）
// これは「商品固有の属性」をハードコードしない。
// rank/並び順だけで“迷わせない”文言にする（CVの邪魔をしない範囲）
function rowLabel(idx: number) {
  if (idx === 0) return '迷ったらこれ'
  if (idx === 1) return '有力候補'
  if (idx === 2) return '比較候補'
  if (idx === 3) return '比較候補'
  return '軽さ・着け心地枠'
}

function medal(idx: number) {
  if (idx === 0) return '🥇'
  if (idx === 1) return '🥈'
  if (idx === 2) return '🥉'
  return ''
}

function trackAffiliateClick(serviceName: string) {
  try {
    ;(window as any).dataLayer?.push?.({
      event: 'AfiClick',
      serviceName,
      page: location.pathname,
      category: 'smart-ring',
    })
  } catch (_) {}
}
</script>

<template>
  <section class="compare">
    <!-- ✅ FV直下：読める薄プレート（ダサくない） -->
    <div class="compare__headPlate">
      <div class="compare__headLeft">
        <div class="compare__title">主要マットレス比較</div>
        <div class="compare__sub">結論：迷ったら上位から選べばOK（TOP5）</div>
      </div>

      <div class="compare__headRight" v-if="contents.length">
        <span class="compare__hintInline">→ 横にスクロール</span>
      </div>
    </div>


    <div class="compare__scroll" v-if="contents.length">
      <v-table density="compact" class="compare__table">
        <thead>
          <tr>
            <th class="col-name text-left">商品</th>
            <th
              v-for="(h, i) in headers"
              :key="i"
              class="col-key text-center"
              :title="h"
            >
              <span class="truncate headKey">{{ h }}</span>
            </th>
            <th class="col-cta text-center"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(c, idx) in contents"
            :key="c.id"
            class="rowCard"
            :class="{ 'rowCard--best': idx === 0 }"
          >
            <td class="col-name text-left cell cell--left">
              <!-- 上段：メダル＋商品名（1行固定） -->
              <div class="nameLine">
                <span class="medal" v-if="medal(idx)">{{ medal(idx) }}</span>
                <span class="truncate name" :title="c.serviceName">{{ c.serviceName }}</span>
              </div>

              <!-- 下段：行ラベル（勝ちコピー）＋CMSバッジ（短文） -->
              <div class="badgeLine">
                <span class="tag tag--primary" :title="rowLabel(idx)">{{ rowLabel(idx) }}</span>

                <span
                  v-if="c.servicePrivilege1"
                  class="tag tag--ghost truncate"
                  :title="c.servicePrivilege1"
                >
                  {{ c.servicePrivilege1 }}
                </span>

              </div>
            </td>

            <!-- 値：すべて1行固定＋省略 -->
            <td class="col-val text-center cell" :title="c.tableValue1">
              <span class="truncate val">{{ c.tableValue1 }}</span>
            </td>
            <td class="col-val text-center cell" :title="c.tableValue2">
              <span class="truncate val">{{ c.tableValue2 }}</span>
            </td>
            <td class="col-val text-center cell" :title="c.tableValue3">
              <span class="truncate val">{{ c.tableValue3 }}</span>
            </td>

            <td class="col-cta text-center cell cell--right">
              <!-- ✅ 公式ボタン：確実に動く（アンカー） -->
              <v-btn
                class="btn"
                :class="{ 'btn--best': idx === 0 }"
                size="small"
                rounded="xl"
                variant="flat"
                :href="c.pageURL"
                target="_blank"
                rel="sponsored noopener"
                @click="trackAffiliateClick(c.serviceName)"
              >
                公式サイトを見る
              </v-btn>

            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div v-else class="compare__loading">
      <div class="text-center">データ取得中…</div>
    </div>
  </section>
</template>

<style scoped>
/* =========================
   CompareList.vue 最終CSS（全文）
   ========================= */

/* セクション全体：FVに被せて“浮かせる” */
.compare {
  margin: -40px 12px 22px;
  position: relative;
  z-index: 10;
}

/* ✅ 見出し：読める薄プレート（被せても視認性が落ちない） */
.compare__headPlate {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;

  padding: 12px 14px;
  margin: 0 0 12px;

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.55);
}

.compare__headLeft {
  min-width: 0; /* truncate用 */
}

.compare__title {
  font-size: 1.12rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.compare__sub {
  margin-top: 4px;
  font-size: 0.84rem;
  color: rgba(0, 0, 0, 0.55);
}

/* 右側：横スクロール示唆（控えめ） */
.compare__headRight {
  flex: 0 0 auto;
}

.compare__hintInline {
  font-size: 0.74rem;
  font-weight: 800;
  color: rgba(0,0,0,0.42);
  white-space: nowrap;
}

/* 横スクロール領域：カードの器 */
.compare__scroll {
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  border-radius: 18px;

  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
}


/* テーブル：カード行にするため separate + 行間 */
.compare__table {
  min-width: 720px;
  table-layout: fixed;

  border-collapse: separate;
  border-spacing: 0 20px; /* ← 行間 20px */

  background: transparent;
  padding: 10px 10px 14px;
}

/* ヘッダーは薄く（主役にしない） */
.compare__table thead th {
  border: none !important;
  padding: 8px 10px;
  font-size: 0.74rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.45);
}
.compare__table :deep(.v-table__wrapper) {
  overflow: visible;
}
/* 行カード：tdで丸角と影を作る */
.rowCard td {
  border: none !important;
}

/* セルの“カード感” */
.cell {
  background: rgba(255,255,255,0.96);
  padding: 14px 12px !important;
  vertical-align: middle;

  box-shadow: 0 10px 26px rgba(0,0,0,0.06);
}

.cell--left {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.cell--right {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

/* 列幅：折り返し殺す */
.col-name { width: 280px; }
.col-key  { width: 150px; }
.col-val  { width: 150px; }
.col-cta  { width: 130px; }

/* 省略 */
.truncate {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
}

/* 商品名 */
.nameLine {
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
}

.medal {
  font-size: 0.95rem;
  flex: 0 0 auto;
}

.name {
  font-size: 0.96rem;
  font-weight: 900;
  letter-spacing: 0.01em;
}

/* バッジ（行ラベル + CMS特典） */
.badgeLine {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  max-width: 100%;
  flex-wrap: nowrap; /* 折り返しを抑える */
}

.tag {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  max-width: 160px;
}

.tag--primary {
  color: rgba(0,0,0,0.78);
  background: rgba(0,0,0,0.06);
}

.tag--ghost {
  color: rgba(0,0,0,0.60);
  background: rgba(255,255,255,0.70);
  border: 1px solid rgba(0,0,0,0.08);
}

/* 値 */
.val {
  font-size: 0.90rem;
  font-weight: 900;
  letter-spacing: 0.01em;
}

/* CTAボタン：馴染ませる（主張しすぎない） */
.btn {
  font-weight: 900;
  letter-spacing: 0.01em;
  text-transform: none;
  border-radius: 999px;
  box-shadow: none;
}

/* ローディング */
.compare__loading {
  padding: 14px 0;
  color: rgba(0,0,0,0.55);
}

/* モバイル微調整 */
@media (max-width: 420px) {
  .compare {
    margin: -40px 10px 18px;
  }

  .compare__headPlate {
    padding: 11px 12px;
    border-radius: 16px;
  }

  .compare__title {
    font-size: 1.06rem;
  }

  .col-name { width: 260px; }
  .compare__table { min-width: 700px; }
}

/* =========================
   🥇 1位行を勝たせる
   ========================= */

/* 行全体を“うっすら”強調 */
.rowCard--best .cell {
  background: linear-gradient(
    180deg,
    rgba(255, 247, 230, 0.95),
    rgba(255, 255, 255, 0.98)
  );
  box-shadow: 0 14px 36px rgba(0,0,0,0.10);
}

/* 左側に「おすすめ感」を出す */
.rowCard--best .cell--left {
  position: relative;
}
.rowCard--best .cell--left::before {
  content: 'おすすめ';
  position: absolute;
  top: -10px;
  left: 16px;

  font-size: 0.70rem;
  font-weight: 900;
  letter-spacing: 0.04em;

  padding: 4px 10px;
  border-radius: 999px;

  color: #6b4f00;
  background: rgba(255, 210, 120, 0.95);
}

/* CTAを少しだけ強く（下品にしない） */
.btn--best {
  background: linear-gradient(
    180deg,
    #ffd36a,
    #ffbf3f
  );
  color: #3b2a00;
}


</style>
