const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://eduinix.com', { waitUntil: 'networkidle2' });
  
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => img.src).filter(src => src.includes('http'));
  });
  
  console.log(JSON.stringify(images, null, 2));
  await browser.close();
})();
