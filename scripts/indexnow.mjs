const HOST = "www.ventanasbr.cl";
const KEY = "7602683bf7264447ba3dea5c505ca843";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const sitemapResponse = await fetch(SITEMAP_URL, { cache: "no-store" });

if (!sitemapResponse.ok) {
  console.error(`No se pudo leer el sitemap: ${sitemapResponse.status}`);
  process.exit(1);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1]
);

if (urlList.length === 0) {
  console.error("El sitemap no contiene URLs.");
  process.exit(1);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow: ${response.status} ${response.statusText}`);
console.log(urlList.join("\n"));

if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}
