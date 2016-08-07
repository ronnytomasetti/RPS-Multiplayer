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
// TODO: 

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDkXBvYGeQz45NI9wQmWy6C_cS7P4KR354",
	authDomain: "rpsls-5141f.firebaseapp.com",
	databaseURL: "https://rpsls-5141f.firebaseio.com",
};

firebase.initializeApp(config);