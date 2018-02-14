"use strict";
const { test } = require('../browser');
const HomePage  = require('../pages/Home');
var assert = require('assert');

describe('On the home page', () => {

    let homePage;

    it('it shows me the title', test(async (browser, opts) => {
        homePage = new HomePage(browser, opts);
        await homePage.visit();
        await homePage.awaitH1();
        const innerText = await homePage.getH1Content();   
        assert.equal(innerText, homePage.pageH1Text);
    }));
});



