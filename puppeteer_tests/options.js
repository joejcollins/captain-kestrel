const args = require('yargs-parser')(process.argv.slice(2));

module.exports =  {

  appUrl: args.appurl ? args.appurl : 'http://localhost:8080',

  puppeteer: {
      headless: args.show ? false : true, 
      slowMo: args.slowmo ? args.slowmo : 0
    }
  }; 