const BasePage  = require('../pages/BasePage');

class ContactPage extends BasePage {

    constructor (browser, options) {
        super(browser, options);
        super.htmlPage = "/contact";
        this.pageH1Text = "Send a Message";
        this.submitButtonLocator = 'form input[type="submit"]';
    };

    async visit() {
        console.log(super.pageUrl); 
        this.page = await this.browser.newPage(); 
        await this.page.goto(super.pageUrl); 
    }; 

    async awaitH1() {
        await this.page.waitForSelector('h1');
    };

    async getH1Content() {
        return await this.page.evaluate(() => {
            return document.querySelector("h1").innerText;
        });
    };  

    async submitTheForm () {
        await this.page.click(this.submitButtonLocator);
    }; 





    // // Send email
    // this.sendEmail = function (emailAddress) {
    //     this.startOnContactPage();
    //     this.checkPage();
    //     this.fillForm(emailAddress);
    //     this.submitForm();
    //     this.checkResponsePage(emailAddress);
    // };

    // // Fill in the email box
    // this.fillForm = function(emailAddress) {
    //     casper.waitForSelector("form input[name='From']", function() {
    //         casper.fillSelectors('form#Contact_Form', {
    //             "textarea[name = Message]": 'Test message, ignore.',
    //             "input[name = From]": emailAddress,
    //         }, false);
    //     });
    // };

    // // Click on the submit button
    // this.submitForm = function () {
    //     casper.then(function () {
    //         casper.click('form input[type="submit"]', 'Send button clicked.');
    //     });
    // };

    // this.checkResponsePage = function (emailAddress) {
    //     casper.waitForSelector("H1", function () {
    //         casper.test.assertTextExists('Thank you', 'Correct title on response page.');
    //     });
    // };
}
module.exports = ContactPage;