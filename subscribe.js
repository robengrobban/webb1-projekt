
$(document).ready(function() {
	$("#subscribe-form").on("submit", function(e) {
		e.preventDefault();
		submitEmail();
	});
	$("#subscribe-form-email").on("focus", function(e) {
		restoreEmailError();
	});
	$("#subscribe-form-email").on("blur", function(e) {

		var email = $("#subscribe-form-email").val();

		if ( email.trim() != "" && !isEmail(email) ) {
			paintEmailError();
		}
		else {
			restoreEmailError();
		}

	});
});

function paintEmailError() {
	$("#subscribe-form-email").addClass("email-error");
}
function restoreEmailError() {
	$("#subscribe-form-email").removeClass("email-error");
}

function submitEmail() {

	var email = $("#subscribe-form-email").val();

	if ( isEmail(email) ) {

		$("#subscribe-form input").hide();
		$("#subscribe-form button").hide();
		$("#subscribe-result").fadeIn(500);
		restoreEmailError();

	}
	
}
