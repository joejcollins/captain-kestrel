class CommonFeatures{

    constructor (tab) {
        this.page = tab;
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
module.exports = CommonFeatures;