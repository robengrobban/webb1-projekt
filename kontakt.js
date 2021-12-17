
$(document).ready(function(){

	// Show correct input field
	$("#answertype-email").on("click", function(e){
		$("#answer-email").show();
		$("#answer-phone").hide();
		$("#answer-letter").hide();
	});
	$("#answertype-phone").on("click", function(e){
		$("#answer-email").hide();
		$("#answer-phone").show();
		$("#answer-letter").hide();
	});
	$("#answertype-letter").on("click", function(e){
		$("#answer-email").hide();
		$("#answer-phone").hide();
		$("#answer-letter").show();
	});
	$("#answertype-none").on("click", function(e){
		$("#answer-email").hide();
		$("#answer-phone").hide();
		$("#answer-letter").hide();
	});

	// Actions on submit
	$("#contact-form").on("submit", function(e){
		// Prevent normal submit
		e.preventDefault();
		// Wipe old error
		wipeAllErrorSpots();
		var allCorrect = true;

		// Control that the names are in correct format
		var firstname = $("#input-firstname").val();
		var lastname = $("#input-lastname").val();

		if ( !isName(firstname) ) {
			allCorrect = false;
			printErrorMessage("firstname-error-spot", "Endast alfabetiska bokstäver.")
		}
		if ( !isName(lastname) ) {
			allCorrect = false;
			printErrorMessage("lastname-error-spot", "Endast alfabetiska bokstäver.");
		}

		// Get what type of answertype was selected
		var answertypeExsists = $("#answertype-email").is(':checked') || $("#answertype-phone").is(':checked') || $("#answertype-letter").is(':checked');
		if ( answertypeExsists ) {

			if ( $("#answertype-email").is(':checked') ) {

				var email = $("#input-email").val();

				if ( !isEmail(email) ) {
					allCorrect = false;
					printErrorMessage("answer-email-error-spot", "Ange en giltig emailadress.");
				}

			}
			else if ( $("#answertype-phone").is(':checked') ) {

				var phone = $("#input-phone").val();

				if ( !isPhoneNumber(phone) ) {
					allCorrect = false;
					printErrorMessage("answer-phone-error-spot", "Ange ett giltigt telefonnummer.");
				}

			}
			else if ( $("#answertype-letter").is(':checked') ) {

				var address = $("#input-address").val();
				var zip = $("#input-zip").val();

				if ( address.trim() == "" ) {
					allCorrect = false;
					printErrorMessage("answer-address-error-spot", "En address måste anges.");
				}
				if ( !isOnlyNumbers(zip) || zip.length != 5 ) {
					allCorrect = false;
					printErrorMessage("answer-zip-error-spot", "Ange ett giltigt postnummer.");
				}

			}

		}

		// Controll so that a message has been entered
		var message = $("#input-message").val();

		if ( message.trim() == "" ) {
			allCorrect = false;
			printErrorMessage("message-error-spot", "Ett meddelande måste skrivas.");
		}


		// Show that message has been sent
		if ( allCorrect ) {

			$("#form-content").hide();
			$("#answer-content").fadeIn(1000);
			$(document).scrollTop( $("#answer-content").offset().top - $("#contact-container").height()/2 );

		}


	});


});

// Show a error message
function printErrorMessage(id, message) {
	$("#" + id).text(message);
	$("#" + id).addClass("error-border");
}

// Wipe all the error spots
function wipeAllErrorSpots() {

	wipeErrorSpot("firstname-error-spot");
	wipeErrorSpot("lastname-error-spot");

	wipeErrorSpot("answertype-error-spot");

	wipeErrorSpot("answer-email-error-spot");

	wipeErrorSpot("answer-phone-error-spot");

	wipeErrorSpot("answer-address-error-spot");

	wipeErrorSpot("answer-zip-error-spot");

	wipeErrorSpot("message-error-spot");

}

// Wipe a error spots
function wipeErrorSpot(id) {

	$("#" + id).text("");
	$("#" + id).removeClass("error-border");

}


