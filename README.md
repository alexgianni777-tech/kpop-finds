# K-Pop Finds

Independent K-pop merch and gift guides for fans of BTS, BLACKPINK, Stray Kids, KATSEYE, ENHYPEN, aespa, TWICE, KPop Demon Hunters and more.

## Status

This is the standalone repository for K-Pop Finds. The GitHub Pages pilot is now `index,follow` with canonical URLs, `robots.txt` and an XML sitemap so search engines can discover the content. A custom domain and dedicated Amazon Associates tracking ID are still recommended before larger promotion.

## Included

- Visual homepage with licensed artist photography, fandom spotlights, merch-category cards, verified real-product highlights, watch routes and merch finder
- 8 redesigned fandom guides with official-store-first checks, licensed artist media, three verified real products and visual shopping paths
- Redesigned cross-fandom light-stick buyer guide
- Redesigned K-pop gifts for teens guide
- 6 additional search-intent guides for authenticity, concert essentials, albums, photocards, beginners and budget gifts
- Buyer-guide hub plus XML sitemap and crawlable robots.txt
- 24-product verified official-store directory in `verified-products.json` and `products.html`
- 8 privacy-enhanced YouTube watch + shop pages plus `watch.html` hub
- Dormant AdSense placements
- Privacy page and research notes

## Monetization

Amazon links currently use the existing Associates tracking tag as a placeholder. Verified product cards link to official artist/label/franchise stores first. Where an exact Amazon item has been independently matched, the paid button can go directly to that ASIN; otherwise it stays a clearly labelled exact-name marketplace search. Add the final K-Pop Finds URL/domain in Associates Central before promoting the site and preferably create a dedicated tracking ID so K-Pop Finds performance is separable from Unicorn Finds.

For product images, do not scrape Amazon retail pages. Use Amazon Product Links from Associates Central, or the Creators API once the account is eligible. Amazon's current Creators API requires 10 qualifying sales in the previous 30 days; image URLs and most other API product fields have a one-day cache window. The site should therefore treat Creators API imagery as short-lived data, not permanent local assets.

AdSense is disabled until an approved `ca-pub-...` ID and ad-unit IDs are added to `assets/ads-config.js`.

## Image policy

Do not scrape or hotlink artist press photos, album art, Netflix artwork, official-store product photography or Amazon product images without an allowed source/license. The current design uses openly licensed Wikimedia Commons artist photography with attribution, plus original CSS graphics/icons for merch categories. Product pages use real verified product names and official-store URLs, but retailer product photography is intentionally not copied or hotlinked. Add product imagery only through an approved Amazon/brand source.

## Product verification

The current verified catalog contains 24 named official products (three per fandom) checked on 3 October 2026. Stock, prices and regional availability are deliberately not frozen into editorial cards; users are sent to the official listing for current commercial details.

## Video pages

Each fandom has a page under `/watch/` with a privacy-enhanced `youtube-nocookie.com` embed of the featured official video from `catalog.json`, plus links to the fandom buying guide and three verified products. K-Pop Finds does not host video files, lyrics or copied thumbnails.

## Discovery status

The GitHub Pages pilot is submitted to IndexNow from GitHub Actions after main-branch content changes. The key is hosted inside the /kpop-finds/ path and the workflow supplies that exact keyLocation, which allows IndexNow to verify and submit URLs under the same path.

Google Search Console is not yet connected for this GitHub Pages URL. Add and verify the URL-prefix property `https://alexgianni777-tech.github.io/kpop-finds/` in Search Console before expecting GSC reporting for this site.
