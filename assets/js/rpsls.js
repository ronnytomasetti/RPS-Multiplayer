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
}

/**
 * Returns new game room key after pushing object to /game-rooms path.
 *
 * @param {string} roomName :Name variable for game room from user input.
 * @return {string} newKey :Firebase uid variable to newly added /game-rooms object.
 */
Game.prototype.getNewRoomKey = function(roomName) {
    var newKey = firebase.database().ref('/game-rooms/').push({ name: roomName }).key;
    return newKey;
}

/**
 * description
 *
 * @param {type} variableName :description
 * @return {type} name :description
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
            console.log("OPPONENT JOINED!");
            self.opponent.name = data.val().playerName;
            self.opponent.battleWins = data.val().battleWins;
            self.opponent.battleLosses = data.val().battleLosses;
            self.opponent.battleDraws = data.val().battleDraws;
        }
        addBattleOpponent();
    });

    playersRef.on('child_removed', function(data) {
        console.log("GAME OVER!!!");
        renderPlayerProfileHome()
    });

    battleChatRef.on('child_added', function(data) {
        console.log("DATA: ", data.key);
        addNewChatMessage(data.val().name, data.val().message);
    });
}

Game.prototype.joinBattle = function(roomKey) {
    // Add player to game-room players list
    // set opponent to game object
    // set opponent listeners
    this.player.battleWins = 0;
    this.player.battleLosses = 0;
    this.player.battleDraws = 0;
    this.player.currentHand = false;

    var self = this;

    var user = firebase.auth().currentUser;
    var userRef = firebase.database().ref('/game-rooms/' + roomKey + '/players/' + user.uid);

    userRef.set({
                'playerName': this.player.name,
                'battleWins': this.player.battleWins,
                'battleLosses': this.player.battleLosses,
                'battleDraws': this.player.battleDraws,
                'currentHand': this.player.currentHand
                });

    var playersRef = firebase.database().ref('/game-rooms/' + roomKey + '/players/');

    playersRef.on('child_added', function(data) {
        if (data.key != user.uid) {
            console.log("OPPONENT JOINED!");
            console.log("NEW OPPONENT: ", data.key);
            self.opponent.name = data.val().playerName;
            self.opponent.battleWins = data.val().battleWins;
            self.opponent.battleLosses = data.val().battleLosses;
            self.opponent.battleDraws = data.val().battleDraws;
        }
        addBattleOpponent();
    });

    playersRef.on('child_removed', function(data) {
        console.log("GAME OVER!!!");
        renderPlayerProfileHome()
    });

    var battleChatRef = firebase.database().ref('/game-rooms/' + roomKey + '/chat');

    battleChatRef.on('child_added', function(data) {
        console.log("DATA: ", data.key);
        addNewChatMessage(data.val().name, data.val().message);
    });
};

Game.prototype.sendChatMessage = function(roomKey, name, message) {
    var battleChatRef = firebase.database().ref('/game-rooms/' + roomKey + '/chat');

    battleChatRef.push({
                        'name': name,
                        'message': message
                      });
}

Game.prototype.leaveBattle = function(roomKey) {
    var user = firebase.auth().currentUser;
    var userRef = firebase.database().ref('/game-rooms/' + roomKey + '/players/' + user.uid);
    userRef.remove();
}
