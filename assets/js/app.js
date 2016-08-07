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

// TODO: Create player object

var config = {
	apiKey: "AIzaSyDkXBvYGeQz45NI9wQmWy6C_cS7P4KR354",
	authDomain: "rpsls-5141f.firebaseapp.com",
	databaseURL: "https://rpsls-5141f.firebaseio.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// '.info/connected' is a special location provided by Firebase that is updated every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

	// If they are connected..
	if( snap.val() ) {

		// Add user to the connections list.
		var con = connectionsRef.push(true);

		// Remove user from the connection list when they disconnect.
		con.onDisconnect().remove();

	};

});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

	// Display the viewer count in the html.
	// The number of online users is the number of children in the connections list.
	$("#watchers").html(snap.numChildren());

});