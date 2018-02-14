"use strict";
const { test } = require('../browser');
const HomePage  = require('../pages/Home');
const Menu = require('../pages/Menu')
var assert = require('assert');

describe('On the home page', () => {

    let homePage;
    let menu;

    it('it shows me the title', test(async (browser, opts) => {
        homePage = new HomePage(browser, opts);
        await homePage.visit();
        await homePage.awaitH1();
        const innerText = await homePage.getH1Content();   
        assert.equal(innerText, homePage.pageH1Text);
    }));

    it('and it shows the same title after a menu click', test(async (browser, opts) => {
        menu = new Menu(homePage);
        await menu.clickHome();
        await homePage.awaitH1();
        const innerText = await homePage.getH1Content();   
        assert.equal(innerText, homePage.pageH1Text);
    }));

    
});



