phantom.page.injectJs('./casper_tests/pages/Page.Contact.js');

// Get the seconds from midnight, after a fews hours mailinator mailboxes are deleted
// so the mailboxes will not be there the next day.
var dateTimeNow = new Date();
var secondsFromMidnight = dateTimeNow.getSeconds() + (60 * dateTimeNow.getMinutes()) + (60 * 60 * dateTimeNow.getHours());

// Make mail box names
var names = ["Alice", "Bob", "Carol", "Dave", "Eve"];
var mailBoxes = [];
names.forEach(function makeMailBox(name) {
    mailBoxes.push((name + '-' + secondsFromMidnight));
});

var contactPage = new ContactPage();

casper.options.viewportSize = { width: 960, height: 600 };

casper.test.begin('Joining email check ' + mailBoxes, function (test) {
    casper.echo("Base url is " + casper.cli.options.baseUrl);
    casper.start(casper.cli.options.baseUrl);

    // Send emails to Alice, Bob and Carol etc...
    casper.then(function sendEmails() {
        mailBoxes.forEach(function sendAnEmail(mailBox) {
            var emailAddress = mailBox + '@mailinator.com';
            contactPage.sendEmail(emailAddress);
        });
    });

    casper.then(function warningMessage(){
        casper.echo('Be advised, 2 minute wait for mail delivery.', 'COMMENT');
    });

    var success = 0;
    casper.wait(120000, function checkMailHasArrived(){
        mailBoxes.forEach(function checkMailBox(mailBox) {
            casper.thenOpen('http://mailinator.com/inbox.jsp?to=' + mailBox, function () {
                var subject = this.fetchText('div .subject');
                if (subject.indexOf("Invitation Request") > -1){ 
                    success = success + 1;
                    casper.echo(mailBox + ' got mail.', 'INFO'); // printed in green
                } else {
                    casper.echo(mailBox + ' no mail.', 'ERROR');
                }
            });
        });// Wait a bit.
    });

    // Then see if the emails arrived.
    casper.then(function mainlySuccessful() {
        casper.test.assert(success >= 3, success + ' out of the ' + mailBoxes.length + ' emails arrived.');
    });

    casper.run(function () {
        test.done();
    });
});
