"use strict";
const { test } = require('../browser');
const BasePage  = require('../pages/BasePage');
var assert = require('assert');



let page = new BasePage(browser, opts);

//let menu = new menu(tab);

// describe('On the home page', () => {

    
//     let homePage;

//     it('it shows me the title', test(async (browser, opts) => {
//         tab = new BasePage(browser, opts);
//         menu = 

//     }));

//     it('and it shows the same title after a menu click', test(async (browser, opts) => {
//         await homePage.clickMenuHome();
//         await homePage.awaitH1();
//         const innerText = await homePage.getH1Content();   
//         assert.equal(innerText, homePage.pageH1Text);
//     }));

// });
