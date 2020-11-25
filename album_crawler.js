const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })

  var album_name = "Queen II"
  var album_artist = "Queen"

  await page.goto(`https://www.google.fr/search?q=${album_name}+${album_artist}+vinyl+cover&tbm=isch&ved=2ahUKEwimtLSPwZjtAhVNQRoKHUdoAxkQ2-cCegQIABAA&oq=${album_name}+${album_artist}vinyl+cover&gs_lcp=CgNpbWcQA1AAWABgyBFoAHAAeACAAQCIAQCSAQCYAQCqAQtnd3Mtd2l6LWltZw&sclient=img&ei=wpW7X6bLNs2CacfQjcgB&authuser=0&bih=716&biw=1440&hl=fr`);
  await page.waitForSelector('body');
  await page.click(".rg_i")
  await delay(1000);
  await page.click(".h04bR")
  await delay(1000);
  let link = await page.evaluate(() => {
    return document.querySelector(".c1AlVc").innerHTML;
  })

  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1280, height: 800 })
  await page2.goto(link)

  album_name = album_name.replace(/ /g, "-")
  album_name = album_name.replace(/(['.?*&+^$[\]\\(){}|])/g, "");
  album_name = album_name.toLowerCase()

  const img = await page2.$("#imi");
  await img.screenshot({
    path: 'album-covers/' + album_name + '.png',
  });

  await browser.close();
})();