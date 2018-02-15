"use strict";
const { test } = require('../browser');
const BasePage  = require('../pages/BasePage');
var assert = require('assert');

let tab;

describe('On the home page', () => {

    let menu;
    let homePage;

    it('it shows me the title', test(async (browser, opts) => {
        tab = new BasePage(browser, opts);
        menu = 
        await homePage.visit();
        await homePage.awaitH1();
        const innerText = await homePage.getH1Content();   
        assert.equal(innerText, homePage.pageH1Text);
    }));

    it('and it shows the same title after a menu click', test(async (browser, opts) => {
        await homePage.clickMenuHome();
        await homePage.awaitH1();
        const innerText = await homePage.getH1Content();   
        assert.equal(innerText, homePage.pageH1Text);
    }));

});
