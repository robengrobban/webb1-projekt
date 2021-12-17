
var screens = [
	"step-from",
	"step-dest",
	"step-riders",
	"step-seats",
	"step-payment"
];
var currentScreen = 0;
var validators = [
	stepFromValidator,
	stepDestValidator,
	stepRidersValidator,
	stepSeatsValidator,
	stepPaymentValidator
];

var adults = 0;
var kids = 0;
var selectedSeats = 0;

$(document).ready(function(){

	// Remove default behavior for the form
	$("#order-form").on("submit", function(e){
		e.preventDefault();
		// Check all validators
		wipeAllErrorSpots();
		var okay = true;
		for ( var i = 0; i < validators.length; i++ ) {
			var temp = validators[i]();
			if ( okay ) {
				okay = temp;
			}
		}
		if ( okay ) {

			$("#order-form").hide();
			$("#buy-confirmation").fadeIn(1000);

			$("#read-from").val( $("#input-from").val().trim() );
			$("#read-dest").val( $("#input-dest").val().trim() );
			$("#read-date").val( $("#input-date").val().trim() );
			$("#read-time").val( $("#input-time").val().trim() );
			$("#read-adults").val( $("#input-adults").val().trim() );
			$("#read-kids").val( $("#input-kids").val().trim() );
			var seats = "";
			for (var i = 0; i < adults+kids; i++) {
				seats += (Math.floor(Math.random() * 100) + 1) + " ";
			}
			$("#read-seats").val(seats.trim());
			var track = "" + (Math.floor(Math.random() * 10) + 1);
			$("#read-track").val(track.trim());

		}
	});

	// Bind next and back buttons
	$(".controller-backward").on("click", function(){
		moveScreen(-1);
	});
	$(".controller-forward").on("click", function(){
		moveScreen(1);
	});


	// Put URL GET information into the page if they exsist
	putGETVariable();

	// Bind seats with function to press it
	$(".select-chair:not(.seat-occupied)").on("click", function(e){ occupieSeat(e); });

	// Update selectedSetas on load
	updateSelectedSeats();

});

// Update the selected seats screen
function updateSelectedSeats() {
	$("#seat-select-header h2").text(adults + kids - selectedSeats + " kvar att välja.");
}

// Try to occupie a seat
function occupieSeat(e) {
	// Check so that there are setas to select
	var target = $(e.target);
	var canSelectMore = adults + kids - selectedSeats > 0;

	// A seat can be occupied if you can select more and if it already is not already selecetd
	if ( canSelectMore && !target.hasClass("seat-selected") ) {
		target.addClass("seat-selected");
		selectedSeats++;
	}
	// A seta can be unselected if you have it selected
	else if ( target.hasClass("seat-selected") ) {
		target.removeClass("seat-selected");
		selectedSeats--;
	}

	updateSelectedSeats();
	
}

// Correct the selcetd seats. This will be dun after you select 
function correctSelectedSeats() {
	// If the number of people going on the train has changed and if it became
	// so that the number of seat selected is more than people, restart the process of selecting.
	if ( adults + kids - selectedSeats < 0 ) {
		selectedSeats = 0;
		$(".select-chair").removeClass("seat-selected");
		updateSelectedSeats();
	}
}

// Function to move the screen
function moveScreen(diff) {
	wipeAllErrorSpots();
	var okay = true;
	if ( diff > 0 ) {
		okay = validateCurrentScreen();
	}
	if ( okay ) {
		updateSelectedSeats();
		hideScreens();
		currentScreen += diff;
		controllBounds();
		showCurrentScreen();
		if ( screens[currentScreen] == "step-seats" ) {
			correctSelectedSeats();
		}
	}
}
// Controll so that the bounds are corecctly set
function controllBounds() {
	if ( currentScreen < 0 ) {
		currentScreen = 0;
	}
	else if ( currentScreen > screens.length ) {
		currentScreen = screens.length-1;
	}
}
// Hide all screens
function hideScreens() {
	for ( var i = 0; i < screens.length; i++ ) {
		$("#"+screens[i]).hide();
	}
}
// Show the current screen
function showCurrentScreen() {
	$("#"+screens[currentScreen]).show();
}
// Validate the current screen
function validateCurrentScreen() {
	return validators[currentScreen]();
}

