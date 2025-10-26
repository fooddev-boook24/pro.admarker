import { Blog } from "~~/types/blog";
import { createClient } from "microcms-js-sdk"


export default defineEventHandler(async (event) => {
  let sitemapInfos: {
    loc: string;
    lastmod: string;
    priority: string;
  }[]=[]

  const client = createClient({ serviceDomain: 'admarker', apiKey: 'RXxlDIKWAIc67jshKYQk9cYFD6MQZe0Btsed' });
  const r = await client.get({ endpoint: 'blogs' });
  r.contents.forEach((el)=>{
    sitemapInfos.push({
      loc:"https://admarker.jp/blog/"+String(el.id),
      lastmod:el.updatedAt,
      priority:"1"
    })
  });



  let sitemapString = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  `;

  for (let i = 0, iLength = sitemapInfos.length; i < iLength; i = (i + 1) | 0) {
    const sitemapInfo = sitemapInfos[i];

    sitemapString += `
      <url>
        <loc>${sitemapInfo.loc}</loc>
        <lastmod>${sitemapInfo.lastmod}</lastmod>
        <priority>${sitemapInfo.priority}</priority>
      </url>
    `;
  }

  sitemapString += `</urlset>`;

  event.res.setHeader('content-type', 'text/xml');
  event.res.end(sitemapString);
});