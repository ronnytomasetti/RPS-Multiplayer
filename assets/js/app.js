/*
 * HOMEWORK ASSIGNMENT RPS-MULTIPLAYER
 * UCF CODING BOOTCAMP 2016
 * RONNY TOMASETTI
 *
 * Instructions:
 *   1. Only two users can play at the same time.
 *   2. Both players pick either rock, paper, or scissors.
 *   3. After both players make their selection, the game will tell them the outcome (win, loss, draw).
 *   4. Game will track each player's wins, losses, and draws.
 *   5. Implement chat functionality into the game.
 *   6. Theme and style.
 */

 var rpslsChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

var config = {
	apiKey: "AIzaSyDkXBvYGeQz45NI9wQmWy6C_cS7P4KR354",
	authDomain: "rpsls-5141f.firebaseapp.com",
	databaseURL: "https://rpsls-5141f.firebaseio.com",
	storageBucket: "rpsls-5141f.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$('#play-btn').on('click', function() {
	var playerName = $('#name-input').val().trim();

	if (playerName != '') {
		$('#new-player-form').animate({
	        width: '200px',
	        opacity: '0',
	        display: 'hidden'
	    }, 'fast', renderBattlefield());

		firebase.auth().signInAnonymously().catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.warn("Error Code: " + errorCode);
			console.warn("Error Message: " + errorMessage);
		});

	} else {
		// TODO: Do better job at implement name input required error alert.
		$('#error-alert').removeClass('hidden');
	}
});

function renderBattlefield() {

}