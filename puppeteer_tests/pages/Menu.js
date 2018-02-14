class Menu {


    constructor (page) {
        this.page = page;
        this.homeLinkLocator = "a[innertext='Womerton Bunkhouse']";
    };

    async clickHome() {
        await this.page.waitForSelector(this.homeLinkLocator);
    }; 

}
module.exports = Menu;