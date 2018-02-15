class Menu{

    constructor (page) {
        this.page = page;
        this.homeLinkLocator = "#wrap > nav > div > div.navbar-header > a";
        this.locationLinkLocator = "#navbar > ul > li:nth-child(1) > a";
        this.footerLocator = "#footer";
    };

    async clickMenuHome() {
        await this.page.click(this.homeLinkLocator);
        await this.page.waitForSelector(footerLocator);
        return this.page;
    }; 

    async clickMenuLocation() {
        await this.page.click(this.locationLinkLocator);
        await this.page.waitForSelector(footerLocator);
        return this.page;
    }; 

}
module.exports = Menu;