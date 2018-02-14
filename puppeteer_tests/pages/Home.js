const BasePage  = require('../pages/BasePage');

class HomePage extends BasePage {

    constructor (browser, options) {
        super(browser, options);
        super.htmlPage =  "/";
        this.pageH1Text = "Womerton Bunkhouse";
    };

}
module.exports = HomePage;