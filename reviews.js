
var reviews = [
	{
		"name": "Maria",
		"img": "portrait-placeholder.jpg",
		"content": "Vår tågresa med TuffeTuffeTåg var den bästa tågresan vi haft. Det var lugnt, bra service och deras tysta hytter gjorde det möjligt att sitta och kolla ut, lugnt och sansat."
	},
	{
		"name": "Erik",
		"img": "portrait-placeholder.jpg",
		"content": "Det var ett nöje att åka med TuffeTuffeTåg. Allt som man förväntar sig att ett modernt tåg ska ha hade de."
	},
	{
		"name": "Anna",
		"img": "portrait-placeholder.jpg",
		"content": "När vi insåg att vi hade bokat en resa på fel datum fick vi hjälp att boka om. Det var helt avgörande för att semestern inte skulle bli förstörd. Deras kundtjänst äger!"
	},
	{
		"name": "Lars",
		"img": "portrait-placeholder.jpg",
		"content": "Alltid gott med gratis kafé!"
	},
	{
		"name": "Margareta",
		"img": "portrait-placeholder.jpg",
		"content": "TuffeTuffeTågs WiFi är nog det bästa som ett tåg någonsin har erbjudit. Det var väldigt lätt att vara produktiv och vi lite arbete gjort medans man åkte med dem."
	},
	{
		"name": "Karl",
		"img": "portrait-placeholder.jpg",
		"content": "Det var väldigt enkelt att boka och ifall det behövdes, vilket det gjorde för oss, boka om utan problem. Dem bryr sig verkligen om deras resenärer!"
	},
	{
		"name": "Eva",
		"img": "portrait-placeholder.jpg",
		"content": "TuffeTuffeTågs tåg är jätte fräsha, morderna. Ifall man åker tåg så är TuffeTuffeTågs tåg dem bästa att åka med. Alla måste åka minst en gång. Sedan blir måste man försöka hålla sig från att åka igen"
	},
	{
		"name": "John",
		"img": "portrait-placeholder.jpg",
		"content": "Resorna är väldigt prisvärda. Jag trodde aldrig att en tågresa för detta pris skulle vara såhär bra. Rekommendarar starkt!"
	}
];

// Variable for storing the review loop objekt
var reviewLoop;

// The current review index
var currentReview = 0;
// The maximum numbers of reviews, used to reset the current review index so that it loops.
var maxReviews = reviews.length;
// Length in seconds that a review should be shown before automatic switch
var reviewShowLength = 15;

var fadeInAndOut = 500;

// Function for controlling the loop for the reviews
function looperController() {
	
	hideReview();
	moveReview();
	controllIndex();
	setTimeout(function() {
		updateReview();
	},fadeInAndOut);
	showReview();

}

// Fade out the review information
function hideReview() {
	// Fade out review information
	$("#review-image").fadeOut(fadeInAndOut);
	$("#review-quote").fadeOut(fadeInAndOut);
	$("#review-author").fadeOut(fadeInAndOut);
}

// Update index information to get a new review
function moveReview() {
	// Move to the next review
	currentReview++;
}

// Controll so that the index is not out of bounds
function controllIndex() {
	// If the review is larger than the maximum number of reviews, loop around
	if ( currentReview >= maxReviews ) {
		currentReview = 0;
	}
	// If buttons are used to back to previous reviews, we need to be able to loop around the other way
	else if ( currentReview < 0 ) {
		currentReview = maxReviews-1;
	}
}

// Change the review information
function updateReview() {
	// Get the review
	var review = reviews[currentReview]

	// Update the infromation
	$("#review-image").attr("src", review.img);
	$("#review-quote").text(review.content);
	$("#review-author").text(review.name);

}

// Fade in the review information
function showReview() {
	// Fade in review information
	$("#review-image").fadeIn(fadeInAndOut);
	$("#review-quote").fadeIn(fadeInAndOut);
	$("#review-author").fadeIn(fadeInAndOut);
}

// Force a new review based on a number of steps
function forceNewReview(steps) {

	// Stop the automatic loop from switching
	stopLoop();

	// Move index number of steps
	currentReview += steps;

	// Performe checks so that the index is correct
	controllIndex();

	// Show the current review
	hideReview();
	setTimeout(function() {
		updateReview();
	},fadeInAndOut);
	showReview();
	
	// Start the loop again
	startLoop();

}


// Start the loop for the automatic new loops
function startLoop() {
	reviewLoop = setInterval(looperController, 1000 * reviewShowLength);
}
// End the automatic loop
function stopLoop() {
	clearInterval(reviewLoop)
}

$(document).ready(function(){
	// Start the loop
	startLoop();
	// Initiate the first print
	updateReview();
	// Bind arrows
	$("#review-next-container").on("click", function() {
		forceNewReview(1);
	});
	$("#review-back-container").on("click", function() {
		forceNewReview(-1);
	});
});