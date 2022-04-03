const puppeteer = require('puppeteer');
const jQuery = require('jquery');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var userAgent = require('user-agents');
var randomUseragent = require('random-useragent');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
var today = new Date();
const { prompts } = require('inquirer');
const express = require('express');
const config = require('./config.json'); // Website config
const FormData = require('form-data');
const fetch = require('node-fetch');
const app = express();
const info = require('./info.json')
require('dotenv').config();

// Set up the CLI
clear()
console.log(
    chalk.red.bold(
        figlet.textSync('Radar Preme', {horizontalLayout: 'fitted' })
    ),
)

console.log(
  chalk.red(' Powered by Radar Scripts')
)

console.log(
  chalk.whiteBright(' ----------------------------------------------------------------------------------------------------------')
)

console.log(
  chalk.redBright(' Radar Scripts Browser Mode Supreme Bot.'),
)

console.log(' ')

console.log(
  chalk.redBright(' This bot will automate the purchasing of products from supremenewyork.com.'),
)

console.log(' ')

console.log(
  chalk.redBright(' Simply follow the user input below, once completed, an instance of chrome will appear and login to google.'),
)

console.log(' ')

console.log(
  chalk.redBright(' Then it will find the supreme product automatically and checkout your preffered size and colour.'),
)

console.log(' ')

console.log(
  chalk.redBright(' Good Luck!'),
)

console.log(
  chalk.whiteBright(' ----------------------------------------------------------------------------------------------------------')
)

// Discord OAuth2

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initalization
inquirer.prompt([
  {
      type: 'list',
      name: 'Size',
      message: chalk.red('Select start when you want to launch discord oauth'),
      choices: ['Start']
  }
])
.then (async () => {
  var options = {
    headless: false,
    //executablePath: 'Program Files (x86)/Google/Chrome/Application'
  },
    browser = await puppeteer.launch(options);
    var today = new Date();
    console.log(
      chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Launched Discord Auth')
    )
    //console.log(process.env.REDIRECT_URI)
    //console.log(process.env.SCOPES)
  page = await browser.newPage();     
  //await page.setViewport({height:1070, width: 1910});
  page.goto('http://localhost:8080/', {waitUntil: 'load', timeout: 0});
app.use(require('express-session')(config.session))
//console.log('wagwan')
app.get('/', async (req, resp) => {
    if(!req.session.bearer_token)
        return resp.redirect('/login') // Redirect to login page
    
    const data = await fetch(`https://discord.com/api/users/@me`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } }); // Fetching user data
    const json = await data.json();///users/@me/guilds
    const data1 = await fetch(`https://discord.com/api/users/@me/guilds`, {headers: { Authorization: `Bearer ${req.session.bearer_token}` } }); // Fetching user data
    const json1 = await data1.json();///users/@me/guilds

    if(!json.username) // This can happen if the Bearer token has expired or user has not given permission "indentity"
        return resp.redirect('/login') // Redirect to login page

    resp.send(`<h1>Hello, ${json.username}#${json.discriminator}!</h1>` +
              `<img src="https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=512">`) // Show user's nametag and avatar
    //console.log(json)
    //console.log(json1[0])
    //console.log(json1[0].id)
    //console.log(json1.name)
    var x = ''
    for (i in json1) {
        x += json1[i].id + ',';
      }
    var server_ids = x.split(',')
    //console.log(server_ids)
    if (server_ids.includes('729640710487408660')){
        //console.log('User is Authorised, enabling radar-preme...')
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'User is Authorised')
        )
        var today = new Date();
        console.log(
          chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Enabling radar-preme...')
        )
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Radar-preme successfully enabled')
        )
        AUTHORIZED = true
        browser.close()
    } else {
      var today = new Date();
      console.log(
        chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'User is not Authorised')
      )
      var today = new Date();
      console.log(
        chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Please contact support in the official discord server if this problem persists')
      )
      AUTHORIZED = false
      browser.close()
      sleep(3000)
      var today = new Date();
      console.log(
        chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Please close the programme')
      )
    }
})

app.get('/login/callback', async (req, resp) => {
    const accessCode = req.query.code;
    if (!accessCode) // If something went wrong and access code wasn't given
        return resp.send('No access code specified');

    // Creating form to make request
    const data = new FormData();
    data.append('client_id', config.oauth2.client_id);
    data.append('client_secret', config.oauth2.secret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', config.oauth2.redirect_uri);
    data.append('scope', 'identify');
    data.append('scope', 'guilds');
    data.append('code', accessCode);

    // Making request to oauth2/token to get the Bearer token
    const json = await (await fetch('https://discord.com/api/oauth2/token', {method: 'POST', body: data})).json();
    //console.log(json)
    req.session.bearer_token = json.access_token;

    resp.redirect('/'); // Redirecting to main page
});

app.get('/login', (req, res) => {
    // Redirecting to login url
    /*res.redirect(`https://discord.com/api/oauth2/authorize` +
                 `?client_id=${config.oauth2.client_id}` +
                 `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
                 `&response_type=code&scope=${encodeURIComponent(process.env.SCOPES)}`)*/
      res.redirect(`https://discord.com/api/oauth2/authorize?client_id=732681914896613416&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds`)
})

// Starting our application
  //console.log('wagwan')
  app.listen(config.port || 80, () => {
      //console.log(`Listening on port ${config.port || 80}`)
      //console.log('here?')
      async () => { 

      }
  });
})
.then (async () => {
AUTHORIZED = false
async function checkuser() {
  await sleep(1000)
  //await console.log('checking')
    if (AUTHORIZED == true) {
    //console.log('authorised')
    return
  } else {
    //console.log('not')
    await checkuser()
  }
}
await checkuser()
})
.then (async () => {
  //console.log('hold your horses')
  await inquirer.prompt([
    {
        type: 'list',
        name: 'Category',
        message: chalk.red('Please select a category:'), 
        choices: ['Jackets','Shirts','Tops/sweaters', 'Sweatshirts', 'Pants', 'Shorts', 'Hats', 'Bags', 'Accessories', 'Skate'],    
    }
  ])
  .then(answers => {
    if (answers.Category == 'Jackets') {
      category = 'jackets'
    } else if (answers.Category == 'Shirts') {
      category = 'shirts'
    } else if (answers.Category == 'Tops/sweaters') {
      category = 'tops_sweaters'
    } else if (answers.Category == 'Sweatshirts') {
      category = 'sweatshirts'
    } else if (answers.Category == 'Pants') {
      category = 'pants'
    } else if (answers.Category == 'Shorts') {
      category = 'shorts'
    } else if (answers.Category == 'Hats') {
      category = 'hats'
    } else if (answers.Category == 'Bags') {
      category = 'bags'
    } else if (answers.Category == 'Accessories') {
      category = 'accessories'
    } else if (answers.Category == 'Skate') {
      category = 'skate'
    }
    //console.log(category)
  })
  })
  .then (() => {
    inquirer.prompt([
      {
          type: 'input',
          name: 'Keyword',
          message: chalk.red('Please enter the keyword:')
      }
    ])
    .then(answer => {
      kw = answer.Keyword
      //console.log(kw)
    })
  .then(() => {
    inquirer.prompt([
      {
          type: 'input',
          name: 'Colour',
          message: chalk.red('Please enter the colour:')
      }
    ])
    .then(answer2 => {
      ITEM_COLOUR = answer2.Colour
      //console.log(ITEM_COLOUR)
    })
  .then(() => {
    inquirer.prompt([
      {
          type: 'list',
          name: 'Size',
          message: chalk.red('Please select the size:'),
          choices: ['Small', 'Medium', 'Large', 'XLarge', 'N/A']
      }
    ])
    .then(answer3 => {
      ITEM_SIZE = answer3.Size
      //console.log(ITEM_SIZE)
    })
  .then(() => {
    inquirer.prompt([
      {
          type: 'list',
          name: 'Size',
          message: chalk.red('Select start when you want to start the task (Please start at least 30 seconds before the drop)'),
          choices: ['Start']
      }
    ])
    .then(() => {
      //logintochrome()
      //.then (async () => {
        //await searchkw()
      //})
      searchkw()
    })
  })
  })
  })
  })

//global.document = new JSDOM('https://www.supremenewyork.com/shop/all/accessories').window.document;

//PRODUCT INFO
//var kw = "Fold"
//var colour = "Black"
//ITEM_SIZE = "Large"


//USER INFO
const BILLING_NAME = info.billing_name;
const EMAIL = info.email;
const TELEPHONE = info.phone_number;
const BILLING_STREET = info.billing_street;
const BILLING_CITY = info.billing_street;
const BILLING_POSTCODE = info.Postcode_zip;
const BILLING_COUNTRY = info.country;
const BILLING_STATE = info.billing_state;
const CARD_TYPE = info.card_type;
const CARD_NUMBER = info.card_number;
const CARD_MONTH = info.card_month;
const CARD_YEAR = info.card_year;

function functionToHandleError(){
  return
}

