// types/article.ts などに置いておくと楽
export type FAQItem = {
  question?: string
  answer?: string
}

export type Eyecatch = {
  url: string
  height?: number
  width?: number
}

export type Article = {
  id: string
  title: string
  slug: string

  pageCategory?: string           // 'smart-ring' など
  articleType?: 'review' | 'comparison' | 'howto' | 'faq' | 'column'
  statusFlag?: 'public' | 'draft' | 'noindex'

  description?: string
  mainKeyword?: string
  subKeywords?: string
  canonicalPath?: string

  mainProductName?: string
  relatedProducts?: string

  leadText?: string
  body?: string

  faqBlock?: FAQItem[]
  eyecatch?: Eyecatch
}
