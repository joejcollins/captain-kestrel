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

    async awaitFooer(){
        await this.page.waitForSelector('#footer');
    }

}
module.exports = CommonFeatures;