/*function Jackets() {
  cateogory = 'Jackets'
}
function Shirts() {
  cateogory = 'Shirts'
}
function Topssweaters() {
  cateogory = 'Topes/Sweaters'
}
function Sweatshirts() {
  cateogory = 'Sweatshirts'
}
function Pants() {
  cateogory = 'Pants'
}
function Shorts() {
  cateogory = 'Shorts'
}
function Hats() {
  cateogory = 'Hats'
}
function Bags() {
  cateogory = 'Bags'
}
function Accessories() {
  cateogory = 'Accessories'
}
function Skate() {
  cateogory = 'Skate'
}


(async () => {
  this.Jackets = Jackets
  this.Shirts = Shirts
  this.Topssweaters =Topssweaters
  this.Sweatshirts = Sweatshirts
  this.Pants = Pants
  this.Shorts = Shorts
  this.Hats = Hats
  this.Bags = Bags
  this.Accessories = Accessories
  this.Skate = category = Skate

  const menuChoices = await inquirer.prompt(initChoices)

  await this[menuChoices.action.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())]()
*/
async function logintochrome() {
  var options = {
    headless: false,
    //executablePath: 'Program Files (x86)/Google/Chrome/Application'
  },
    browser = await puppeteer.launch(options);
    page = await browser.newPage();     
    //await page.setViewport({height:1070, width: 1910});
    await page.goto('https://accounts.google.com/signin/v2/identifier?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en-GB&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
    var today = new Date();
    console.log(
      chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Logging into Chrome...')
    )
        await page.waitForSelector('#identifierId')
        await page.type('#identifierId', info.gmail);
        await page.click('#identifierNext > div > button > div.VfPpkd-RLmnJb');
        await page.waitForSelector('#password > div.aCsJod.oJeWuf > div > div.OabDMe.cXrdqd.Y2Zypf');
        await page.type('#password > div.aCsJod.oJeWuf > div > div.OabDMe.cXrdqd.Y2Zypf', info.gmailpass);
        await page.click('#passwordNext > div > button > div.VfPpkd-RLmnJb');

  }


//logintochrome()

async function searchkw() {
  /*var options = {
    headless: false,
  },
    browser = await puppeteer.launch(options);
    page = await browser.newPage();    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.0 Safari/537.36')
    //await page.setViewport({height:1070, width: 1910});
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});*/
    var options = {
      headless: false,
      //executablePath: 'Program Files (x86)/Google/Chrome/Application'
    },
    browser = await puppeteer.launch(options);
    page = await browser.newPage();   
    //await page.waitForNavigation()
    var today = new Date();
    console.log(
      chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + "Logged in! Redirecting to supreme!")
    )
    await page.goto(`https://www.supremenewyork.com/shop/all/${category}`);




  try{
   // console.log('hello initial')

      //Get product names
    try {
    const [p1] = await page.$x('//*[@id="container"]/article[1]/div/h1/a');
    txt1 = await p1.getProperty('textContent');
    href1 = await p1.getProperty('href');
    rawTxt1 = await txt1.jsonValue();
    srcTxt1 = await href1.jsonValue();
    const [c1] = await page.$x('//*[@id="container"]/article[1]/div/p/a');
    colour1 = await c1.getProperty('textContent');
    rawColour1 = await colour1.jsonValue();
    } catch {
      try{
      const [p1] = await page.$x('//*[@id="container"]/li[1]/div/div[1]/a')
      txt1 = await p1.getProperty('textContent');
      href1 = await p1.getProperty('href');
      rawTxt1 = await txt1.jsonValue();
      srcTxt1 = await href1.jsonValue();
      const [c1] = await page.$x('//*[@id="container"]/li[1]/div/div[2]/a');
      colour1 = await c1.getProperty('textContent');
      rawColour1 = await colour1.jsonValue();
      } catch {
        functionToHandleError()
      }
    }

    //console.log({rawTxt1, srcTxt1, rawColour1});

    try {
      const [p2] = await page.$x('//*[@id="container"]/article[2]/div/h1/a');
      txt2 = await p2.getProperty('textContent');
      href2 = await p2.getProperty('href');
      rawTxt2 = await txt2.jsonValue();
      srcTxt2 = await href2.jsonValue();
      const [c2] = await page.$x('//*[@id="container"]/article[2]/div/p/a');
      colour2 = await c2.getProperty('textContent');
      rawColour2 = await colour1.jsonValue();
      } catch {
        try{
        const [p2] = await page.$x('//*[@id="container"]/li[2]/div/div[1]/a')
        txt2 = await p2.getProperty('textContent');
        href2 = await p2.getProperty('href');
        rawTxt2 = await txt2.jsonValue();
        srcTxt2 = await href2.jsonValue();
        const [c2] = await page.$x('//*[@id="container"]/li[2]/div/div[2]/a');
        colour2 = await c2.getProperty('textContent');
        rawColour2 = await colour2.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt2, srcTxt2});

    try {
      const [p3] = await page.$x('//*[@id="container"]/article[3]/div/h1/a');
      txt3 = await p3.getProperty('textContent');
      href3 = await p3.getProperty('href');
      rawTxt3 = await txt3.jsonValue();
      srcTxt3 = await href3.jsonValue();
      const [c3] = await page.$x('//*[@id="container"]/article[3]/div/p/a');
      colour3 = await c3.getProperty('textContent');
      rawColour3 = await colour3.jsonValue();
      } catch {
        try {
        const [p3] = await page.$x('//*[@id="container"]/li[3]/div/div[1]/a')
        txt3 = await p3.getProperty('textContent');
        href3 = await p3.getProperty('href');
        rawTxt3 = await txt3.jsonValue();
        srcTxt3 = await href3.jsonValue();
        const [c3] = await page.$x('//*[@id="container"]/li[3]/div/div[2]/a');
        colour3 = await c3.getProperty('textContent');
        rawColour3 = await colour3.jsonValue();
        } catch {
          functionToHandleError()
        }
      }
    //console.log({rawTxt3});

    try {
      const [p4] = await page.$x('//*[@id="container"]/article[4]/div/h1/a');
      txt4 = await p4.getProperty('textContent');
      href4 = await p4.getProperty('href');
      rawTxt4 = await txt4.jsonValue();
      srcTxt4 = await href4.jsonValue();
      const [c4] = await page.$x('//*[@id="container"]/article[4]/div/p/a');
      colour4 = await c4.getProperty('textContent');
      rawColour4 = await colour4.jsonValue();
      } catch {
        try {
        const [p4] = await page.$x('//*[@id="container"]/li[4]/div/div[1]/a')
        txt4 = await p4.getProperty('textContent');
        href4 = await p4.getProperty('href');
        rawTxt4 = await txt4.jsonValue();
        srcTxt4 = await href4.jsonValue();
        const [c4] = await page.$x('//*[@id="container"]/li[4]/div/div[2]/a');
        colour4 = await c4.getProperty('textContent');
        rawColour4 = await colour4.jsonValue();
        } catch {
          functionToHandleError()
        }
      }
    //console.log({rawTxt4});

    try {
      const [p5] = await page.$x('//*[@id="container"]/article[5]/div/h1/a');
      txt5 = await p5.getProperty('textContent');
      href5 = await p5.getProperty('href');
      rawTxt5 = await txt5.jsonValue();
      srcTxt5 = await href5.jsonValue();
      const [c5] = await page.$x('//*[@id="container"]/article[5]/div/p/a');
      colour5 = await c5.getProperty('textContent');
      rawColour5 = await colour5.jsonValue();
      } catch {
        try {
        const [p5] = await page.$x('//*[@id="container"]/li[5]/div/div[1]/a')
        txt5 = await p5.getProperty('textContent');
        href5 = await p5.getProperty('href');
        rawTxt5 = await txt5.jsonValue();
        srcTxt5 = await href5.jsonValue();
        const [c5] = await page.$x('//*[@id="container"]/li[5]/div/div[2]/a');
        colour5 = await c5.getProperty('textContent');
        rawColour5 = await colour5.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt5});


    try {
      const [p6] = await page.$x('//*[@id="container"]/article[6]/div/h1/a');
      txt6 = await p6.getProperty('textContent');
      href6 = await p6.getProperty('href');
      rawTxt6 = await txt6.jsonValue();
      srcTxt6 = await href6.jsonValue();
      const [c6] = await page.$x('//*[@id="container"]/article[6]/div/p/a');
      colour6 = await c6.getProperty('textContent');
      rawColour6 = await colour6.jsonValue();
      } catch {
        try {
        const [p6] = await page.$x('//*[@id="container"]/li[6]/div/div[1]/a')
        txt6 = await p6.getProperty('textContent');
        href6 = await p6.getProperty('href');
        rawTxt6 = await txt6.jsonValue();
        srcTxt6 = await href6.jsonValue();
        const [c6] = await page.$x('//*[@id="container"]/li[6]/div/div[2]/a');
        colour6 = await c6.getProperty('textContent');
        rawColour6 = await colour6.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt6});

    try {
      const [p7] = await page.$x('//*[@id="container"]/article[7]/div/h1/a');
      txt7 = await p7.getProperty('textContent');
      href7 = await p7.getProperty('href');
      rawTxt7 = await txt7.jsonValue();
      srcTxt7 = await href7.jsonValue();
      const [c7] = await page.$x('//*[@id="container"]/article[7]/div/p/a');
      colour7 = await c7.getProperty('textContent');
      rawColour7 = await colour7.jsonValue();
      } catch {
        try {
        const [p7] = await page.$x('//*[@id="container"]/li[7]/div/div[1]/a')
        txt7 = await p7.getProperty('textContent');
        href7 = await p7.getProperty('href');
        rawTxt7 = await txt7.jsonValue();
        srcTxt7 = await href7.jsonValue();
        const [c7] = await page.$x('//*[@id="container"]/li[7]/div/div[2]/a');
        colour7 = await c7.getProperty('textContent');
        rawColour7 = await colour7.jsonValue();
        } catch {
          functionToHandleError()
        }
      }
    

    //console.log({rawTxt7});


    try {
      const [p8] = await page.$x('//*[@id="container"]/article[8]/div/h1/a');
      txt8 = await p8.getProperty('textContent');
      href8 = await p8.getProperty('href');
      rawTxt8 = await txt8.jsonValue();
      srcTxt8 = await href8.jsonValue();
      const [c8] = await page.$x('//*[@id="container"]/article[8]/div/p/a');
      colour8 = await c8.getProperty('textContent');
      rawColour8 = await colour8.jsonValue();
      } catch {
        try {
        const [p8] = await page.$x('//*[@id="container"]/li[8]/div/div[1]/a')
        txt8 = await p8.getProperty('textContent');
        href8 = await p8.getProperty('href');
        rawTxt8 = await txt8.jsonValue();
        srcTxt8 = await href8.jsonValue();
        const [c8] = await page.$x('//*[@id="container"]/li[8]/div/div[2]/a');
        colour8 = await c8.getProperty('textContent');
        rawColour8 = await colour8.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt8});

    try {
      const [p9] = await page.$x('//*[@id="container"]/article[9]/div/h1/a');
      txt9 = await p9.getProperty('textContent');
      href9 = await p9.getProperty('href');
      rawTxt9 = await txt9.jsonValue();
      srcTxt9 = await href9.jsonValue();
      const [c9] = await page.$x('//*[@id="container"]/article[9]/div/p/a');
      colour9 = await c9.getProperty('textContent');
      rawColour9 = await colour9.jsonValue();
      } catch {
        try {
        const [p9] = await page.$x('//*[@id="container"]/li[9]/div/div[1]/a')
        txt9 = await p9.getProperty('textContent');
        href9 = await p9.getProperty('href');
        rawTxt9 = await txt9.jsonValue();
        srcTxt9 = await href9.jsonValue();
        const [c9] = await page.$x('//*[@id="container"]/li[9]/div/div[2]/a');
        colour9 = await c9.getProperty('textContent');
        rawColour9 = await colour9.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt9});


    try {
      const [p10] = await page.$x('//*[@id="container"]/article[10]/div/h1/a');
      txt10 = await p10.getProperty('textContent');
      href10 = await p10.getProperty('href');
      rawTxt10 = await txt10.jsonValue();
      srcTxt10 = await href10.jsonValue();
      const [c10] = await page.$x('//*[@id="container"]/article[10]/div/p/a');
      colour10 = await c10.getProperty('textContent');
      rawColour10 = await colour10.jsonValue();
      } catch {
        try {
        const [p10] = await page.$x('//*[@id="container"]/li[10]/div/div[1]/a')
        txt10 = await p10.getProperty('textContent');
        href10 = await p10.getProperty('href');
        rawTxt10 = await txt10.jsonValue();
        srcTxt10 = await href10.jsonValue();
        const [c10] = await page.$x('//*[@id="container"]/li[10]/div/div[2]/a');
        colour10 = await c10.getProperty('textContent');
        rawColour10 = await colour10.jsonValue();
        } catch {
          functionToHandleError()
        }
      }


    //console.log({rawTxt10});


    try {
      const [p11] = await page.$x('//*[@id="container"]/article[11]/div/h1/a');
      txt11 = await p11.getProperty('textContent');
      href11 = await p11.getProperty('href');
      rawTxt11 = await txt11.jsonValue();
      srcTxt11 = await href11.jsonValue();
      const [c11] = await page.$x('//*[@id="container"]/article[11]/div/p/a');
      colour11 = await c11.getProperty('textContent');
      rawColour11 = await colour11.jsonValue();
      } catch {
        try {
        const [p11] = await page.$x('//*[@id="container"]/li[11]/div/div[1]/a')
        txt11 = await p11.getProperty('textContent');
        href11 = await p11.getProperty('href');
        rawTxt11 = await txt11.jsonValue();
        srcTxt11 = await href11.jsonValue();
        const [c11] = await page.$x('//*[@id="container"]/li[11]/div/div[2]/a');
        colour11 = await c11.getProperty('textContent');
        rawColour11 = await colour11.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt11});


    try {
      const [p12] = await page.$x('//*[@id="container"]/article[12]/div/h1/a');
      txt12 = await p12.getProperty('textContent');
      href12 = await p12.getProperty('href');
      rawTxt12 = await txt12.jsonValue();
      srcTxt12 = await href12.jsonValue();
      const [c12] = await page.$x('//*[@id="container"]/article[12]/div/p/a');
      colour12 = await c12.getProperty('textContent');
      rawColour12 = await colour12.jsonValue();
      } catch {
        try {
        const [p12] = await page.$x('//*[@id="container"]/li[12]/div/div[1]/a')
        txt12 = await p12.getProperty('textContent');
        href12 = await p12.getProperty('href');
        rawTxt12 = await txt12.jsonValue();
        srcTxt12 = await href12.jsonValue();
        const [c12] = await page.$x('//*[@id="container"]/li[12]/div/div[2]/a');
        colour12 = await c12.getProperty('textContent');
        rawColour12 = await colour12.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt12});


    try {
      const [p13] = await page.$x('//*[@id="container"]/article[13]/div/h1/a');
      txt13 = await p13.getProperty('textContent');
      href13 = await p13.getProperty('href');
      rawTxt13 = await txt13.jsonValue();
      srcTxt13 = await href13.jsonValue();
      const [c13] = await page.$x('//*[@id="container"]/article[13]/div/p/a');
      colour13 = await c13.getProperty('textContent');
      rawColour13 = await colour13.jsonValue();
      } catch {
        try {
        const [p13] = await page.$x('//*[@id="container"]/li[13]/div/div[1]/a')
        txt13 = await p13.getProperty('textContent');
        href13 = await p13.getProperty('href');
        rawTxt13 = await txt13.jsonValue();
        srcTxt13 = await href13.jsonValue();
        const [c13] = await page.$x('//*[@id="container"]/li[13]/div/div[2]/a');
        colour13 = await c13.getProperty('textContent');
        rawColour13 = await colour13.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt13});


    try {
      const [p14] = await page.$x('//*[@id="container"]/article[14]/div/h1/a');
      txt14 = await p14.getProperty('textContent');
      href14 = await p14.getProperty('href');
      rawTxt14 = await txt14.jsonValue();
      srcTxt14 = await href14.jsonValue();
      const [c14] = await page.$x('//*[@id="container"]/article[14]/div/p/a');
      colour14 = await c14.getProperty('textContent');
      rawColour14 = await colour14.jsonValue();
      } catch {
        try {
        const [p14] = await page.$x('//*[@id="container"]/li[14]/div/div[1]/a')
        txt14 = await p14.getProperty('textContent');
        href14 = await p14.getProperty('href');
        rawTxt14 = await txt14.jsonValue();
        srcTxt14 = await href14.jsonValue();
        const [c14] = await page.$x('//*[@id="container"]/li[14]/div/div[2]/a');
        colour14 = await c14.getProperty('textContent');
        rawColour14 = await colour14.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt14});


    try {
      const [p15] = await page.$x('//*[@id="container"]/article[15]/div/h1/a');
      txt15 = await p15.getProperty('textContent');
      href15 = await p15.getProperty('href');
      rawTxt15 = await txt15.jsonValue();
      srcTxt15 = await href15.jsonValue();
      const [c15] = await page.$x('//*[@id="container"]/article[15]/div/p/a');
      colour15 = await c15.getProperty('textContent');
      rawColour15 = await colour15.jsonValue();
      } catch {
        try {
        const [p15] = await page.$x('//*[@id="container"]/li[15]/div/div[1]/a')
        txt15 = await p15.getProperty('textContent');
        href15 = await p15.getProperty('href');
        rawTxt15 = await txt15.jsonValue();
        srcTxt15 = await href15.jsonValue();
        const [c15] = await page.$x('//*[@id="container"]/li[15]/div/div[2]/a');
        colour15 = await c15.getProperty('textContent');
        rawColour15 = await colour15.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt15});


    try {
      const [p16] = await page.$x('//*[@id="container"]/article[16]/div/h1/a');
      txt16 = await p16.getProperty('textContent');
      href16 = await p16.getProperty('href');
      rawTxt16 = await txt16.jsonValue();
      srcTxt16 = await href16.jsonValue();
      const [c16] = await page.$x('//*[@id="container"]/article[16]/div/p/a');
      colour16 = await c16.getProperty('textContent');
      rawColour16 = await colour16.jsonValue();
      } catch {
        try {
        const [p16] = await page.$x('//*[@id="container"]/li[16]/div/div[1]/a')
        txt16 = await p16.getProperty('textContent');
        href16 = await p16.getProperty('href');
        rawTxt16 = await txt16.jsonValue();
        srcTxt16 = await href16.jsonValue();
        const [c16] = await page.$x('//*[@id="container"]/li[16]/div/div[2]/a');
        colour16 = await c16.getProperty('textContent');
        rawColour16 = await colour16.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt16});


    try {
      const [p17] = await page.$x('//*[@id="container"]/article[17]/div/h1/a');
      txt17 = await p17.getProperty('textContent');////*[@id="container"]/article[3]/div/p/a
      href17 = await p17.getProperty('href');
      rawTxt17 = await txt17.jsonValue();
      srcTxt17 = await href17.jsonValue();
      const [c17] = await page.$x('//*[@id="container"]/article[17]/div/p/a');
      colour17 = await c17.getProperty('textContent');
      rawColour17 = await colour17.jsonValue();
      } catch {
        try {
        const [p17] = await page.$x('//*[@id="container"]/li[17]/div/div[1]/a')
        txt17 = await p17.getProperty('textContent');////*[@id="container"]/article[3]/div/p/a
        href17 = await p17.getProperty('href');
        rawTxt17 = await txt17.jsonValue();
        srcTxt17 = await href17.jsonValue();
        const [c17] = await page.$x('//*[@id="container"]/li[17]/div/div[2]/a');
        colour17 = await c17.getProperty('textContent');
        rawColour17 = await colour17.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt17, srcTxt17});


    try {
      const [p18] = await page.$x('//*[@id="container"]/article[18]/div/h1/a');
      txt18 = await p18.getProperty('textContent');
      href18 = await p18.getProperty('href');
      rawTxt18 = await txt18.jsonValue();
      srcTxt18 = await href18.jsonValue();
      const [c18] = await page.$x('//*[@id="container"]/article[18]/div/p/a');
      colour18 = await c18.getProperty('textContent');
      rawColour18 = await colour18.jsonValue();
      } catch {
        try{
        const [p18] = await page.$x('//*[@id="container"]/li[18]/div/div[1]/a')
        txt18 = await p18.getProperty('textContent');
        href18 = await p18.getProperty('href');
        rawTxt18 = await txt18.jsonValue();
        srcTxt18 = await href18.jsonValue();
        const [c18] = await page.$x('//*[@id="container"]/li[18]/div/div[2]/a');
        colour18 = await c18.getProperty('textContent');
        rawColour18 = await colour18.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt18});


    try {
      const [p19] = await page.$x('//*[@id="container"]/article[19]/div/h1/a');
      txt19 = await p19.getProperty('textContent');
      href19 = await p19.getProperty('href');
      rawTxt19 = await txt19.jsonValue();
      srcTxt19 = await href19.jsonValue();
      const [c19] = await page.$x('//*[@id="container"]/article[19]/div/p/a');
      colour19 = await c19.getProperty('textContent');
      rawColour19 = await colour19.jsonValue();
      } catch {
        try {
        const [p19] = await page.$x('//*[@id="container"]/li[19]/div/div[1]/a')
        txt19 = await p19.getProperty('textContent');
        href19 = await p19.getProperty('href');
        rawTxt19 = await txt19.jsonValue();
        srcTxt19 = await href19.jsonValue();
        const [c19] = await page.$x('//*[@id="container"]/li[19]/div/div[2]/a');
        colour19 = await c19.getProperty('textContent');
        rawColour19 = await colour19.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt19});


    try {
      const [p20] = await page.$x('//*[@id="container"]/article[20]/div/h1/a');
      txt20 = await p20.getProperty('textContent');
      href20 = await p20.getProperty('href');
      rawTxt20 = await txt20.jsonValue();
      srcTxt20 = await href20.jsonValue();
      const [c20] = await page.$x('//*[@id="container"]/article[20]/div/p/a');
      colour20 = await c20.getProperty('textContent');
      rawColour20 = await colour20.jsonValue();
      } catch {
        try {
        const [p20] = await page.$x('//*[@id="container"]/li[20]/div/div[1]/a')
        txt20 = await p20.getProperty('textContent');
        href20 = await p20.getProperty('href');
        rawTxt20 = await txt20.jsonValue();
        srcTxt20 = await href20.jsonValue();
        const [c20] = await page.$x('//*[@id="container"]/li[20]/div/div[2]/a');
        colour20 = await c20.getProperty('textContent');
        rawColour20 = await colour20.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt20});


    try {
      const [p21] = await page.$x('//*[@id="container"]/article[21]/div/h1/a');
      txt21 = await p21.getProperty('textContent');
      href21 = await p21.getProperty('href');
      rawTxt21 = await txt21.jsonValue();
      srcTxt21 = await href21.jsonValue();
      const [c21] = await page.$x('//*[@id="container"]/article[21]/div/p/a');
      colour21 = await c21.getProperty('textContent');
      rawColour21 = await colour21.jsonValue();
      } catch {
        try {
        const [p21] = await page.$x('//*[@id="container"]/li[21]/div/div[1]/a')
        txt21 = await p21.getProperty('textContent');
        href21 = await p21.getProperty('href');
        rawTxt21 = await txt21.jsonValue();
        srcTxt21 = await href21.jsonValue();
        const [c21] = await page.$x('//*[@id="container"]/li[21]/div/div[2]/a');
        colour21 = await c21.getProperty('textContent');
        rawColour21 = await colour21.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt21});


    try {
      const [p22] = await page.$x('//*[@id="container"]/article[22]/div/h1/a');
      txt22 = await p22.getProperty('textContent');
      href22 = await p22.getProperty('href');
      rawTxt22 = await txt22.jsonValue();
      srcTxt22 = await href22.jsonValue();
      const [c22] = await page.$x('//*[@id="container"]/article[22]/div/p/a');
      colour22 = await c22.getProperty('textContent');
      rawColour22 = await colour22.jsonValue();
      } catch {
        try {
        const [p22] = await page.$x('//*[@id="container"]/li[22]/div/div[1]/a')
        txt22 = await p22.getProperty('textContent');
        href22 = await p22.getProperty('href');
        rawTxt22 = await txt22.jsonValue();
        srcTxt22 = await href22.jsonValue();
        const [c22] = await page.$x('//*[@id="container"]/li[22]/div/div[2]/a');
        colour22 = await c22.getProperty('textContent');
        rawColour22 = await colour22.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt22});

    try {
      const [p23] = await page.$x('//*[@id="container"]/article[23]/div/h1/a');
      txt23 = await p23.getProperty('textContent');
      href23 = await p23.getProperty('href');
      rawTxt23 = await txt23.jsonValue();
      srcTxt23 = await href23.jsonValue();
      const [c23] = await page.$x('//*[@id="container"]/article[23]/div/p/a');
      colour23 = await c23.getProperty('textContent');
      rawColour23 = await colour23.jsonValue();
      } catch {
        try {
        const [p23] = await page.$x('//*[@id="container"]/li[23]/div/div[1]/a')
        txt23 = await p23.getProperty('textContent');
        href23 = await p23.getProperty('href');
        rawTxt23 = await txt23.jsonValue();
        srcTxt23 = await href23.jsonValue();
        const [c23] = await page.$x('//*[@id="container"]/li[23]/div/div[2]/a');
        colour23 = await c23.getProperty('textContent');
        rawColour23 = await colour23.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt23});


    try {
      const [p24] = await page.$x('//*[@id="container"]/article[24]/div/h1/a');
      txt24 = await p24.getProperty('textContent');
      href24 = await p24.getProperty('href');
      rawTxt24 = await txt24.jsonValue();
      srcTxt24 = await href24.jsonValue();
      const [c24] = await page.$x('//*[@id="container"]/article[24]/div/p/a');
      colour24 = await c24.getProperty('textContent');
      rawColour24 = await colour24.jsonValue();
      } catch {
        try {
        const [p24] = await page.$x('//*[@id="container"]/li[24]/div/div[1]/a')
        txt24 = await p24.getProperty('textContent');
        href24 = await p24.getProperty('href');
        rawTxt24 = await txt24.jsonValue();
        srcTxt24 = await href24.jsonValue();
        const [c24] = await page.$x('//*[@id="container"]/li[24]/div/div[2]/a');
        colour24 = await c24.getProperty('textContent');
        rawColour24 = await colour24.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt24});


    try {
      const [p25] = await page.$x('//*[@id="container"]/article[25]/div/h1/a');
      txt25 = await p25.getProperty('textContent');
      href25 = await p25.getProperty('href');
      rawTxt25 = await txt25.jsonValue();
      srcTxt25 = await href25.jsonValue();
      const [c25] = await page.$x('//*[@id="container"]/article[25]/div/p/a');
      colour25 = await c25.getProperty('textContent');
      rawColour25 = await colour25.jsonValue();
      } catch {
        try {
        const [p25] = await page.$x('//*[@id="container"]/li[25]/div/div[1]/a')
        txt25 = await p25.getProperty('textContent');
        href25 = await p25.getProperty('href');
        rawTxt25 = await txt25.jsonValue();
        srcTxt25 = await href25.jsonValue();
        const [c25] = await page.$x('//*[@id="container"]/li[25]/div/div[2]/a');
        colour25 = await c25.getProperty('textContent');
        rawColour25 = await colour25.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt25});


    try {
      const [p26] = await page.$x('//*[@id="container"]/article[26]/div/h1/a');
      txt26 = await p26.getProperty('textContent');
      href26 = await p26.getProperty('href');
      rawTxt26 = await txt26.jsonValue();
      srcTxt26 = await href26.jsonValue();
      const [c26] = await page.$x('//*[@id="container"]/article[26]/div/p/a');
      colour26 = await c26.getProperty('textContent');
      rawColour26 = await colour26.jsonValue();
      } catch {
        try {
        const [p26] = await page.$x('//*[@id="container"]/li[26]/div/div[1]/a')
        txt26 = await p26.getProperty('textContent');
        href26 = await p26.getProperty('href');
        rawTxt26 = await txt26.jsonValue();
        srcTxt26 = await href26.jsonValue();
        const [c26] = await page.$x('//*[@id="container"]/li[26]/div/div[2]/a');
        colour26 = await c26.getProperty('textContent');
        rawColour26 = await colour26.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt26});
  

    try {
      const [p27] = await page.$x('//*[@id="container"]/article[27]/div/h1/a');
      txt27 = await p27.getProperty('textContent');
      href27 = await p27.getProperty('href');
      rawTxt27 = await txt27.jsonValue();
      srcTxt27 = await href27.jsonValue();
      const [c27] = await page.$x('//*[@id="container"]/article[27]/div/p/a');
      colour27 = await c27.getProperty('textContent');
      rawColour27 = await colour27.jsonValue();
      } catch {
        try {
        const [p27] = await page.$x('//*[@id="container"]/li[26]/div/div[1]/a')
        txt27 = await p27.getProperty('textContent');
        href27 = await p27.getProperty('href');
        rawTxt27 = await txt27.jsonValue();
        srcTxt27 = await href27.jsonValue();
        const [c27] = await page.$x('//*[@id="container"]/li[26]/div/div[2]/a');
        colour27 = await c27.getProperty('textContent');
        rawColour27 = await colour27.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

  
    //console.log({rawTxt27});


    try {
      const [p28] = await page.$x('//*[@id="container"]/article[28]/div/h1/a');
      txt28 = await p28.getProperty('textContent');
      href28 = await p28.getProperty('href');
      rawTxt28 = await txt28.jsonValue();
      srcTxt28 = await href28.jsonValue();
      const [c28] = await page.$x('//*[@id="container"]/article[28]/div/p/a');
      colour28 = await c28.getProperty('textContent');
      rawColour28 = await colour28.jsonValue();
      } catch {
        try {
        const [p28] = await page.$x('//*[@id="container"]/li[28]/div/div[1]/a')
        txt28 = await p28.getProperty('textContent');
        href28 = await p28.getProperty('href');
        rawTxt28 = await txt28.jsonValue();
        srcTxt28 = await href28.jsonValue();
        const [c28] = await page.$x('//*[@id="container"]/li[28]/div/div[2]/a');
        colour28 = await c28.getProperty('textContent');
        rawColour28 = await colour28.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt28});


    try {
      const [p29] = await page.$x('//*[@id="container"]/article[29]/div/h1/a');
      txt29 = await p29.getProperty('textContent');
      href29 = await p29.getProperty('href');
      rawTxt29 = await txt29.jsonValue();
      srcTxt29 = await href29.jsonValue();
      const [c29] = await page.$x('//*[@id="container"]/article[29]/div/p/a');
      colour29 = await c29.getProperty('textContent');
      rawColour29 = await colour29.jsonValue();
      } catch {
        try {
        const [p29] = await page.$x('//*[@id="container"]/li[29]/div/div[1]/a')
        txt29 = await p29.getProperty('textContent');
        href29 = await p29.getProperty('href');
        rawTxt29 = await txt29.jsonValue();
        srcTxt29 = await href29.jsonValue();
        const [c29] = await page.$x('//*[@id="container"]/li[29]/div/div[2]/a');
        colour29 = await c29.getProperty('textContent');
        rawColour29 = await colour29.jsonValue();
        } catch {
          functionToHandleError()
        }
      }

    //console.log({rawTxt29});


    try {
      const [p30] = await page.$x('//*[@id="container"]/article[30]/div/h1/a');
      txt30 = await p30.getProperty('textContent');
      href30 = await p30.getProperty('href');
      rawTxt30 = await txt30.jsonValue();
      srcTxt30 = await href30.jsonValue();
      const [c30] = await page.$x('//*[@id="container"]/article[30]/div/p/a');
      colour30 = await c30.getProperty('textContent');
      rawColour30 = await colour30.jsonValue();
      } catch {
        try {
        const [p30] = await page.$x('//*[@id="container"]/li[30]/div/div[1]/a')
        txt30 = await p30.getProperty('textContent');
        href30 = await p30.getProperty('href');
        rawTxt30 = await txt30.jsonValue();
        srcTxt30 = await href30.jsonValue();
        const [c30] = await page.$x('//*[@id="container"]/li[30]/div/div[2]/a');
        colour30 = await c30.getProperty('textContent');
        rawColour30 = await colour30.jsonValue();
        } catch {
          functionToHandleError()
        }
      }
  } catch(e) {
    console.log(e)
    functionToHandleError()
  }
  try {

    if(rawTxt1.includes(kw) && rawColour1.includes(ITEM_COLOUR)){
      await selectItem(rawTxt1, srcTxt1, rawColour1)
    } else if(rawTxt2.includes(kw) && rawColour2.includes(ITEM_COLOUR)) {
        await selectItem(rawTxt2, srcTxt2, rawColour2)
    } else if(rawTxt3.includes(kw) && rawColour3.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt3, srcTxt3, rawColour3)
    } else if(rawTxt4.includes(kw) && rawColour4.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt4, srcTxt4, rawColour4)
    } else if(rawTxt5.includes(kw) && rawColour5.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt5, srcTxt5, rawColour5)
    } else if(rawTxt6.includes(kw) && rawColour6.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt6, srcTxt6, rawColour6)
    } else if(rawTxt7.includes(kw) && rawColour7.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt7, srcTxt7, rawColour7)
    } else if(rawTxt8.includes(kw) && rawColour8.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt8, srcTxt8, rawColour8)
    } else if(rawTxt9.includes(kw) && rawColour9.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt9, srcTxt9, rawColour9)
    } else if(rawTxt10.includes(kw) && rawColour10.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt10, srcTxt10, rawColour10)
    } else if(rawTxt11.includes(kw) && rawColour11.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt11, srcTxt11, rawColour11)
    } else if(rawTxt12.includes(kw) && rawColour12.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt12, srcTxt12, rawColour12)
    } else if(rawTxt13.includes(kw) && rawColour13.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt2, srcTxt2, rawColour2)
    } else if(rawTxt13.includes(kw) && rawColour13.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt13, srcTxt13, rawColour13)
    } else if(rawTxt14.includes(kw) && rawColour14.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt14, srcTxt14, rawColour14)
    } else if(rawTxt16.includes(kw) && rawColour16.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt16, srcTxt16, rawColour16)
    } else if(rawTxt17.includes(kw) && rawColour17.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt17, srcTxt17, rawColour17)
    } else if(rawTxt18.includes(kw) && rawColour18.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt18, srcTxt18, rawColour18)
    } else if(rawTxt19.includes(kw) && rawColour19.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt19, srcTxt19, rawColour19)
    } else if(rawTxt20.includes(kw) && rawColour20.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt20, srcTxt20, rawColour20)
    } else if(rawTxt21.includes(kw) && rawColour21.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt21, srcTxt21, rawColour21)
    } else if(rawTxt22.includes(kw) && rawColour22.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt22, srcTxt22, rawColour22)
    } else if(rawTxt23.includes(kw) && rawColour23.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt23, srcTxt23, rawColour23)
    } else if(rawTxt24.includes(kw) && rawColour24.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt24, srcTxt24, rawColour24)
    } else if(rawTxt24.includes(kw) && rawColour24.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt25, srcTxt25, rawColour25)
    } else if(rawTxt26.includes(kw) && rawColour26.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt26, srcTxt26, rawColour26)
    } else if(rawTxt27.includes(kw) && rawColour27.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt27, srcTxt27, rawColour27)
    } else if(rawTxt28.includes(kw) && rawColour28.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt28, srcTxt28, rawColour28)
    } else if(rawTxt29.indexOf(kw) && rawColour29.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt29, srcTxt29, rawColour29)
    } else if(rawTxt30.includes(kw) && rawColour30.includes(ITEM_COLOUR)) {
      await selectItem(rawTxt30, srcTxt30, rawColour30)
    } else {
      //console.log('yes')
      var today = new Date();
      console.log(
        chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Waiting for drop')
      )
      waitForDrop()
    }
    } catch(e) {
      //console.log('no')
      //console.log(e)
      var today = new Date();
      console.log(
        chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Waiting for drop')
      )
      waitForDrop()
    }





