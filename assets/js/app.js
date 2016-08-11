/*
 * HOMEWORK ASSIGNMENT RPS-MULTIPLAYER
 * UCF CODING BOOTCAMP 2016
 * RONNY TOMASETTI
 */

// Instructions: ================================================================
	// 1. Only two users can play at the same time.
	// 2. Both players pick either rock, paper, or scissors.
	// 3. After both players make their selection, the game will tell them the outcome (win, loss, draw).
	// 4. Game will track each player's wins, losses, and draws.
	// 5. Implement chat functionality into the game.
	// 6. Theme and style.
// ===============================================================================

// window.onload = function() {};

var WEAPON_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
var PLAYER = {};
var OPPONENT = {};

var CONFIG = {
	apiKey: "AIzaSyDkXBvYGeQz45NI9wQmWy6C_cS7P4KR354",
	authDomain: "rpsls-5141f.firebaseapp.com",
	databaseURL: "https://rpsls-5141f.firebaseio.com",
	storageBucket: "rpsls-5141f.appspot.com",
}; firebase.initializeApp(CONFIG);

var DATABASE = firebase.database();
var AUTH_DATA = firebase.auth();

function renderNewPlayerForm() {
	$('#rpsls-app').load('assets/ajax/new-player-form-template.html', function() {
		$('#play-btn').on('click', function( event ) {
			event.preventDefault();
			var nameInput = $('#name-input').val().trim();

			if (nameInput != '') {
				PLAYER.name = nameInput;
				PLAYER.wins = 0;
				PLAYER.losses = 0;
				PLAYER.draws = 0;

				AUTH_DATA.signInAnonymously().catch( function(error) {
					console.warn("Error Code: " + error.code + ": " + error.message);
				});

				AUTH_DATA.onAuthStateChanged( function(user) {

					DATABASE.ref('/player-profiles/' + user.uid).set({
						name: PLAYER.name,
						wins: PLAYER.wins,
						losses: PLAYER.losses,
						draws: PLAYER.draws
					});

					renderPlayerProfileHome();
				});

			} else {
				// TODO: Do better job at implement name input required error alert.
				$('#error-alert').removeClass('hidden');
			}
			$('#name-input').val('');
		});
	});
}

function renderPlayerProfileHome() {
	$('#rpsls-app').load('assets/ajax/profile-home-template.html', function() {
		// LOAD PLAYER STUFF FOR THIS PAGE
		$('#player-name').html(PLAYER.name);
		$('#score-player-wins').html(PLAYER.wins);
		$('#score-player-losses').html(PLAYER.losses);
		$('#score-player-draws').html(PLAYER.draws);

		$('#new-game-btn').on('click', function(event) {
			event.preventDefault();
		});

		$('#confirm-game-btn').on('click', function(event) {
			event.preventDefault();
			var room = $('#game-room-id').val().trim();
			
			if (room === '')
				room = PLAYER.name + "'s Game";

			var newRoomKey = DATABASE.ref('/game-rooms/').push({
																name: room,
																player: firebase.auth().currentUser.uid,
																opponent: false
															    }).key;

			$('#new-game-modal').modal('hide');
			$('#game-room-id').val('');
			renderBattlefieldWith(newRoomKey);
		});
	});

	DATABASE.ref('/game-rooms/').on('child_added', function(data) {
	  addNewGameRoomBtn(data.key, data.val().name);
	});

	DATABASE.ref('/game-rooms/').on('child_removed', function(data) {
	  removeGameRoomBtn(data.key);
	});
}

function addNewGameRoomBtn(roomKey, roomName) {
	var $gameBtn = $('<button>').addClass('btn btn-default btn-md btn-block')
								.attr('type', 'button')
								.attr('room-key', roomKey )
								.text(roomName);
	$('#open-games-list').prepend($gameBtn);
}

function removeGameRoomBtn(roomKey) {
	$('#open-games-list').find('[room-key=' + roomKey + ']').remove();
}

function renderBattlefieldWith(roomKey) {
	console.log("ROOM KEY: ", roomKey);
	$('#rpsls-app').load('assets/ajax/battlefield-template.html', function() {
		$('#name-player').html(PLAYER.name);
		$('.player-wins').html(PLAYER.wins);
		$('.player-losses').html(PLAYER.losses);
		$('.player-draws').html(PLAYER.draws);
	});
}

// ===============================
//    APPLICATION ENTRY POINT
// ===============================
$(document).ready( function() {

	var user = firebase.auth().currentUser;

	if (user)
		renderPlayerProfileHome();
	else
		renderNewPlayerForm();
});