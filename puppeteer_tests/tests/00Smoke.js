"use strict";
const {test} = require('../browser');
const Menu  = require('../pages/Menu');
const HomePage  = require('../pages/Home');
const LocationPage  = require('../pages/Location');
const assert = require('assert');

var tab;
var menu;
var homePage;
var locationPage;

describe('On the landing page', () => {

    it('it shows me the title', test(async (browser, options) => {
        tab = await browser.newPage();
        await tab.goto(options.appUrl); 
        this.menu = new Menu(tab);
        this.homePage = new HomePage(tab);
        await this.homePage.common.awaitH1();
        const innerText = await this.homePage.common.getH1Content();   
        assert.equal(innerText, this.homePage.pageH1Text);
    }));

    it('and it shows the same title after a menu click', test(async (browser, opts) => {
        this.homePage = await this.menu.clickMenuHome();
        await this.homePage.common.awaitH1();
        const innerText = await this.homePage.common.getH1Content();   
        assert.equal(innerText, this.homePage.pageH1Text);
    }));
});

describe('On the location page', () => {

    it('there is no title', test(async (browser, opts) => {
        this.locationPage = await this.menu.clickMenuLocation();
        await this.homePage.common.awaitH1();
        const innerText = await this.locationPage.common.getH1Content();   
        assert.equal(innerText, locationPage.pageH1Text);
    }));

});
