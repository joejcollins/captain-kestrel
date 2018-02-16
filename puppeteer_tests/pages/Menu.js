const HomePage  = require('./Home');
const LocationPage  = require('./Location');
const ContactPage  = require('./Contact');

class Menu{

    constructor (tab) {
        this._tab = tab;
        this.homeLinkLocator = "#wrap > nav > div > div.navbar-header > a";
        this.locationLinkLocator = "#navbar > ul > li:nth-child(1) > a";
        this.contactLinkLocator = "#navbar > ul > li:nth-child(5) > a";
        this.footerLocator = "#footer";
    };

    async clickMenuHome() {
        await this._tab.click(this.homeLinkLocator);
        await this._tab.waitForSelector(this.footerLocator);
        return new HomePage(this._tab);
    }; 

    async clickMenuLocation() {
        await this._tab.click(this.locationLinkLocator);
        await this._tab.waitForSelector(this.footerLocator);
        return new LocationPage(this._tab);
    }; 

    async clickMenuContact() {
        await this._tab.click(this.contactLinkLocator);
        await this._tab.waitForSelector(this.footerLocator);
        return new ContactPage(this._tab);
    }; 

}
module.exports = Menu;