// Validate information from thre from step
function stepFromValidator() {
	var okay = true;

	var from = $("#input-from").val().trim();
	var date = $("#input-date").val().trim();
	var time = $("#input-time").val() != null ? $("#input-time").val().trim() : "";

	if ( !isName(from) ) {
		okay = false;
		printErrorMessage("from-error-spot", "Endast alfabetiska bokstäver.");
	}
	if ( !isDate(date) ) {
		okay = false;
		printErrorMessage("date-error-spot", "Ange ett giltigt datum.");
	}
	if ( !isTime(time) ) {
		okay = false;
		printErrorMessage("time-error-spot", "Välj en avgångstid.");
	}

	return okay;

}

// Validate information on the destination validator
function stepDestValidator() {
	var okay = true;

	var dest = $("#input-dest").val().trim();

	if ( !isName(dest) ) {
		okay = false;
		printErrorMessage("dest-error-spot", "Endast alfabetiska bokstäver.");
	}

	return okay;
}

// Validate information on the riders step
function stepRidersValidator() {
	var okay = true;

	adults = $("#input-adults").val().trim();
	kids = $("#input-kids").val().trim();
	if ( !isOnlyNumbers(adults) ) {
		okay = false;
		printErrorMessage("adults-error-spot", "Endast siffror.");
	}
	if ( !isOnlyNumbers(kids) ) {
		okay = false;
		printErrorMessage("kids-error-spot", "Endast siffror.");
	}

	if ( okay && adults == 0 ) {
		okay = false;
		printErrorMessage("adults-error-spot", "Det måste minst finnas 1 vuxen.");
	}

	if ( okay ) {
		adults = parseInt(adults);
		kids = parseInt(kids);
	}
	else {
		adults = 0;
		kids = 0;
	}

	return okay;
}

// Validate information on the seats step
function stepSeatsValidator() {
	var okay = true;

	if ( adults + kids - selectedSeats > 0 ) {
		okay = false;
		printErrorMessage("seat-error-spot", "Välj platser till alla som ska vara med.");
	}

	return okay;
}

// Validate information on the payment step
function stepPaymentValidator() {
	var okay = true;

	var card = $("#input-card").val().trim();
	var holder = $("#input-holder").val().trim();
	var expDate = $("#input-expire").val().trim();
	var cvv = $("#input-cvv").val().trim();

	if ( !isOnlyNumbers(card) ) {
		okay = false;
		printErrorMessage("card-error-spot", "Endast siffror.");
	}
	else if ( card.length != 16 ) {
		okay = false;
		printErrorMessage("card-error-spot", "Ange 16 styken siffror.");
	}

	if ( !isFullname(holder) ) {
		okay = false;
		printErrorMessage("holder-error-spot", "Endast alfabetiska bokstäver.");
	}

	if ( !isCardExpireDate(expDate) ) {
		okay = false;
		printErrorMessage("expire-error-spot", "Ange en giltig utgångstid.");
	}

	if ( !isOnlyNumbers(cvv) || cvv.length != 3 ) {
		okay = false;
		printErrorMessage("cvv-error-spot", "Ange ett giltgt CVV.");
	}

	return okay;
}

// Show a error message
function printErrorMessage(id, message) {
	$("#" + id).text(message);
	$("#" + id).addClass("error-border");
}

// Wipe all the error spots
function wipeAllErrorSpots() {

	wipeErrorSpot("from-error-spot");
	wipeErrorSpot("date-error-spot");
	wipeErrorSpot("time-error-spot");
	wipeErrorSpot("dest-error-spot");
	wipeErrorSpot("adults-error-spot");
	wipeErrorSpot("kids-error-spot");
	wipeErrorSpot("seat-error-spot");
	wipeErrorSpot("card-error-spot");
	wipeErrorSpot("holder-error-spot");
	wipeErrorSpot("expire-error-spot");
	wipeErrorSpot("cvv-error-spot");

}

// Wipe a error spots
function wipeErrorSpot(id) {

	$("#" + id).text("");
	$("#" + id).removeClass("error-border");

}

// Get the GET variables form the URL
function GETVariable(variable) {
    var GETInfo = window.location.search.substring(1).split("&");
    var list = new Array();
    for (var i = 0; i < GETInfo.length; i++) {
        var pair = GETInfo[i].split('=');
        list.push(pair);
    }
    return list;
}

// Put GET information inside of the page
function putGETVariable() {

	var variables = GETVariable(window.location.search);

	for ( var i = 0; i < variables.length; i++ ) {

		var key = variables[i][0];
		var value = variables[i][1];

		if ( key == "from" ) {
			$("#input-from").val(value);
		}
		else if ( key == "to" ) {
			$("#input-dest").val(value);
		}
		else if ( key == "date" ) {
			$("#input-date").val(value);
		}
		else if ( key == "time" ) {
			$("#input-time").val(value.replace("%3A", ":"));
		}

	}

}