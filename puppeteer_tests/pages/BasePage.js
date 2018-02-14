class BasePage{

    constructor (browser, options) {
        this.browser = browser;
        this.options = options;
        this.htmlPage = "";
        this.pageH1Text = "";
    };

    get pageUrl(){
        return this.options.appUrl + this.htmlPage;
    }

    async visit() {
        this.page = await this.browser.newPage(); 
        await this.page.goto(this.pageUrl); 
    }; 

    async awaitH1() {
        await this.page.waitForSelector('h1');
    };

    async getH1Content() {
        return await this.page.evaluate(() => {
            return document.querySelector("h1").innerText;
        });
    };  

    async clickHome(){
        //
    }
}
module.exports = BasePage;