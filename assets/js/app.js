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

var GAME = new RPSLS();

GAME.initializeFirebaseConnection();

/**
 * DESCRIPTION
 *
 * @param {}
 * @return {}
 */
function renderNewPlayerForm() {
	$('#rpsls-app').load('assets/ajax/new-player-form-template.html', function() {
		$('#play-btn').on('click', function( event ) {
			event.preventDefault();

			var nameInput = $('#name-input').val().trim();

			if (nameInput != '') {
				GAME.player.name = nameInput;
				GAME.player.wins = 0;
				GAME.player.losses = 0;
				GAME.player.draws = 0;

				GAME.createAnonymousPlayer();

				renderPlayerProfileHome();
				
			} else {
				// TODO: Do better job at implement name input required error alert.
				$('#error-alert').removeClass('hidden');
			}
			$('#name-input').val('');
		});
	});
}

/**
 * DESCRIPTION
 *
 * @param {}
 * @return {}
 */
function renderPlayerProfileHome() {
	$('#rpsls-app').load('assets/ajax/profile-home-template.html', function() {
		$('#player-name').html(GAME.player.name);
		$('#score-player-wins').html(GAME.player.wins);
		$('#score-player-losses').html(GAME.player.losses);
		$('#score-player-draws').html(GAME.player.draws);

		$('#confirm-game-btn').on('click', function(event) {
			event.preventDefault();

			var room = $('#game-room-id').val().trim();
			
			if (room === '')
				room = GAME.player.name + "'s Game";

			$('#new-game-modal').modal('hide');
			$('#game-room-id').val('');

			var newRoomKey = GAME.getNewRoomKey(room);
			renderBattlefieldWith(newRoomKey);
		});
	});

	GAME.startGameRoomsListeners();
}

/**
 * Adds new button to the list of open games.
 *
 * @param {string} roomKey  :Room key variable for game room as retrieved from Firebase.
 * @param {string} roomName :Name variable for game room as retrieved from Firebase.
 * @return {}
 */
function addNewGameRoomBtn(roomKey, roomName) {
	var $gameBtn = $('<button>').addClass('btn btn-default btn-md btn-block')
								.attr('type', 'button')
								.attr('room-key', roomKey )
								.text(roomName)
								.on('click', function() {
									renderBattlefieldWith(roomKey);
								});
	$('#open-games-list').prepend($gameBtn);
}

/**
 * Removes button from list of open games.
 *
 * @param {string} roomKey :Room key variable for game room.
 * @return {}
 */
function removeGameRoomBtn(roomKey) {
	$('#open-games-list').find('[room-key=' + roomKey + ']').remove();
}

/**
 * Loads the battlefield template where player repeat rounds of RPSLS game logic.
 *
 * @param {string} roomKey :Room key variable for game room.
 * @return {}
 */
function renderBattlefieldWith(roomKey) {
	console.log("ROOM KEY: ", roomKey);
	$('#rpsls-app').load('assets/ajax/battlefield-template.html', function() {
		$('#name-player').html(GAME.player.name);
		$('.player-wins').html(GAME.player.wins);
		$('.player-losses').html(GAME.player.losses);
		$('.player-draws').html(GAME.player.draws);
	});
}

// ------------------- APPLICATION START -------------------
$(document).ready( function()
{
	var user = GAME.getCurrentUser();

	if (user)
		renderPlayerProfileHome();
	else
		renderNewPlayerForm();
});
