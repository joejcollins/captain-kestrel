
const { test } = require('../browser');
const contactPage  = require('../pages/Contact');
var assert = require('assert');

describe('When on the contact pages', () => {

    let ContactPage;

    it('it shows me the title', test(async (browser, opts) => {
        ContactPage = new contactPage(browser, opts);
        await ContactPage.visit();
        await ContactPage.awaitH1();
        const innerText = await ContactPage.getH1Content();   
        assert.equal(innerText, ContactPage.pageH1Text);
    }));
});