function stoperror() {
  return true;
}

}

async function waitForDrop() {
  await page.reload({ waitUntil: ["domcontentloaded"] });




  try{
    // console.log('hello initial')
 
       //Get product names
       try {
        const [p1] = await page.$x('//*[@id="container"]/article[1]/div/h1/a');
        txt1 = await p1.getProperty('textContent');
        href1 = await p1.getProperty('href');
        rawTxt1 = await txt1.jsonValue();
        srcTxt1 = await href1.jsonValue();
        const [c1] = await page.$x('//*[@id="container"]/article[1]/div/p/a');
        colour1 = await c1.getProperty('textContent');
        rawColour1 = await colour1.jsonValue();
        } catch {
          try{
          const [p1] = await page.$x('//*[@id="container"]/li[1]/div/div[1]/a')
          txt1 = await p1.getProperty('textContent');
          href1 = await p1.getProperty('href');
          rawTxt1 = await txt1.jsonValue();
          srcTxt1 = await href1.jsonValue();
          const [c1] = await page.$x('//*[@id="container"]/li[1]/div/div[2]/a');
          colour1 = await c1.getProperty('textContent');
          rawColour1 = await colour1.jsonValue();
          } catch {
            functionToHandleError()
          }
        }
    
        //console.log({rawTxt1, srcTxt1, rawColour1});
    
        try {
          const [p2] = await page.$x('//*[@id="container"]/article[2]/div/h1/a');
          txt2 = await p2.getProperty('textContent');
          href2 = await p2.getProperty('href');
          rawTxt2 = await txt2.jsonValue();
          srcTxt2 = await href2.jsonValue();
          const [c2] = await page.$x('//*[@id="container"]/article[2]/div/p/a');
          colour2 = await c2.getProperty('textContent');
          rawColour2 = await colour1.jsonValue();
          } catch {
            try{
            const [p2] = await page.$x('//*[@id="container"]/li[2]/div/div[1]/a')
            txt2 = await p2.getProperty('textContent');
            href2 = await p2.getProperty('href');
            rawTxt2 = await txt2.jsonValue();
            srcTxt2 = await href2.jsonValue();
            const [c2] = await page.$x('//*[@id="container"]/li[2]/div/div[2]/a');
            colour2 = await c2.getProperty('textContent');
            rawColour2 = await colour2.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt2, srcTxt2});
    
        try {
          const [p3] = await page.$x('//*[@id="container"]/article[3]/div/h1/a');
          txt3 = await p3.getProperty('textContent');
          href3 = await p3.getProperty('href');
          rawTxt3 = await txt3.jsonValue();
          srcTxt3 = await href3.jsonValue();
          const [c3] = await page.$x('//*[@id="container"]/article[3]/div/p/a');
          colour3 = await c3.getProperty('textContent');
          rawColour3 = await colour3.jsonValue();
          } catch {
            try {
            const [p3] = await page.$x('//*[@id="container"]/li[3]/div/div[1]/a')
            txt3 = await p3.getProperty('textContent');
            href3 = await p3.getProperty('href');
            rawTxt3 = await txt3.jsonValue();
            srcTxt3 = await href3.jsonValue();
            const [c3] = await page.$x('//*[@id="container"]/li[3]/div/div[2]/a');
            colour3 = await c3.getProperty('textContent');
            rawColour3 = await colour3.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
        //console.log({rawTxt3});
    
        try {
          const [p4] = await page.$x('//*[@id="container"]/article[4]/div/h1/a');
          txt4 = await p4.getProperty('textContent');
          href4 = await p4.getProperty('href');
          rawTxt4 = await txt4.jsonValue();
          srcTxt4 = await href4.jsonValue();
          const [c4] = await page.$x('//*[@id="container"]/article[4]/div/p/a');
          colour4 = await c4.getProperty('textContent');
          rawColour4 = await colour4.jsonValue();
          } catch {
            try {
            const [p4] = await page.$x('//*[@id="container"]/li[4]/div/div[1]/a')
            txt4 = await p4.getProperty('textContent');
            href4 = await p4.getProperty('href');
            rawTxt4 = await txt4.jsonValue();
            srcTxt4 = await href4.jsonValue();
            const [c4] = await page.$x('//*[@id="container"]/li[4]/div/div[2]/a');
            colour4 = await c4.getProperty('textContent');
            rawColour4 = await colour4.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
        //console.log({rawTxt4});
    
        try {
          const [p5] = await page.$x('//*[@id="container"]/article[5]/div/h1/a');
          txt5 = await p5.getProperty('textContent');
          href5 = await p5.getProperty('href');
          rawTxt5 = await txt5.jsonValue();
          srcTxt5 = await href5.jsonValue();
          const [c5] = await page.$x('//*[@id="container"]/article[5]/div/p/a');
          colour5 = await c5.getProperty('textContent');
          rawColour5 = await colour5.jsonValue();
          } catch {
            try {
            const [p5] = await page.$x('//*[@id="container"]/li[5]/div/div[1]/a')
            txt5 = await p5.getProperty('textContent');
            href5 = await p5.getProperty('href');
            rawTxt5 = await txt5.jsonValue();
            srcTxt5 = await href5.jsonValue();
            const [c5] = await page.$x('//*[@id="container"]/li[5]/div/div[2]/a');
            colour5 = await c5.getProperty('textContent');
            rawColour5 = await colour5.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt5});
    
    
        try {
          const [p6] = await page.$x('//*[@id="container"]/article[6]/div/h1/a');
          txt6 = await p6.getProperty('textContent');
          href6 = await p6.getProperty('href');
          rawTxt6 = await txt6.jsonValue();
          srcTxt6 = await href6.jsonValue();
          const [c6] = await page.$x('//*[@id="container"]/article[6]/div/p/a');
          colour6 = await c6.getProperty('textContent');
          rawColour6 = await colour6.jsonValue();
          } catch {
            try {
            const [p6] = await page.$x('//*[@id="container"]/li[6]/div/div[1]/a')
            txt6 = await p6.getProperty('textContent');
            href6 = await p6.getProperty('href');
            rawTxt6 = await txt6.jsonValue();
            srcTxt6 = await href6.jsonValue();
            const [c6] = await page.$x('//*[@id="container"]/li[6]/div/div[2]/a');
            colour6 = await c6.getProperty('textContent');
            rawColour6 = await colour6.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt6});
    
        try {
          const [p7] = await page.$x('//*[@id="container"]/article[7]/div/h1/a');
          txt7 = await p7.getProperty('textContent');
          href7 = await p7.getProperty('href');
          rawTxt7 = await txt7.jsonValue();
          srcTxt7 = await href7.jsonValue();
          const [c7] = await page.$x('//*[@id="container"]/article[7]/div/p/a');
          colour7 = await c7.getProperty('textContent');
          rawColour7 = await colour7.jsonValue();
          } catch {
            try {
            const [p7] = await page.$x('//*[@id="container"]/li[7]/div/div[1]/a')
            txt7 = await p7.getProperty('textContent');
            href7 = await p7.getProperty('href');
            rawTxt7 = await txt7.jsonValue();
            srcTxt7 = await href7.jsonValue();
            const [c7] = await page.$x('//*[@id="container"]/li[7]/div/div[2]/a');
            colour7 = await c7.getProperty('textContent');
            rawColour7 = await colour7.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
        
    
        //console.log({rawTxt7});
    
    
        try {
          const [p8] = await page.$x('//*[@id="container"]/article[8]/div/h1/a');
          txt8 = await p8.getProperty('textContent');
          href8 = await p8.getProperty('href');
          rawTxt8 = await txt8.jsonValue();
          srcTxt8 = await href8.jsonValue();
          const [c8] = await page.$x('//*[@id="container"]/article[8]/div/p/a');
          colour8 = await c8.getProperty('textContent');
          rawColour8 = await colour8.jsonValue();
          } catch {
            try {
            const [p8] = await page.$x('//*[@id="container"]/li[8]/div/div[1]/a')
            txt8 = await p8.getProperty('textContent');
            href8 = await p8.getProperty('href');
            rawTxt8 = await txt8.jsonValue();
            srcTxt8 = await href8.jsonValue();
            const [c8] = await page.$x('//*[@id="container"]/li[8]/div/div[2]/a');
            colour8 = await c8.getProperty('textContent');
            rawColour8 = await colour8.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt8});
    
        try {
          const [p9] = await page.$x('//*[@id="container"]/article[9]/div/h1/a');
          txt9 = await p9.getProperty('textContent');
          href9 = await p9.getProperty('href');
          rawTxt9 = await txt9.jsonValue();
          srcTxt9 = await href9.jsonValue();
          const [c9] = await page.$x('//*[@id="container"]/article[9]/div/p/a');
          colour9 = await c9.getProperty('textContent');
          rawColour9 = await colour9.jsonValue();
          } catch {
            try {
            const [p9] = await page.$x('//*[@id="container"]/li[9]/div/div[1]/a')
            txt9 = await p9.getProperty('textContent');
            href9 = await p9.getProperty('href');
            rawTxt9 = await txt9.jsonValue();
            srcTxt9 = await href9.jsonValue();
            const [c9] = await page.$x('//*[@id="container"]/li[9]/div/div[2]/a');
            colour9 = await c9.getProperty('textContent');
            rawColour9 = await colour9.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt9});
    
    
        try {
          const [p10] = await page.$x('//*[@id="container"]/article[10]/div/h1/a');
          txt10 = await p10.getProperty('textContent');
          href10 = await p10.getProperty('href');
          rawTxt10 = await txt10.jsonValue();
          srcTxt10 = await href10.jsonValue();
          const [c10] = await page.$x('//*[@id="container"]/article[10]/div/p/a');
          colour10 = await c10.getProperty('textContent');
          rawColour10 = await colour10.jsonValue();
          } catch {
            try {
            const [p10] = await page.$x('//*[@id="container"]/li[10]/div/div[1]/a')
            txt10 = await p10.getProperty('textContent');
            href10 = await p10.getProperty('href');
            rawTxt10 = await txt10.jsonValue();
            srcTxt10 = await href10.jsonValue();
            const [c10] = await page.$x('//*[@id="container"]/li[10]/div/div[2]/a');
            colour10 = await c10.getProperty('textContent');
            rawColour10 = await colour10.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
    
        //console.log({rawTxt10});
    
    
        try {
          const [p11] = await page.$x('//*[@id="container"]/article[11]/div/h1/a');
          txt11 = await p11.getProperty('textContent');
          href11 = await p11.getProperty('href');
          rawTxt11 = await txt11.jsonValue();
          srcTxt11 = await href11.jsonValue();
          const [c11] = await page.$x('//*[@id="container"]/article[11]/div/p/a');
          colour11 = await c11.getProperty('textContent');
          rawColour11 = await colour11.jsonValue();
          } catch {
            try {
            const [p11] = await page.$x('//*[@id="container"]/li[11]/div/div[1]/a')
            txt11 = await p11.getProperty('textContent');
            href11 = await p11.getProperty('href');
            rawTxt11 = await txt11.jsonValue();
            srcTxt11 = await href11.jsonValue();
            const [c11] = await page.$x('//*[@id="container"]/li[11]/div/div[2]/a');
            colour11 = await c11.getProperty('textContent');
            rawColour11 = await colour11.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt11});
    
    
        try {
          const [p12] = await page.$x('//*[@id="container"]/article[12]/div/h1/a');
          txt12 = await p12.getProperty('textContent');
          href12 = await p12.getProperty('href');
          rawTxt12 = await txt12.jsonValue();
          srcTxt12 = await href12.jsonValue();
          const [c12] = await page.$x('//*[@id="container"]/article[12]/div/p/a');
          colour12 = await c12.getProperty('textContent');
          rawColour12 = await colour12.jsonValue();
          } catch {
            try {
            const [p12] = await page.$x('//*[@id="container"]/li[12]/div/div[1]/a')
            txt12 = await p12.getProperty('textContent');
            href12 = await p12.getProperty('href');
            rawTxt12 = await txt12.jsonValue();
            srcTxt12 = await href12.jsonValue();
            const [c12] = await page.$x('//*[@id="container"]/li[12]/div/div[2]/a');
            colour12 = await c12.getProperty('textContent');
            rawColour12 = await colour12.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt12});
    
    
        try {
          const [p13] = await page.$x('//*[@id="container"]/article[13]/div/h1/a');
          txt13 = await p13.getProperty('textContent');
          href13 = await p13.getProperty('href');
          rawTxt13 = await txt13.jsonValue();
          srcTxt13 = await href13.jsonValue();
          const [c13] = await page.$x('//*[@id="container"]/article[13]/div/p/a');
          colour13 = await c13.getProperty('textContent');
          rawColour13 = await colour13.jsonValue();
          } catch {
            try {
            const [p13] = await page.$x('//*[@id="container"]/li[13]/div/div[1]/a')
            txt13 = await p13.getProperty('textContent');
            href13 = await p13.getProperty('href');
            rawTxt13 = await txt13.jsonValue();
            srcTxt13 = await href13.jsonValue();
            const [c13] = await page.$x('//*[@id="container"]/li[13]/div/div[2]/a');
            colour13 = await c13.getProperty('textContent');
            rawColour13 = await colour13.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt13});
    
    
        try {
          const [p14] = await page.$x('//*[@id="container"]/article[14]/div/h1/a');
          txt14 = await p14.getProperty('textContent');
          href14 = await p14.getProperty('href');
          rawTxt14 = await txt14.jsonValue();
          srcTxt14 = await href14.jsonValue();
          const [c14] = await page.$x('//*[@id="container"]/article[14]/div/p/a');
          colour14 = await c14.getProperty('textContent');
          rawColour14 = await colour14.jsonValue();
          } catch {
            try {
            const [p14] = await page.$x('//*[@id="container"]/li[14]/div/div[1]/a')
            txt14 = await p14.getProperty('textContent');
            href14 = await p14.getProperty('href');
            rawTxt14 = await txt14.jsonValue();
            srcTxt14 = await href14.jsonValue();
            const [c14] = await page.$x('//*[@id="container"]/li[14]/div/div[2]/a');
            colour14 = await c14.getProperty('textContent');
            rawColour14 = await colour14.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt14});
    
    
        try {
          const [p15] = await page.$x('//*[@id="container"]/article[15]/div/h1/a');
          txt15 = await p15.getProperty('textContent');
          href15 = await p15.getProperty('href');
          rawTxt15 = await txt15.jsonValue();
          srcTxt15 = await href15.jsonValue();
          const [c15] = await page.$x('//*[@id="container"]/article[15]/div/p/a');
          colour15 = await c15.getProperty('textContent');
          rawColour15 = await colour15.jsonValue();
          } catch {
            try {
            const [p15] = await page.$x('//*[@id="container"]/li[15]/div/div[1]/a')
            txt15 = await p15.getProperty('textContent');
            href15 = await p15.getProperty('href');
            rawTxt15 = await txt15.jsonValue();
            srcTxt15 = await href15.jsonValue();
            const [c15] = await page.$x('//*[@id="container"]/li[15]/div/div[2]/a');
            colour15 = await c15.getProperty('textContent');
            rawColour15 = await colour15.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt15});
    
    
        try {
          const [p16] = await page.$x('//*[@id="container"]/article[16]/div/h1/a');
          txt16 = await p16.getProperty('textContent');
          href16 = await p16.getProperty('href');
          rawTxt16 = await txt16.jsonValue();
          srcTxt16 = await href16.jsonValue();
          const [c16] = await page.$x('//*[@id="container"]/article[16]/div/p/a');
          colour16 = await c16.getProperty('textContent');
          rawColour16 = await colour16.jsonValue();
          } catch {
            try {
            const [p16] = await page.$x('//*[@id="container"]/li[16]/div/div[1]/a')
            txt16 = await p16.getProperty('textContent');
            href16 = await p16.getProperty('href');
            rawTxt16 = await txt16.jsonValue();
            srcTxt16 = await href16.jsonValue();
            const [c16] = await page.$x('//*[@id="container"]/li[16]/div/div[2]/a');
            colour16 = await c16.getProperty('textContent');
            rawColour16 = await colour16.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt16});
    
    
        try {
          const [p17] = await page.$x('//*[@id="container"]/article[17]/div/h1/a');
          txt17 = await p17.getProperty('textContent');////*[@id="container"]/article[3]/div/p/a
          href17 = await p17.getProperty('href');
          rawTxt17 = await txt17.jsonValue();
          srcTxt17 = await href17.jsonValue();
          const [c17] = await page.$x('//*[@id="container"]/article[17]/div/p/a');
          colour17 = await c17.getProperty('textContent');
          rawColour17 = await colour17.jsonValue();
          } catch {
            try {
            const [p17] = await page.$x('//*[@id="container"]/li[17]/div/div[1]/a')
            txt17 = await p17.getProperty('textContent');////*[@id="container"]/article[3]/div/p/a
            href17 = await p17.getProperty('href');
            rawTxt17 = await txt17.jsonValue();
            srcTxt17 = await href17.jsonValue();
            const [c17] = await page.$x('//*[@id="container"]/li[17]/div/div[2]/a');
            colour17 = await c17.getProperty('textContent');
            rawColour17 = await colour17.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt17, srcTxt17});
    
    
        try {
          const [p18] = await page.$x('//*[@id="container"]/article[18]/div/h1/a');
          txt18 = await p18.getProperty('textContent');
          href18 = await p18.getProperty('href');
          rawTxt18 = await txt18.jsonValue();
          srcTxt18 = await href18.jsonValue();
          const [c18] = await page.$x('//*[@id="container"]/article[18]/div/p/a');
          colour18 = await c18.getProperty('textContent');
          rawColour18 = await colour18.jsonValue();
          } catch {
            try{
            const [p18] = await page.$x('//*[@id="container"]/li[18]/div/div[1]/a')
            txt18 = await p18.getProperty('textContent');
            href18 = await p18.getProperty('href');
            rawTxt18 = await txt18.jsonValue();
            srcTxt18 = await href18.jsonValue();
            const [c18] = await page.$x('//*[@id="container"]/li[18]/div/div[2]/a');
            colour18 = await c18.getProperty('textContent');
            rawColour18 = await colour18.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt18});
    
    
        try {
          const [p19] = await page.$x('//*[@id="container"]/article[19]/div/h1/a');
          txt19 = await p19.getProperty('textContent');
          href19 = await p19.getProperty('href');
          rawTxt19 = await txt19.jsonValue();
          srcTxt19 = await href19.jsonValue();
          const [c19] = await page.$x('//*[@id="container"]/article[19]/div/p/a');
          colour19 = await c19.getProperty('textContent');
          rawColour19 = await colour19.jsonValue();
          } catch {
            try {
            const [p19] = await page.$x('//*[@id="container"]/li[19]/div/div[1]/a')
            txt19 = await p19.getProperty('textContent');
            href19 = await p19.getProperty('href');
            rawTxt19 = await txt19.jsonValue();
            srcTxt19 = await href19.jsonValue();
            const [c19] = await page.$x('//*[@id="container"]/li[19]/div/div[2]/a');
            colour19 = await c19.getProperty('textContent');
            rawColour19 = await colour19.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt19});
    
    
        try {
          const [p20] = await page.$x('//*[@id="container"]/article[20]/div/h1/a');
          txt20 = await p20.getProperty('textContent');
          href20 = await p20.getProperty('href');
          rawTxt20 = await txt20.jsonValue();
          srcTxt20 = await href20.jsonValue();
          const [c20] = await page.$x('//*[@id="container"]/article[20]/div/p/a');
          colour20 = await c20.getProperty('textContent');
          rawColour20 = await colour20.jsonValue();
          } catch {
            try {
            const [p20] = await page.$x('//*[@id="container"]/li[20]/div/div[1]/a')
            txt20 = await p20.getProperty('textContent');
            href20 = await p20.getProperty('href');
            rawTxt20 = await txt20.jsonValue();
            srcTxt20 = await href20.jsonValue();
            const [c20] = await page.$x('//*[@id="container"]/li[20]/div/div[2]/a');
            colour20 = await c20.getProperty('textContent');
            rawColour20 = await colour20.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt20});
    
    
        try {
          const [p21] = await page.$x('//*[@id="container"]/article[21]/div/h1/a');
          txt21 = await p21.getProperty('textContent');
          href21 = await p21.getProperty('href');
          rawTxt21 = await txt21.jsonValue();
          srcTxt21 = await href21.jsonValue();
          const [c21] = await page.$x('//*[@id="container"]/article[21]/div/p/a');
          colour21 = await c21.getProperty('textContent');
          rawColour21 = await colour21.jsonValue();
          } catch {
            try {
            const [p21] = await page.$x('//*[@id="container"]/li[21]/div/div[1]/a')
            txt21 = await p21.getProperty('textContent');
            href21 = await p21.getProperty('href');
            rawTxt21 = await txt21.jsonValue();
            srcTxt21 = await href21.jsonValue();
            const [c21] = await page.$x('//*[@id="container"]/li[21]/div/div[2]/a');
            colour21 = await c21.getProperty('textContent');
            rawColour21 = await colour21.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt21});
    
    
        try {
          const [p22] = await page.$x('//*[@id="container"]/article[22]/div/h1/a');
          txt22 = await p22.getProperty('textContent');
          href22 = await p22.getProperty('href');
          rawTxt22 = await txt22.jsonValue();
          srcTxt22 = await href22.jsonValue();
          const [c22] = await page.$x('//*[@id="container"]/article[22]/div/p/a');
          colour22 = await c22.getProperty('textContent');
          rawColour22 = await colour22.jsonValue();
          } catch {
            try {
            const [p22] = await page.$x('//*[@id="container"]/li[22]/div/div[1]/a')
            txt22 = await p22.getProperty('textContent');
            href22 = await p22.getProperty('href');
            rawTxt22 = await txt22.jsonValue();
            srcTxt22 = await href22.jsonValue();
            const [c22] = await page.$x('//*[@id="container"]/li[22]/div/div[2]/a');
            colour22 = await c22.getProperty('textContent');
            rawColour22 = await colour22.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt22});
    
        try {
          const [p23] = await page.$x('//*[@id="container"]/article[23]/div/h1/a');
          txt23 = await p23.getProperty('textContent');
          href23 = await p23.getProperty('href');
          rawTxt23 = await txt23.jsonValue();
          srcTxt23 = await href23.jsonValue();
          const [c23] = await page.$x('//*[@id="container"]/article[23]/div/p/a');
          colour23 = await c23.getProperty('textContent');
          rawColour23 = await colour23.jsonValue();
          } catch {
            try {
            const [p23] = await page.$x('//*[@id="container"]/li[23]/div/div[1]/a')
            txt23 = await p23.getProperty('textContent');
            href23 = await p23.getProperty('href');
            rawTxt23 = await txt23.jsonValue();
            srcTxt23 = await href23.jsonValue();
            const [c23] = await page.$x('//*[@id="container"]/li[23]/div/div[2]/a');
            colour23 = await c23.getProperty('textContent');
            rawColour23 = await colour23.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt23});
    
    
        try {
          const [p24] = await page.$x('//*[@id="container"]/article[24]/div/h1/a');
          txt24 = await p24.getProperty('textContent');
          href24 = await p24.getProperty('href');
          rawTxt24 = await txt24.jsonValue();
          srcTxt24 = await href24.jsonValue();
          const [c24] = await page.$x('//*[@id="container"]/article[24]/div/p/a');
          colour24 = await c24.getProperty('textContent');
          rawColour24 = await colour24.jsonValue();
          } catch {
            try {
            const [p24] = await page.$x('//*[@id="container"]/li[24]/div/div[1]/a')
            txt24 = await p24.getProperty('textContent');
            href24 = await p24.getProperty('href');
            rawTxt24 = await txt24.jsonValue();
            srcTxt24 = await href24.jsonValue();
            const [c24] = await page.$x('//*[@id="container"]/li[24]/div/div[2]/a');
            colour24 = await c24.getProperty('textContent');
            rawColour24 = await colour24.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt24});
    
    
        try {
          const [p25] = await page.$x('//*[@id="container"]/article[25]/div/h1/a');
          txt25 = await p25.getProperty('textContent');
          href25 = await p25.getProperty('href');
          rawTxt25 = await txt25.jsonValue();
          srcTxt25 = await href25.jsonValue();
          const [c25] = await page.$x('//*[@id="container"]/article[25]/div/p/a');
          colour25 = await c25.getProperty('textContent');
          rawColour25 = await colour25.jsonValue();
          } catch {
            try {
            const [p25] = await page.$x('//*[@id="container"]/li[25]/div/div[1]/a')
            txt25 = await p25.getProperty('textContent');
            href25 = await p25.getProperty('href');
            rawTxt25 = await txt25.jsonValue();
            srcTxt25 = await href25.jsonValue();
            const [c25] = await page.$x('//*[@id="container"]/li[25]/div/div[2]/a');
            colour25 = await c25.getProperty('textContent');
            rawColour25 = await colour25.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt25});
    
    
        try {
          const [p26] = await page.$x('//*[@id="container"]/article[26]/div/h1/a');
          txt26 = await p26.getProperty('textContent');
          href26 = await p26.getProperty('href');
          rawTxt26 = await txt26.jsonValue();
          srcTxt26 = await href26.jsonValue();
          const [c26] = await page.$x('//*[@id="container"]/article[26]/div/p/a');
          colour26 = await c26.getProperty('textContent');
          rawColour26 = await colour26.jsonValue();
          } catch {
            try {
            const [p26] = await page.$x('//*[@id="container"]/li[26]/div/div[1]/a')
            txt26 = await p26.getProperty('textContent');
            href26 = await p26.getProperty('href');
            rawTxt26 = await txt26.jsonValue();
            srcTxt26 = await href26.jsonValue();
            const [c26] = await page.$x('//*[@id="container"]/li[26]/div/div[2]/a');
            colour26 = await c26.getProperty('textContent');
            rawColour26 = await colour26.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt26});
      
    
        try {
          const [p27] = await page.$x('//*[@id="container"]/article[27]/div/h1/a');
          txt27 = await p27.getProperty('textContent');
          href27 = await p27.getProperty('href');
          rawTxt27 = await txt27.jsonValue();
          srcTxt27 = await href27.jsonValue();
          const [c27] = await page.$x('//*[@id="container"]/article[27]/div/p/a');
          colour27 = await c27.getProperty('textContent');
          rawColour27 = await colour27.jsonValue();
          } catch {
            try {
            const [p27] = await page.$x('//*[@id="container"]/li[26]/div/div[1]/a')
            txt27 = await p27.getProperty('textContent');
            href27 = await p27.getProperty('href');
            rawTxt27 = await txt27.jsonValue();
            srcTxt27 = await href27.jsonValue();
            const [c27] = await page.$x('//*[@id="container"]/li[26]/div/div[2]/a');
            colour27 = await c27.getProperty('textContent');
            rawColour27 = await colour27.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
      
        //console.log({rawTxt27});
    
    
        try {
          const [p28] = await page.$x('//*[@id="container"]/article[28]/div/h1/a');
          txt28 = await p28.getProperty('textContent');
          href28 = await p28.getProperty('href');
          rawTxt28 = await txt28.jsonValue();
          srcTxt28 = await href28.jsonValue();
          const [c28] = await page.$x('//*[@id="container"]/article[28]/div/p/a');
          colour28 = await c28.getProperty('textContent');
          rawColour28 = await colour28.jsonValue();
          } catch {
            try {
            const [p28] = await page.$x('//*[@id="container"]/li[28]/div/div[1]/a')
            txt28 = await p28.getProperty('textContent');
            href28 = await p28.getProperty('href');
            rawTxt28 = await txt28.jsonValue();
            srcTxt28 = await href28.jsonValue();
            const [c28] = await page.$x('//*[@id="container"]/li[28]/div/div[2]/a');
            colour28 = await c28.getProperty('textContent');
            rawColour28 = await colour28.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt28});
    
    
        try {
          const [p29] = await page.$x('//*[@id="container"]/article[29]/div/h1/a');
          txt29 = await p29.getProperty('textContent');
          href29 = await p29.getProperty('href');
          rawTxt29 = await txt29.jsonValue();
          srcTxt29 = await href29.jsonValue();
          const [c29] = await page.$x('//*[@id="container"]/article[29]/div/p/a');
          colour29 = await c29.getProperty('textContent');
          rawColour29 = await colour29.jsonValue();
          } catch {
            try {
            const [p29] = await page.$x('//*[@id="container"]/li[29]/div/div[1]/a')
            txt29 = await p29.getProperty('textContent');
            href29 = await p29.getProperty('href');
            rawTxt29 = await txt29.jsonValue();
            srcTxt29 = await href29.jsonValue();
            const [c29] = await page.$x('//*[@id="container"]/li[29]/div/div[2]/a');
            colour29 = await c29.getProperty('textContent');
            rawColour29 = await colour29.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
    
        //console.log({rawTxt29});
    
    
        try {
          const [p30] = await page.$x('//*[@id="container"]/article[30]/div/h1/a');
          txt30 = await p30.getProperty('textContent');
          href30 = await p30.getProperty('href');
          rawTxt30 = await txt30.jsonValue();
          srcTxt30 = await href30.jsonValue();
          const [c30] = await page.$x('//*[@id="container"]/article[30]/div/p/a');
          colour30 = await c30.getProperty('textContent');
          rawColour30 = await colour30.jsonValue();
          } catch {
            try {
            const [p30] = await page.$x('//*[@id="container"]/li[30]/div/div[1]/a')
            txt30 = await p30.getProperty('textContent');
            href30 = await p30.getProperty('href');
            rawTxt30 = await txt30.jsonValue();
            srcTxt30 = await href30.jsonValue();
            const [c30] = await page.$x('//*[@id="container"]/li[30]/div/div[2]/a');
            colour30 = await c30.getProperty('textContent');
            rawColour30 = await colour30.jsonValue();
            } catch {
              functionToHandleError()
            }
          }
   } catch(e) {
     console.log(e)
     functionToHandleError()
   }
   try {
 
     if(rawTxt1.includes(kw) && rawColour1.includes(ITEM_COLOUR)){
       await selectItem(rawTxt1, srcTxt1, rawColour1)
     } else if(rawTxt2.includes(kw) && rawColour2.includes(ITEM_COLOUR)) {
         await selectItem(rawTxt2, srcTxt2, rawColour2)
     } else if(rawTxt3.includes(kw) && rawColour3.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt3, srcTxt3, rawColour3)
     } else if(rawTxt4.includes(kw) && rawColour4.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt4, srcTxt4, rawColour4)
     } else if(rawTxt5.includes(kw) && rawColour5.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt5, srcTxt5, rawColour5)
     } else if(rawTxt6.includes(kw) && rawColour6.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt6, srcTxt6, rawColour6)
     } else if(rawTxt7.includes(kw) && rawColour7.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt7, srcTxt7, rawColour7)
     } else if(rawTxt8.includes(kw) && rawColour8.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt8, srcTxt8, rawColour8)
     } else if(rawTxt9.includes(kw) && rawColour9.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt9, srcTxt9, rawColour9)
     } else if(rawTxt10.includes(kw) && rawColour10.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt10, srcTxt10, rawColour10)
     } else if(rawTxt11.includes(kw) && rawColour11.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt11, srcTxt11, rawColour11)
     } else if(rawTxt12.includes(kw) && rawColour12.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt12, srcTxt12, rawColour12)
     } else if(rawTxt13.includes(kw) && rawColour13.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt2, srcTxt2, rawColour2)
     } else if(rawTxt13.includes(kw) && rawColour13.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt13, srcTxt13, rawColour13)
     } else if(rawTxt14.includes(kw) && rawColour14.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt14, srcTxt14, rawColour14)
     } else if(rawTxt16.includes(kw) && rawColour16.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt16, srcTxt16, rawColour16)
     } else if(rawTxt17.includes(kw) && rawColour17.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt17, srcTxt17, rawColour17)
     } else if(rawTxt18.includes(kw) && rawColour18.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt18, srcTxt18, rawColour18)
     } else if(rawTxt19.includes(kw) && rawColour19.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt19, srcTxt19, rawColour19)
     } else if(rawTxt20.includes(kw) && rawColour20.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt20, srcTxt20, rawColour20)
     } else if(rawTxt21.includes(kw) && rawColour21.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt21, srcTxt21, rawColour21)
     } else if(rawTxt22.includes(kw) && rawColour22.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt22, srcTxt22, rawColour22)
     } else if(rawTxt23.includes(kw) && rawColour23.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt23, srcTxt23, rawColour23)
     } else if(rawTxt24.includes(kw) && rawColour24.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt24, srcTxt24, rawColour24)
     } else if(rawTxt24.includes(kw) && rawColour24.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt25, srcTxt25, rawColour25)
     } else if(rawTxt26.includes(kw) && rawColour26.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt26, srcTxt26, rawColour26)
     } else if(rawTxt27.includes(kw) && rawColour27.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt27, srcTxt27, rawColour27)
     } else if(rawTxt28.includes(kw) && rawColour28.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt28, srcTxt28, rawColour28)
     } else if(rawTxt29.indexOf(kw) && rawColour29.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt29, srcTxt29, rawColour29)
     } else if(rawTxt30.includes(kw) && rawColour30.includes(ITEM_COLOUR)) {
       await selectItem(rawTxt30, srcTxt30, rawColour30)
     } else {
       //console.log('yes')
       var today = new Date();
       console.log(
         chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Waiting for drop')
       )
       waitForDrop()
     }
     } catch(e) {
       //console.log('no')
       console.log(e)
       var today = new Date();
       console.log(
         chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Waiting for drop')
       )
       waitForDrop()
     }





