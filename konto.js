
$(document).ready(function(){

	// On submit, show update settings text
	$("#other-settings").on("submit", function(e){
		// Prevent form from submitting
		e.preventDefault();

		// Show the confirmation text
		$("#other-settings-confirmation").fadeIn(1000);

	});
	$("#account-settings").on("submit", function(e){
		// Prevent form from submitting
		e.preventDefault();

		// Wipe old error
		wipeAllErrorSpots();
		var allCorrect = true;

		var firstname = $("#input-firstname").val();
		var lastname = $("#input-lastname").val();
		var email = $("#input-email").val();

		if ( !isName(firstname) ) {
			allCorrect = false;
			printErrorMessage("firstname-error-spot", "Endast alfabetiska bokstäver.");
		}

		if ( !isName(lastname) ) {
			allCorrect = false;
			printErrorMessage("lastname-error-spot", "Endast alfabetiska bokstäver.");
		}

		if ( !isEmail(email) ) {
			allCorrect = false;
			printErrorMessage("email-error-spot", "Ange en giltig emailadress.");
		}


		if ( allCorrect ) {
			// Show the confirmation text
			$("#account-settings-confirmation").fadeIn(1000);
		}
		
	});

	// Undo the save confirm message if an setting is updated
	$("#input-notrec").on("change", function(){
		$("#other-settings-confirmation").hide();
	});
	$("#input-notcom").on("change", function(){
		$("#other-settings-confirmation").hide();
	});
	$("#input-savemethod").on("change", function(){
		$("#other-settings-confirmation").hide();
	});
	$("#input-firstname").on("change", function(){
		$("#account-settings-confirmation").hide();
	});
	$("#input-lastname").on("change", function(){
		$("#account-settings-confirmation").hide();
	});
	$("#input-email").on("change", function(){
		$("#account-settings-confirmation").hide();
	});

	// Open ticket
	$(".show-ticket").on("click", function(){
		showTicket();
	});

});

var ticketWindow;
// Show a ticket
function showTicket() {
	if ( ticketWindow != null ) {
		ticketWindow.close();
	}
	ticketWindow = window.open("biljett.html", "TuffeTuffeTåg - Biljett", "width=500, height=800")
}

// Show a error message
function printErrorMessage(id, message) {
	$("#" + id).text(message);
	$("#" + id).addClass("error-border");
}

// Wipe all the error spots
function wipeAllErrorSpots() {

	wipeErrorSpot("firstname-error-spot");
	wipeErrorSpot("lastname-error-spot");
	wipeErrorSpot("email-error-spot");

}

// Wipe a error spots
function wipeErrorSpot(id) {

	$("#" + id).text("");
	$("#" + id).removeClass("error-border");

}
