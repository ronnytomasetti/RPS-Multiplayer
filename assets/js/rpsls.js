/**
 * RPSLS Game Object
 * Ronny Tomasetti
 * 2016 UCF Coding Bootcamp
 */

function Game() {

    this.player = {};
    this.opponent = {};

    this.weapons = [ 'rock', 'paper', 'scissors', 'lizard', 'spock' ];

    this.config = {
                    apiKey: "AIzaSyDkXBvYGeQz45NI9wQmWy6C_cS7P4KR354",
                    authDomain: "rpsls-5141f.firebaseapp.com",
                    databaseURL: "https://rpsls-5141f.firebaseio.com",
                    storageBucket: "rpsls-5141f.appspot.com"
                  };
}

/**
 * Initializes Firebase connection using declared config variables above.
 *
 * @param {}
 * @return {}
 */
Game.prototype.initializeFirebaseConnection = function() {
    return firebase.initializeApp(this.config);
}

/**
 * Authenticates an anonymous player with Firebase.
 *
 * @param {}
 * @return {}
 */
Game.prototype.createAnonymousPlayer = function() {
    var self = this;

    firebase.auth().signInAnonymously().catch( function(error) {
        console.warn("Error Code: " + error.code + ": " + error.message);
    });

    firebase.auth().onAuthStateChanged( function(user) {

        firebase.database().ref('/player-profiles/' + user.uid).set(
        {
            name: self.player.name,
            wins: self.player.totalWins,
            losses: self.player.totalLosses,
            draws: self.player.totalDraws
        });
    });

    return;
}

/**
 * Retrieves currently signed in and authenticated Firebase user.
 *
 * @param {}
 * @return { NULL ? USER } :Returns null if user is signed in anonymously, else returns current user.
 */
Game.prototype.getCurrentUser = function() {
    return firebase.auth().currentUser;
}

/**
 * Returns new game room key after pushing object to /game-rooms path.
 *
 * @param {string} roomName :Name variable for game room from user input.
 * @return {string} newKey  :Firebase uid variable to newly added /game-rooms object.
 */
Game.prototype.getNewRoomKey = function(roomName) {
    var newKey = firebase.database().ref('/game-rooms/').push({ name: roomName }).key;
    return newKey;
}

/**
 * Starts new Firebase database listeners to path /game-rooms
 * for [ child_added ] and [ child_removed ] events.
 *
 * @param {}
 * @return {}
 */
Game.prototype.startGameRoomsListeners = function() {
    var gameRoomsRef = firebase.database().ref('/game-rooms/');

    gameRoomsRef.on('child_added', function(data) {
      addNewGameRoomBtn(data.key, data.val().name);
    });

    gameRoomsRef.on('child_removed', function(data) {
      removeGameRoomBtn(data.key);
    });

    return;
}

/**
 * Initialized battlefield Firebase variables for player and opponent.
 * Starts Firebase database listeners for player and chat data.
 *
 * @param {String} roomKey  :Game room uid for new battlefield.
 * @return {}
 */
Game.prototype.initializeBattle = function(roomKey) {
    this.player.battleWins = 0;
    this.player.battleLosses = 0;
    this.player.battleDraws = 0;
    this.player.currentHand = false;

    var self = this;

    var user = firebase.auth().currentUser;
    var userRef = firebase.database().ref('/game-rooms/' + roomKey + '/players/' + user.uid);
    var playersRef = firebase.database().ref('/game-rooms/' + roomKey + '/players');
    var battleChatRef = firebase.database().ref('/game-rooms/' + roomKey + '/chat');

    userRef.set({
                'playerName': this.player.name,
                'battleWins': this.player.battleWins,
                'battleLosses': this.player.battleLosses,
                'battleDraws': this.player.battleDraws,
                'currentHand': this.player.currentHand
                });

    playersRef.on('child_added', function(data) {
        if (data.key != user.uid) {
            self.opponent.name = data.val().playerName;
            self.opponent.battleWins = data.val().battleWins;
            self.opponent.battleLosses = data.val().battleLosses;
            self.opponent.battleDraws = data.val().battleDraws;
        }
        addBattleOpponent();
        self.startRounds();
    });

    playersRef.on('child_removed', function(data) {
        if (data.key === user.uid) {
            firebase.database().ref('/player-profiles/' + user.uid).set(
            {
                name: self.player.name,
                wins: self.player.battleWins + self.player.totalWins,
                losses: self.player.battleLosses + self.player.totalLosses,
                draws: self.player.battleDraws + self.player.totalDraws
            });
        }
    });

    battleChatRef.on('child_added', function(data) {
        addNewChatMessage(data.val().name, data.val().message);
    });

    return;
}

/**
 * Description
 *
 * @param {type} variableName  :description
 * @return {type} variableName :description
 */
Game.prototype.leaveBattle = function(user, roomKey) {
    var userRef = firebase.database().ref('/game-rooms/' + roomKey + '/players/' + user);
    userRef.remove();
    return;
}

/**
 * Description
 *
 * @param {type} variableName  :description
 * @return {type} variableName :description
 */
Game.prototype.sendChatMessage = function(roomKey, name, message) {
    var battleChatRef = firebase.database().ref('/game-rooms/' + roomKey + '/chat');

    battleChatRef.push({
                        'name': name,
                        'message': message
                      });

    return;
}
