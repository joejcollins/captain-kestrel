"use strict";
const { test } = require('../browser');
const ContactPage  = require('../pages/Contact');
var assert = require('assert');

describe('On the contact page', () => {

    let contactPage;

    it('it shows me the title', test(async (browser, opts) => {
        contactPage = new ContactPage(browser, opts);
        await contactPage.visit();
        await contactPage.awaitH1();
        const innerText = await contactPage.getH1Content();   
        assert.equal(innerText, contactPage.pageH1Text);
    }));

    it('but when you submit empty fields it theres a no message error', test(async (browser, opts) => {
        await contactPage.submitTheForm();
        const messageErrorShown = await contactPage.isMessageErrorShown();
        assert.ok(messageErrorShown);
    }));

    it('if the message is filled, theres an email message error', test(async (browser, opts) => {
        await contactPage.fillMessage("Test Message");
        await contactPage.submitTheForm();
        const messageErrorShown = await contactPage.isMessageErrorShown();
        assert.ok(!messageErrorShown);
        const emailErrorShown = await contactPage.isEmailErrorShown();
        assert.ok(emailErrorShown);
    }));

});