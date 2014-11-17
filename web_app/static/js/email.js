/**********************************************************
Check that the form fields have been filled in
**********************************************************/
function validateForm(form) {
    document.getElementById("MessageError").firstChild.data = "";
    document.getElementById("FromError").firstChild.data = "";
    if ((form.Message.value == "") && (form.From.value == "")) {
        document.getElementById("MessageError").firstChild.data = "...please enter a message and email";
        form.Message.focus();
        return false;
    }
    if (form.Message.value == "") {
        document.getElementById("MessageError").firstChild.data = "...please enter a message";
        form.Message.focus();
        return false;
    }
    if ((form.From.value == "") || (IsEmailAddress(form.From.value)) == false) {
        document.getElementById("FromError").firstChild.data = "...please enter an email";
        form.From.focus();
        return false;
    }
    return true;
}

/**********************************************************
Check that the email address appears valid
**********************************************************/
function IsEmailAddress(strEmailAddress) {
    // Note: The next expression must be all on one line...
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var goodEmail = strEmailAddress.match(emailRegex);
    if (goodEmail) {
        return true;
    }
    else {
        return false;
    }
}