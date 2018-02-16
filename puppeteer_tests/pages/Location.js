const CommonFeatures  = require('./CommonFeatures');

class LocationPage {

    constructor (tab) {
        this.common = new CommonFeatures(tab);
        this.pageH1Text = "";
    };

}
module.exports = LocationPage;