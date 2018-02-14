const BasePage  = require('../pages/BasePage');

class ContactPage extends BasePage {

    constructor (browser, options) {
        super(browser, options);
        super.htmlPage = "/contact";
        this.pageH1Text = "Send a Message";
        this.messageLocator = 'textarea[id="Message"]';
        this.messageErrorLocator = 'span[id="MessageError"]';
        this.messageErrorText = 'please enter a message';
        this.emailLocator = 'input[id="From"]';
        this.emailErrorLocator = 'span[id="FromError"]';
        this.emailErrorText = 'please enter an email';
        this.submitButtonLocator = 'form input[type="submit"]';
    };

    async visit() {
        //console.log(super.pageUrl); 
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

    async isMessageErrorShown() {
        var message = await this.page.evaluate((selector) => {
            return document.querySelector(selector).innerText;
        }, this.messageErrorLocator);

        return message.includes(this.messageErrorText);
    };

    async fillMessage(message) {
        await this.clearForm();
        await this.page.type(this.messageLocator, message);
    };


    async isEmailErrorShown() {
        var message = await this.page.evaluate((selector) => {
            return document.querySelector(selector).innerText;
        }, this.emailErrorLocator);

        return message.includes(this.emailErrorText);
    };

    async clearForm() {
        await this.page.evaluate((locator) => {
            document.querySelector(locator).value = '';
        }, this.messageLocator);
        await this.page.evaluate((locator) => {
            document.querySelector(locator).value = '';
        }, this.emailLocator);
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

    // this.checkResponsePage = function (emailAddress) {
    //     casper.waitForSelector("H1", function () {
    //         casper.test.assertTextExists('Thank you', 'Correct title on response page.');
    //     });
    // };
}
module.exports = ContactPage;