var puppeteer = require('puppeteer');

async function run() {
    console.log('hello world');
    var options = {headless: false}
    var browser = await puppeteer.launch(options);
    var page = await browser.newPage();
    await page.setViewport({height:1080, width: 1920});
    page.goto('https://github.com');
}


run();