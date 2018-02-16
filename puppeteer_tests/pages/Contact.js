const CommonFeatures  = require('./CommonFeatures');

class ContactPage {

    constructor (tab) {
        this.page = tab;
        this.common = new CommonFeatures(tab);
        this.pageH1Text = "Send a Message";
        this.messageLocator = 'textarea[id="Message"]';
        this.messageErrorLocator = 'span[id="MessageError"]';
        this.messageErrorText = 'please enter a message';
        this.emailLocator = 'input[id="From"]';
        this.emailErrorLocator = 'span[id="FromError"]';
        this.emailErrorText = 'please enter an email';
        this.submitButtonLocator = 'form input[type="submit"]';
    };

    async isMessageErrorShown() {
        var message = await this.page.evaluate((selector) => {
            return document.querySelector(selector).innerText;
        }, this.messageErrorLocator);

        return message.includes(this.messageErrorText);
    };

    async clearMessage(){
        await this.page.evaluate((locator) => {
            document.querySelector(locator).value = '';
        }, this.messageLocator);
    }

    async fillMessage(message) {
        this.clearMessage();
        await this.page.type(this.messageLocator, message);
    };

    async isEmailErrorShown() {
        var message = await this.page.evaluate((selector) => {
            return document.querySelector(selector).innerText;
        }, this.emailErrorLocator);
        return message.includes(this.emailErrorText);
    };

    async clearEmail(){
        await this.page.evaluate((locator) => {
            document.querySelector(locator).value = '';
        }, this.emailLocator);
    }

    async fillEmail(email) {
        await this.clearEmail();
        await this.page.type(this.emailLocator, email);
    };

    async clearForm() {
        this.clearMessage();
        this.clearEmail();
    };

    async fillForm(message, email){
        this.fillMessage(message);
        this.fillEmail(email);
    }

    async submitTheForm () {
        await this.page.click(this.submitButtonLocator);
    }; 

}
module.exports = ContactPage;