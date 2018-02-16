"use strict";
const { test } = require('../browser');
const HomePage  = require('../pages/Home');
var assert = require('assert');

let homePage;

describe('On the home page', () => {

    it('it shows me the title', test(async (browser, opts) => {
        homePage = new HomePage(browser, opts);
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