function stoperror() {
  return true;
}
}




//logintochrome()
//.then (async () => {
  //await searchkw()
//})


async function selectItem(raw, src, colour) {
//console.log('not all hope is lost')
  try{
    var today = new Date();
  console.log(
    chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + kw + " found")
  )
  var today = new Date();
  console.log(
    chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + "Selected Colour: " + colour))
  await page.goto(src);
  KWlink = src;
  //await sleep(1000)
  try {
    await page.click('#size');
  } catch {
    functionToHandleError()
    //var today = new Date();
    //console.log(
      //chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'OOS')
    //)
  }

  try {
    [pT1] = await page.$x('//*[@id="size"]/option[1]');
  } catch {
    [pT1] = 'undefined'
  }
  try {
    [pT2] = await page.$x('//*[@id="size"]/option[2]');
  } catch {
    [pT2] = 'undefined'
  }
  try {
    [pT3] = await page.$x('//*[@id="size"]/option[3]');
  } catch {
    [pT3] = 'undefined'
  }
  try {
    [pT4] = await page.$x('//*[@id="size"]/option[4]');
  } catch {
    [pT4] = 'undefined'
  }
  //const [pT1] = await page.$x('//*[@id="size"]/option[1]');
  //const [pT2] = await page.$x('//*[@id="size"]/option[2]');
  //const [pT3] = await page.$x('//*[@id="size"]/option[3]');
  //const [pT4] = await page.$x('//*[@id="size"]/option[4]');


    try {
      rawproductTxt1 = await pT1.getProperty('textContent');
      productTxt1 = await rawproductTxt1.jsonValue();
    } catch {
      rawproductTxt1 = 'undefined'
      productTxt1 = 'undefined'
    }
    try {
      rawproductTxt2 = await pT2.getProperty('textContent');
      productTxt2 = await rawproductTxt2.jsonValue();
    } catch {
      rawproductTxt2 = 'undefined'
      productTxt2 = 'undefined'
    }
    try {
      rawproductTxt3 = await pT3.getProperty('textContent');
      productTxt3 = await rawproductTxt3.jsonValue();
    } catch {
      rawproductTxt3 = 'undefined'
      productTxt3 = 'undefined'
    }
    try {
      rawproductTxt4 = await pT4.getProperty('textContent');
      productTxt4 = await rawproductTxt4.jsonValue();
    } catch {
      rawproductTxt4 = 'undefined'
      productTxt4 = 'undefined'
    }

    //rawproductTxt2 = await pT2.getProperty('textContent');
    //productTxt2 = await rawproductTxt2.jsonValue();
    //rawproductTxt3 = await pT3.getProperty('textContent');
    //productTxt3 = await rawproductTxt3.jsonValue();
    //rawproductTxt4 = await pT4.getProperty('textContent');
    //productTxt4 = await rawproductTxt4.jsonValue();

    //console.log(productTxt1)
    //console.log(productTxt2)
    //console.log(productTxt3)
  
    if (productTxt1 == ITEM_SIZE) {
      const rawpValue1 = await pT1.getProperty('value');
      const pValue1 = await rawpValue1.jsonValue();
      //console.log('pt1 showed up')
      //console.log(productTxt1)
      await page.select('select#size', pValue1)
      if (productTxt1 == ITEM_SIZE) {
        //console.log(productTxt1)
        await page.select('select#size', pValue1)
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size Small to the cart')
        )
      } else {
        var today = new Date();
        console.log(
          chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Small not in stock!')
        )
      }
      const rawproductTxt2 = await pT2.getProperty('textContent');
      var productTxt2 = await rawproductTxt2.jsonValue();
    } else if (productTxt2 == ITEM_SIZE) {
        const rawpValue2 = await pT2.getProperty('value');
        const pValue2 = await rawpValue2.jsonValue();
        //console.log('pt2 showed up')
        //console.log(pValue2)
        await page.select('select#size', pValue2)
        if (productTxt2 == ITEM_SIZE) {
          //console.log(productTxt2)
          await page.select('select#size', pValue2)
          var today = new Date();
          console.log(
            chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size Medium to the cart')
          )
        } else {
          var today = new Date();
          console.log(
            chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Medium not in stock!')
          )
        }
        const rawproductTxt3 = await pT3.getProperty('textContent');
        var productTxt3 = await rawproductTxt3.jsonValue();
    } else if (productTxt3 == ITEM_SIZE) {
        const rawpValue3 = await pT3.getProperty('value');
        const pValue3 = await rawpValue3.jsonValue();
        //console.log(pValue3)
        //console.log('pt3 showed up')
        if (productTxt3 == ITEM_SIZE) {
          //console.log(productTxt3)
          await page.select('select#size', pValue3)
          var today = new Date();
          console.log(
            chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size Large to the cart')
          )
        } else {
          var today = new Date();
          console.log(
            chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Large not in stock!')
          )
        }
    } else if (pT4 != 'undefined' && productTxt4 == ITEM_SIZE) {
        const rawpValue4 = await pT4.getProperty('value');
        const pValue4 = await rawpValue4.jsonValue();
        //console.log(pValue4)
        if (productTxt4 == ITEM_SIZE) {
          //console.log(productTxt4)
          await page.select('select#size', pValue4)
          var today = new Date();
          console.log(
            chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size XLarge to the cart')
          )
        } else {
          var today = new Date();
          console.log(
            chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'XLarge not in stock!')
          )
        }
    //await sleep(1000)
    //await page.waitForSelector()
    //await page.click('#add-remove-buttons > input');
    //await sleep(1000)
    } else if (ITEM_SIZE == 'N/A') {
      //console.log(ITEM_SIZE)
      var today = new Date();
          console.log(
            chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'No size selection needed')
          )
    } else {
      console.log(ITEM_SIZE)
      var today = new Date();
      console.log(
        chalk.red('Size: ' + ITEM_SIZE + ' Is OOS.')
      )
      var today = new Date();
      console.log(
        chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Switching to restocks mode...')
      )
      var today = new Date();
      console.log(
        chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Restock Mode Initiated...')
      )
      restocks();
    }

    //const [atc] = page.$x('//*[@id="add-remove-buttons"]/input')
    try {
      await page.click('#add-remove-buttons > input')
      await sleep(3000)
      await page.goto('https://www.supremenewyork.com/checkout')
      page.waitForNavigation()
      await sleep(2000)
      await checkout()
    } catch(e) {
      console.log(e)
      functionToHandleError()
      var today = new Date();
      console.log('wagwan g')
      console.log(
        chalk.red('Item is OOS.')
      )
      var today = new Date();
      console.log(
        chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Switching to restocks mode...')
      )
      var today = new Date();
      console.log(
        chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Restock Mode Initiated...')
      )
      //restocks();
    }
    
    }catch(e){
    functionToHandleError(e);
    //console.log(e)
    var today = new Date();
    console.log(
      chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Size: ' + ITEM_SIZE + ' Is OOS.')
    )
    var today = new Date();
    console.log(
      chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Switching to restocks mode...')
    )
    var today = new Date();
    console.log(
      chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Restock Mode Initiated...')
    )
    restocks();
    


}
};    

