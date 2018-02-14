const BasePage  = require('../pages/BasePage');

class HomePage extends BasePage {

    constructor (browser, options) {
        super(browser, options);
        this.pageH1Text = "Womerton Bunkhouse";
        var htmlPage = "/";
    };

}
module.exports = HomePage;