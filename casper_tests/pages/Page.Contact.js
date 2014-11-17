function ContactPage() {

    // Send email
    this.sendEmail = function (emailAddress) {
        this.startOnContactPage();
        this.checkPage();
        this.fillForm(emailAddress);
        this.submitForm();
        this.checkResponsePage(emailAddress);
    };

    this.startOnContactPage = function () {
        casper.thenOpen(casper.cli.options.baseUrl + '/contact');
    };

    // Are you on the right page?
    this.checkPage = function () {
        casper.waitForSelector("#footer", function () {
            casper.test.assertUrlMatch('/contact', 'On the send mail page.');
            casper.test.assertExists('form', 'A form has been found on the page.');
        });
    };

    // Fill in the email box
    this.fillForm = function(emailAddress) {
        casper.waitForSelector("form input[name='From']", function() {
            casper.fillSelectors('form#Contact_Form', {
                "textarea[name = Message]": 'Test message, ignore.',
                "input[name = From]": emailAddress,
            }, false);
        });
    };

    // Click on the submit button
    this.submitForm = function () {
        casper.then(function () {
            casper.click('form input[type="submit"]', 'Send button clicked.');
        });
    };

    this.checkResponsePage = function (emailAddress) {
        casper.waitForSelector("H1", function () {
            casper.test.assertTextExists('Thank you', 'Correct title on response page.');
        });
    };
}