async function restocks() {
  var today = new Date();
  console.log(
    chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Checking for stock...')
  )
  await page.reload({ waitUntil: ["domcontentloaded"] });
  try{

  await page.click('#size');
  const [pT1] = await page.$x('//*[@id="size"]/option[1]');
  const [pT2] = await page.$x('//*[@id="size"]/option[2]');
  const [pT3] = await page.$x('//*[@id="size"]/option[3]');
  const [pT4] = await page.$x('//*[@id="size"]/option[4]');



  

    const rawproductTxt1 = await pT1.getProperty('textContent');
    var productTxt1 = await rawproductTxt1.jsonValue();
    const rawproductTxt2 = await pT2.getProperty('textContent');
    var productTxt2 = await rawproductTxt2.jsonValue();
    const rawproductTxt3 = await pT3.getProperty('textContent');
    var productTxt3 = await rawproductTxt3.jsonValue();
    const rawproductTxt4 = await pT4.getProperty('textContent');
    var productTxt4 = await rawproductTxt4.jsonValue();
    


  //console.log(productTxt1)
  //console.log(productTxt2)
  //console.log(productTxt3)

  if (productTxt1 == ITEM_SIZE) {
    const rawpValue1 = await pT1.getProperty('value');
    const pValue1 = await rawpValue1.jsonValue();
    //console.log('pt1 showed up')
    //console.log(productTxt1)
    await page.select('select#size', pValue1)
    if (productTxt1 == ITEM_SIZE) {
      //console.log(productTxt1)
      await page.select('select#size', pValue1)
      await page.click('#add-remove-buttons > input')
      await sleep(100)
      await page.click('#cart > a.button.checkout')
      var today = new Date();
      console.log(
        chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size Small to the cart')
      )
    } else {
      var today = new Date();
      console.log(
        chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Small not in stock')
      )
    }
    const rawproductTxt2 = await pT2.getProperty('textContent');
    var productTxt2 = await rawproductTxt2.jsonValue();
  } else if (productTxt2 == ITEM_SIZE) {
      const rawpValue2 = await pT2.getProperty('value');
      const pValue2 = await rawpValue2.jsonValue();
      //console.log('pt2 showed up')
      //console.log(pValue2)
      await page.select('select#size', pValue2)
      if (productTxt2 == ITEM_SIZE) {
        //console.log(productTxt2)
        await page.select('select#size', pValue2)
        await page.click('#add-remove-buttons > input')
        await sleep(100)
        await page.click('#cart > a.button.checkout')
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size Medium to the cart')
        )
      } else {
        var today = new Date();
        console.log(
          chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Medium not in stock')
        )
      }
      const rawproductTxt3 = await pT3.getProperty('textContent');
      var productTxt3 = await rawproductTxt3.jsonValue();
  } else if (productTxt3 == ITEM_SIZE) {
      const rawpValue3 = await pT3.getProperty('value');
      const pValue3 = await rawpValue3.jsonValue();
      //console.log(pValue3)
      //console.log('pt3 showed up')
      if (productTxt3 == ITEM_SIZE) {
        //console.log(productTxt3)
        await page.select('select#size', pValue3)
        await page.click('#add-remove-buttons > input')
        await sleep(100)
        await page.click('#cart > a.button.checkout')
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size Large to the cart')
        )
      } else {
        var today = new Date();
        console.log(
          chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Large not in stock')
        )
      }
  } else if (pT4 != 'undefined' && productTxt4 == ITEM_SIZE) {
      const rawpValue4 = await pT4.getProperty('value');
      const pValue4 = await rawpValue4.jsonValue();
      //console.log(pValue4)
      if (productTxt4 == ITEM_SIZE) {
        //console.log(productTxt4)
        await page.select('select#size', pValue4)
        await page.click('#add-remove-buttons > input')
        await sleep(100)
        await page.click('#cart > a.button.checkout')
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Added size XLarge to the cart')
        )
      } else {
        var today = new Date();
        console.log(
          chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'XLarge not in stock')
        )
      }
  //await sleep(1000)
  //await page.waitForSelector()
  //await page.click('#add-remove-buttons > input');
  //await sleep(1000)
  } else {
    var today = new Date();
    console.log(
      chalk.red('Size: ' + ITEM_SIZE + ' Is OOS.')
    )
    var today = new Date();
    console.log(
      chalk.yellow('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Checking again')
    )
    restocks();
  }
}catch(e){
  functionToHandleError(e);
  var today = new Date();
  console.log(
    chalk.red('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'Size: ' + ITEM_SIZE + ' Is OOS.')
  )
  restocks()
  }
}

