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
var contactPage;

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
        await this.homePage.common.awaitFooter();
        const innerText = await this.homePage.common.getH1Content();   
        assert.equal(innerText, this.homePage.pageH1Text);
    }));
});

describe('On the location page', () => {

    it('there is a map', test(async (browser, opts) => {
        this.locationPage = await this.menu.clickMenuLocation();

        const newLocal = this.locationPage.page;
        // Check for content of Iframe contains "Womerton"
        const frames = await newLocal.frames();
        await newLocal.evaluate(async() => { setTimeout(function(){ console.log('waiting'); }, 4000);}); 
        await newLocal.screenshot({path: './screenshot-full.png', fullPage: true});
        const frame = await frames.find(f => f.name() === 'googlemap');


        //assert.con
        //mapFrame.page

        

    }));

});

describe('On the contact page', () => {

    it('it shows me the title', test(async (browser, opts) => {
        this.contactPage = await this.menu.clickMenuContact();
        await this.contactPage.common.awaitH1();
        const innerText = await this.contactPage.common.getH1Content();   
        assert.equal(innerText, this.contactPage.pageH1Text);
    }));

    it('but when you submit empty fields it theres a no message error', test(async (browser, opts) => {
        await this.contactPage.clearForm();
        await this.contactPage.submitTheForm();
        const messageErrorShown = await this.contactPage.isMessageErrorShown();
        assert.ok(messageErrorShown);
    }));

    it('if the message is filled, theres an email message error', test(async (browser, opts) => {
        await this.contactPage.clearForm();
        await this.contactPage.fillMessage("Test Message");
        await this.contactPage.submitTheForm();
        const messageErrorShown = await this.contactPage.isMessageErrorShown();
        assert.ok(!messageErrorShown);
        const emailErrorShown = await this.contactPage.isEmailErrorShown();
        assert.ok(emailErrorShown);
    }));

    it('if the message and email are filled the page submits', test(async (browser, opts) => {
        await this.contactPage.clearForm();
        await this.contactPage.fillMessage("Test Message");
        await this.contactPage.fillEmail("a@b.com");
        await this.contactPage.submitTheForm();
        await this.contactPage.common.awaitH1();
        const innerText = await this.contactPage.common.getH1Content();   
        assert.equal(innerText, 'Thank you');
    }));

});
