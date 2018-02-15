class BasePage{

    constructor (browser, options) {
        this.browser = browser;
        this.options = options;
        this.htmlPage = "";
        this.pageH1Text = "";
        this.homeLinkLocator = "#wrap > nav > div > div.navbar-header > a";
        this.locationLinkLocator = "#navbar > ul > li:nth-child(1) > a";
    };

    get pageUrl(){
        return this.options.appUrl + this.htmlPage;
    }

    async visit() {
        this.page = await this.browser.newPage(); 
        await this.page.goto(this.pageUrl); 
    }; 

    async clickMenuHome() {
        await this.page.click(this.homeLinkLocator);
    }; 

    async clickMenuLocation() {
        await this.page.click(this.locationLinkLocator);
    }; 

    async awaitH1() {
        await this.page.waitForSelector('h1');
    };

    async getH1Content() {
        return await this.page.evaluate(() => {
            return document.querySelector("h1").innerText;
        });
    };  

}
module.exports = BasePage;