//selectItem(rawTxt2,srcTxt2)

  async function checkout() {
    var today = new Date();
    console.log(
      chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + 'filling...')
    )
        page.waitForSelector('#order_billing_name')
        try {
        await page.type('#order_billing_name', BILLING_NAME);//#order_billing_name
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#order_email', EMAIL);//#order_email
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#order_tel', TELEPHONE);//#order_tel
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#bo', BILLING_STREET);//#bo
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#order_billing_city', BILLING_CITY);//##order_billing_city
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#order_billing_zip', BILLING_POSTCODE);//#order_billing_zip
        } catch {
          functionToHandleError()
        }
        try {
        await page.select('select#order_billing_country', BILLING_COUNTRY);
        } catch {
          functionToHandleError()
        }
        try {
        await page.select('select#order_billing_state', BILLING_STATE);//#order_billing_state//#order_billing_country
        } catch {
          functionToHandleError()
        }
        //await page.click('#credit_card_type');
        //try {
        //await page.select('select#credit_card_type', CARD_TYPE);//#credit_card_type
        //} catch {
          //await page.select('select#credit_card_type', 'credit card');
       // }
        try {
          await page.type('#cnb', CARD_NUMBER);
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#rnsnckrn', CARD_NUMBER);//#rnsnckrn
        } catch {
          functionToHandleError()
        }
        try {
        await page.select('select#credit_card_month', CARD_MONTH);//#credit_card_month
        } catch {
          functionToHandleError()
        }
        try {
        await page.select('select#credit_card_year', CARD_YEAR);//#credit_card_year
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#vval', '111');
        } catch {
          functionToHandleError()
        }
        try {
        await page.type('#orcer', '111');//#orcer
        } catch {
          functionToHandleError()
        }
        await page.click('#cart-cc > fieldset > p > label > div > ins')//#cart-cc > fieldset > p > label > div > ins
        sleep(300)
        await page.click('#pay > input')//#pay > input
      
        await page.screenshot({path: 'example.png'});
      
        //await browser.close();
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + "autofilled")
        )
        var today = new Date();
        console.log(
          chalk.green('[' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + '] ' + "Attempted checkout! Captcha completion may be needed!")
        )


      
      }


      //})
    


 
/*
  function checkout() {
    page.waitForSelector('#order_billing_name')
    page.then(() => {
      (async () => {
        await page.type('#order_billing_name', BILLING_NAME);
        await page.type('#order_email', EMAIL);
        await page.type('#order_tel', TELEPHONE);
        await page.type('#bo', BILLING_STREET);
        await page.type('#order_billing_city', BILLING_CITY);
        await page.type('#order_billing_zip', BILLING_POSTCODE);
        await page.select('select#order_billing_country', BILLING_COUNTRY);
        await page.select('select#credit_card_type', CARD_TYPE);
        await page.type('#cnb', CARD_NUMBER);
        await page.select('select#credit_card_month', CARD_MONTH);
        await page.select('select#credit_card_year', CARD_YEAR);
        await page.type('#vval', '111');
    
        await page.screenshot({path: 'example.png'});
    
      //await browser.close();
    })
    

  })}

*/




//}})
//})
