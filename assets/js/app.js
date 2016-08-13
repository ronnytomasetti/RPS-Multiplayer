/*
 * HOMEWORK ASSIGNMENT RPS-MULTIPLAYER
 * UCF CODING BOOTCAMP 2016
 * RONNY TOMASETTI
 */

var Game = new Game();

Game.initializeFirebaseConnection();

/**
 * Renders the new player form in order to grab nickname input from user.
 *
 * @param {}
 * @return {}
 */
function renderNewPlayerForm() {
	$('#rpsls-app').load('assets/ajax/new-player-form-template.html', function() {
		$('#play-btn').on('click', function(event) {
			event.preventDefault();

			var nameInput = $('#name-input').val().trim();

			if (nameInput != '') {
				Game.player.name = nameInput;
				Game.player.totalWins = 0;
				Game.player.totalLosses = 0;
				Game.player.totalDraws = 0;

				Game.createAnonymousPlayer();

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
 * Renders the player profile home displaying player profile,
 * list of open games, and RPSLS leaderboard.
 *
 * @param {}
 * @return {}
 */
function renderPlayerProfileHome() {
	$('#rpsls-app').load('assets/ajax/profile-home-template.html', function() {
		$('#player-name').html(Game.player.name);
		$('#score-player-wins').html(Game.player.totalWins);
		$('#score-player-losses').html(Game.player.totalLosses);
		$('#score-player-draws').html(Game.player.totalDraws);

		$('#confirm-game-btn').on('click', function(event) {
			event.preventDefault();

			var room = $('#game-room-id').val().trim();
			
			if (room === '')
				room = Game.player.name + "'s Game";

			$('#new-game-modal').modal('hide');
			$('#game-room-id').val('');

			var newRoomKey = Game.getNewRoomKey(room);

			renderNewBattlefield(newRoomKey);
		});
	});

	Game.startGameRoomsListeners();
}

/**
 * Adds new game room buttons to the list of open games.
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
									joinBattlefield(roomKey);
								});

	$('#open-games-list').prepend($gameBtn);
}

/**
 * Removes a game room button from list of open games.
 *
 * @param {string} roomKey :Room key variable for game room.
 * @return {}
 */
function removeGameRoomBtn(roomKey) {
	$('#open-games-list').find('[room-key=' + roomKey + ']').remove();
}

/**
 * Loads the battlefield page from create game button action allowing players to play rounds of RPSLS.
 *
 * @param {string} roomKey :Room key variable for game room.
 * @return {}
 */
function renderNewBattlefield(roomKey) {
	$('#rpsls-app').load('assets/ajax/battlefield-template.html', function() {
		Game.initializeBattle(roomKey);

		$('#name-player').html(Game.player.name);
		$('.player-wins').html(Game.player.battleWins);
		$('.player-losses').html(Game.player.battleLosses);
		$('.player-draws').html(Game.player.battleDraws);
	});
}

/**
 * Loads battlefield page from join game button action allowing players to play rounds of RPSLS.
 *
 * @param {string} roomKey :Room key variable for game room.
 * @return {}
 */
function joinBattlefield(roomKey) {
	$('#rpsls-app').load('assets/ajax/battlefield-template.html', function() {
		Game.joinBattle(roomKey);

		$('#name-player').html(Game.player.name);
		$('.player-wins').html(Game.player.battleWins);
		$('.player-losses').html(Game.player.battleLosses);
		$('.player-draws').html(Game.player.battleDraws);
	});
}

function addNewChatMessage(name, message) {
	$('#chat-history').find('.chat-name').
}

// ------------------- STARTS APPLICATION ------------------- //
$(document).ready( function() {
	var user = Game.getCurrentUser();

	if (user)
		renderPlayerProfileHome();
	else
		renderNewPlayerForm();
});
