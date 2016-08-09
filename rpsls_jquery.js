// ====================================================================================
// CLICK EVENT FOR PLAY BUTTON
// ====================================================================================
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
// ================================== END =============================================

// ====================================================================================
// SEND NEW MESSAGE CLICK EVENT
// ====================================================================================
$('#message-send-btn').on('click', function() {
	var message = $('#new-chat-message').val().trim();

	if (message != '') {
		// TODO: Validate message string before sending to database.
		firebase.database().ref('gameRooms/Tattooine/chatLog/').push({
			message: message,
			name: "TEST BOT"
		});

		$('#new-chat-message').val('');
	}
});
// ================================== END =============================================
